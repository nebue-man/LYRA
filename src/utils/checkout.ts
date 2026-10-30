/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  currency?: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  image: string;
  category: string;
}

export interface PromoCode {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minSubtotal?: number;
}

export const VALID_PROMO_CODES: Record<string, PromoCode> = {
  'LYRA10': { code: 'LYRA10', type: 'percent', value: 10 },
  'STORY': { code: 'STORY', type: 'fixed', value: 50, minSubtotal: 250 },
  'ATELIER15': { code: 'ATELIER15', type: 'percent', value: 15, minSubtotal: 400 },
};

export const FREE_SHIPPING_THRESHOLD = 250;
export const STANDARD_SHIPPING_FEE = 25;
export const EXPRESS_COURIER_FEE = 45;

export interface OrderCalculationInput {
  items: CartItem[];
  promoCode?: string | null;
  shippingMethod: 'standard' | 'express';
  giftPackaging: boolean;
  taxRate?: number;
}

export interface OrderCalculationResult {
  subtotal: number;
  discount: number;
  shipping: number;
  giftPackagingFee: number;
  tax: number;
  total: number;
  isFreeShipping: boolean;
  freeShippingProgress: number; // 0 to 100 percentage
  freeShippingRemaining: number;
  promoApplied?: PromoCode | null;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * Math.max(1, item.quantity), 0);
}

export function calculateOrderSummary(input: OrderCalculationInput): OrderCalculationResult {
  const subtotal = calculateSubtotal(input.items);
  const taxRate = input.taxRate ?? 0.08; // 8% standard luxury retail tax

  let discount = 0;
  let promoApplied: PromoCode | null = null;

  if (input.promoCode) {
    const promo = VALID_PROMO_CODES[input.promoCode.trim().toUpperCase()];
    if (promo) {
      if (!promo.minSubtotal || subtotal >= promo.minSubtotal) {
        promoApplied = promo;
        if (promo.type === 'percent') {
          discount = Math.round((subtotal * promo.value) / 100);
        } else {
          discount = Math.min(subtotal, promo.value);
        }
      }
    }
  }

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  let shipping = 0;
  if (subtotal > 0) {
    if (input.shippingMethod === 'express') {
      shipping = isFreeShipping ? 20 : EXPRESS_COURIER_FEE;
    } else {
      shipping = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
    }
  }

  const giftPackagingFee = input.giftPackaging ? 15 : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * taxRate);
  const total = Math.max(0, taxableAmount + shipping + giftPackagingFee + tax);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return {
    subtotal,
    discount,
    shipping,
    giftPackagingFee,
    tax,
    total,
    isFreeShipping,
    freeShippingProgress,
    freeShippingRemaining,
    promoApplied,
  };
}

export function formatPrice(amount: number, currency: string = 'LKR'): string {
  if (currency === 'LKR') {
    return `${amount.toLocaleString('en-US')} LKR`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  paymentMethod: 'card' | 'apple_pay' | 'cod';
  giftMessage?: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export function validateCheckoutForm(data: CheckoutFormData, step: number): ValidationErrors {
  const errors: ValidationErrors = {};

  if (step === 1) {
    // Contact & Delivery step
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Please provide a valid email address for order confirmation';
    }
    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!data.address.trim()) {
      errors.address = 'Street address is required';
    }
    if (!data.city.trim()) {
      errors.city = 'City is required';
    }
    if (!data.state.trim()) {
      errors.state = 'State / Province is required';
    }
    if (!data.postalCode.trim() || data.postalCode.trim().length < 3) {
      errors.postalCode = 'Postal / ZIP code is required';
    }
    if (!data.phone.trim() || data.phone.trim().length < 7) {
      errors.phone = 'Phone number is required for courier delivery';
    }
  }

  if (step === 2) {
    // Payment step (if card chosen)
    if (data.paymentMethod === 'card') {
      const digitsOnly = (data.cardNumber || '').replace(/\D+/g, '');
      if (!digitsOnly || digitsOnly.length < 8) {
        errors.cardNumber = 'Valid card number is required';
      }
      if (!data.cardExpiry || !/^\d{2}\/\d{2}$/.test(data.cardExpiry.trim())) {
        errors.cardExpiry = 'MM/YY required';
      }
      if (!data.cardCvc || !/^\d{3,4}$/.test(data.cardCvc.trim())) {
        errors.cardCvc = '3 or 4 digit CVC required';
      }
    }
  }

  return errors;
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `LYRA-${timestamp}-${random}`;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateOrderSummary,
  formatPrice,
  validateCheckoutForm,
  FREE_SHIPPING_THRESHOLD,
  type CartItem,
  type CheckoutFormData,
} from './checkout.ts';

const mockItems: CartItem[] = [
  {
    id: 'lyra-01',
    name: 'Atelier Tailored Cream Blazer',
    price: 340,
    quantity: 1,
    selectedSize: 'M',
    selectedColor: 'Chalk White',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.00_9b57ae0a.jpeg',
    category: "Women's Atelier",
  },
  {
    id: 'lyra-02',
    name: 'Obsidian Overshirt Bespoke',
    price: 180,
    quantity: 2,
    selectedSize: 'L',
    selectedColor: 'Noir Black',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.00_9b57ae0a.jpeg',
    category: "Men's Bespoke",
  },
];

test('calculateSubtotal sums item price by quantity accurately', () => {
  const subtotal = calculateSubtotal(mockItems);
  assert.equal(subtotal, 340 + 180 * 2); // 700
});

test('calculateOrderSummary handles free shipping over threshold', () => {
  const result = calculateOrderSummary({
    items: mockItems,
    shippingMethod: 'standard',
    giftPackaging: false,
  });

  assert.equal(result.subtotal, 700);
  assert.equal(result.isFreeShipping, true);
  assert.equal(result.shipping, 0);
  assert.equal(result.freeShippingProgress, 100);
  assert.equal(result.freeShippingRemaining, 0);
});

test('calculateOrderSummary charges shipping below threshold', () => {
  const singleItem: CartItem[] = [
    {
      id: 'lyra-03',
      name: 'Signature Lyra Sweatshirt',
      price: 195,
      quantity: 1,
      selectedSize: 'M',
      selectedColor: 'Noir',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.00__2__366dff9b.jpeg',
      category: 'Signature Essentials',
    },
  ];

  const result = calculateOrderSummary({
    items: singleItem,
    shippingMethod: 'standard',
    giftPackaging: false,
  });

  assert.equal(result.subtotal, 195);
  assert.equal(result.isFreeShipping, false);
  assert.equal(result.shipping, 25);
  assert.equal(result.freeShippingRemaining, FREE_SHIPPING_THRESHOLD - 195);
});

test('promo code discount is computed accurately', () => {
  const result = calculateOrderSummary({
    items: mockItems, // 700 subtotal
    promoCode: 'LYRA10',
    shippingMethod: 'standard',
    giftPackaging: true, // +15
  });

  // 10% of 700 is 70
  assert.equal(result.discount, 70);
  assert.equal(result.giftPackagingFee, 15);
  assert.equal(result.subtotal, 700);
  // taxable: 630, tax (8%): 50.4 rounded to 50
  assert.equal(result.tax, 50);
  // total: 630 + 0 (shipping) + 15 (gift) + 50 (tax) = 695
  assert.equal(result.total, 695);
});

test('formatPrice formats currency without decimals for luxury aesthetic', () => {
  assert.equal(formatPrice(1250), '$1,250');
  assert.equal(formatPrice(85), '$85');
  assert.equal(formatPrice(2450, 'LKR'), '2,450 LKR');
});

test('validateCheckoutForm detects missing delivery fields on step 1', () => {
  const emptyForm: CheckoutFormData = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
    paymentMethod: 'card',
  };

  const errors = validateCheckoutForm(emptyForm, 1);
  assert.ok(errors.email);
  assert.ok(errors.firstName);
  assert.ok(errors.lastName);
  assert.ok(errors.address);
  assert.ok(errors.phone);
});

test('validateCheckoutForm validates valid form on step 1', () => {
  const validForm: CheckoutFormData = {
    email: 'client@atelier.com',
    firstName: 'Julian',
    lastName: 'Vance',
    address: '740 Park Avenue',
    city: 'New York',
    state: 'NY',
    postalCode: '10021',
    country: 'United States',
    phone: '+1 212 555 0199',
    paymentMethod: 'card',
  };

  const errors = validateCheckoutForm(validForm, 1);
  assert.equal(Object.keys(errors).length, 0);
});

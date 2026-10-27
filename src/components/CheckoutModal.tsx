/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CartItem,
  CheckoutFormData,
  calculateOrderSummary,
  validateCheckoutForm,
  generateOrderNumber,
  formatPrice,
  ValidationErrors,
} from '../utils/checkout.ts';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  Gift,
  ArrowRight,
  ArrowLeft,
  Printer,
  ShoppingBag,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data/products.ts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  giftPackaging: boolean;
  promoCode: string;
  onOrderCompleted: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  giftPackaging,
  promoCode,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string>('');

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: 'client@atelier.com',
    firstName: 'Julian',
    lastName: 'Vance',
    address: '740 Park Avenue, Apt 14B',
    apartment: 'Floor 14',
    city: 'New York',
    state: 'NY',
    postalCode: '10021',
    country: 'United States',
    phone: '+1 (212) 555-0199',
    cardNumber: '4242 4242 4242 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    paymentMethod: 'card',
    giftMessage: 'With deepest affection. Wear your story.',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const orderSummary = calculateOrderSummary({
    items,
    promoCode,
    shippingMethod,
    giftPackaging,
  });

  if (!isOpen) return null;

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleNextStep = () => {
    const errs = validateCheckoutForm(formData, step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    if (step === 1) {
      setStep(2);
    }
  };

  const handleCompletePayment = () => {
    const errs = validateCheckoutForm(formData, 2);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsProcessing(true);

    setTimeout(() => {
      const orderNum = generateOrderNumber();
      setConfirmedOrderNumber(orderNum);
      setIsProcessing(false);
      setStep(3);
      onOrderCompleted(orderNum);
    }, 1400);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <div className="fixed inset-0 cursor-pointer" onClick={step === 3 ? onClose : undefined} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#faf8f5] border border-[#d9ceb7] shadow-2xl text-[#141414] z-10 overflow-hidden my-auto max-h-[95vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-[#e5decb] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl tracking-[0.2em] font-normal uppercase text-[#111111]">
                LYRA
              </span>
              <span className="h-4 w-px bg-[#c59b27]/60" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#8c6b1b] font-sans font-semibold">
                {step === 3 ? 'Order Confirmed' : 'Seamless Checkout'}
              </span>
            </div>

            {/* Stepper indicators */}
            {step < 3 && (
              <div className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-widest font-sans font-medium">
                <span className={step === 1 ? 'text-[#8c6b1b] border-b-2 border-[#c59b27] pb-0.5' : 'text-[#8c8577]'}>
                  1. Delivery
                </span>
                <span className="text-[#c5beaf]">→</span>
                <span className={step === 2 ? 'text-[#8c6b1b] border-b-2 border-[#c59b27] pb-0.5' : 'text-[#8c8577]'}>
                  2. Payment
                </span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#736c5e] hover:text-[#111111] transition-colors cursor-pointer"
              aria-label="Close Checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#e2d8c3]">
            {/* Left Column: Form Steps or Confirmation (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#faf8f5]">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl text-[#111111] font-normal">
                      Delivery Destination
                    </h2>
                    <p className="text-xs text-[#5c564b] font-light mt-0.5">
                      Enter your address for discreet, insured courier delivery.
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-white border px-3.5 py-2.5 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27] ${
                        errors.email ? 'border-red-500' : 'border-[#ded5bf]'
                      }`}
                      placeholder="client@atelier.com"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans font-medium">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full bg-white border px-3.5 py-2.5 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27] ${
                          errors.firstName ? 'border-red-500' : 'border-[#ded5bf]'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans font-medium">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full bg-white border px-3.5 py-2.5 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27] ${
                          errors.lastName ? 'border-red-500' : 'border-[#ded5bf]'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans font-medium">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Street name and building number"
                      className={`w-full bg-white border px-3.5 py-2.5 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27] ${
                        errors.address ? 'border-red-500' : 'border-[#ded5bf]'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Apartment & City */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans font-medium">
                        Suite / Villa (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.apartment || ''}
                        onChange={(e) => handleInputChange('apartment', e.target.value)}
                        className="w-full bg-white border border-[#ded5bf] px-3.5 py-2.5 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans font-medium">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full bg-white border px-3.5 py-2.5 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27] ${
                          errors.city ? 'border-red-500' : 'border-[#ded5bf]'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  {/* State, Postal Code & Phone */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans font-medium">
                        State / Prov *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`w-full bg-white border px-3.5 py-2.5 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27] ${
                          errors.state ? 'border-red-500' : 'border-[#ded5bf]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans font-medium">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className={`w-full bg-white border px-3.5 py-2.5 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27] ${
                          errors.postalCode ? 'border-red-500' : 'border-[#ded5bf]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans font-medium">
                        Phone *
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full bg-white border px-3.5 py-2.5 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27] ${
                          errors.phone ? 'border-red-500' : 'border-[#ded5bf]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Gift Note */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1.5 font-sans flex items-center justify-between font-medium">
                      <span className="flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-[#a87f18]" />
                        Handwritten Calligraphy Card Note (Complimentary)
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.giftMessage || ''}
                      onChange={(e) => handleInputChange('giftMessage', e.target.value)}
                      placeholder="Enter a message to be hand-inscribed by our atelier calligrapher..."
                      className="w-full bg-white border border-[#ded5bf] px-3.5 py-2 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27] resize-none shadow-xs"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleNextStep}
                      className="px-8 py-3.5 bg-[#111111] hover:bg-black text-[#faf8f5] border border-[#c59b27] text-xs font-sans tracking-[0.2em] uppercase font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Courier &amp; Payment</span>
                      <ArrowRight className="w-4 h-4 text-[#e2b740]" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl text-[#111111] font-normal">
                      Courier &amp; Payment Ritual
                    </h2>
                    <p className="text-xs text-[#5c564b] font-light mt-0.5">
                      Select your preferred courier service and secure payment method.
                    </p>
                  </div>

                  {/* Shipping Options */}
                  <div className="space-y-3">
                    <label className="block text-xs uppercase tracking-wider text-[#3d382e] font-sans font-medium">
                      Courier Transit Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setShippingMethod('standard')}
                        className={`p-4 border text-left transition-all cursor-pointer ${
                          shippingMethod === 'standard'
                            ? 'bg-[#faf6ee] border-[#c59b27] ring-1 ring-[#c59b27]/40 shadow-xs'
                            : 'bg-white border-[#ded5bf] hover:border-[#c59b27]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-sans font-medium text-[#111111] mb-1">
                          <span>Standard White-Glove</span>
                          <span className="text-[#8c6b1b] font-semibold">
                            {orderSummary.isFreeShipping ? 'Complimentary' : '$25'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6b6455] font-light">
                          3–5 business days. Direct signature required.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShippingMethod('express')}
                        className={`p-4 border text-left transition-all cursor-pointer ${
                          shippingMethod === 'express'
                            ? 'bg-[#faf6ee] border-[#c59b27] ring-1 ring-[#c59b27]/40 shadow-xs'
                            : 'bg-white border-[#ded5bf] hover:border-[#c59b27]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-sans font-medium text-[#111111] mb-1">
                          <span>Priority Saturday Express</span>
                          <span className="text-[#8c6b1b] font-semibold">
                            {orderSummary.isFreeShipping ? '$20' : '$45'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6b6455] font-light">
                          Next business day delivery with climate-controlled handling.
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs uppercase tracking-wider text-[#3d382e] font-sans font-medium">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', 'card')}
                        className={`py-3 px-2 border text-center text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          formData.paymentMethod === 'card'
                            ? 'bg-[#111111] border-[#c59b27] text-white font-medium shadow-xs'
                            : 'bg-white border-[#ded5bf] text-[#6b6455] hover:text-[#111111]'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-[#e2b740]" />
                        <span>Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', 'apple_pay')}
                        className={`py-3 px-2 border text-center text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          formData.paymentMethod === 'apple_pay'
                            ? 'bg-[#111111] border-[#c59b27] text-white font-medium shadow-xs'
                            : 'bg-white border-[#ded5bf] text-[#6b6455] hover:text-[#111111]'
                        }`}
                      >
                        <span className="font-serif text-sm font-bold"> Pay</span>
                        <span>Apple Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', 'cod')}
                        className={`py-3 px-2 border text-center text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          formData.paymentMethod === 'cod'
                            ? 'bg-[#111111] border-[#c59b27] text-white font-medium shadow-xs'
                            : 'bg-white border-[#ded5bf] text-[#6b6455] hover:text-[#111111]'
                        }`}
                      >
                        <Truck className="w-4 h-4 text-[#e2b740]" />
                        <span>Atelier COD</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Details form if Card selected */}
                  {formData.paymentMethod === 'card' && (
                    <div className="p-4 bg-white border border-[#ded5bf] shadow-xs space-y-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#3d382e] mb-1 font-sans font-medium">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={formData.cardNumber || ''}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="•••• •••• •••• ••••"
                          className={`w-full bg-[#faf8f5] border px-3 py-2 text-xs text-[#111111] font-mono focus:outline-none focus:border-[#c59b27] ${
                            errors.cardNumber ? 'border-red-500' : 'border-[#ded5bf]'
                          }`}
                        />
                        {errors.cardNumber && (
                          <p className="text-[11px] text-red-500 mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#3d382e] mb-1 font-sans font-medium">
                            Expiration (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={formData.cardExpiry || ''}
                            onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                            placeholder="MM/YY"
                            className={`w-full bg-[#faf8f5] border px-3 py-2 text-xs text-[#111111] font-mono focus:outline-none focus:border-[#c59b27] ${
                              errors.cardExpiry ? 'border-red-500' : 'border-[#ded5bf]'
                            }`}
                          />
                          {errors.cardExpiry && (
                            <p className="text-[11px] text-red-500 mt-1">{errors.cardExpiry}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#3d382e] mb-1 font-sans font-medium">
                            CVC
                          </label>
                          <input
                            type="password"
                            value={formData.cardCvc || ''}
                            onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                            placeholder="•••"
                            maxLength={4}
                            className={`w-full bg-[#faf8f5] border px-3 py-2 text-xs text-[#111111] font-mono focus:outline-none focus:border-[#c59b27] ${
                              errors.cardCvc ? 'border-red-500' : 'border-[#ded5bf]'
                            }`}
                          />
                          {errors.cardCvc && (
                            <p className="text-[11px] text-red-500 mt-1">{errors.cardCvc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'cod' && (
                    <div className="p-4 bg-white border border-[#ded5bf] text-xs text-[#5c564b] leading-relaxed font-light shadow-xs">
                      <p className="font-semibold text-[#111111] mb-1">Cash / Card on Delivery Protocol</p>
                      Our bonded private courier will contact you at {formData.phone} prior to arrival. Total due upon physical handover: <strong className="text-[#8c6b1b] tabular-nums font-semibold">{formatPrice(orderSummary.total)}</strong>.
                    </div>
                  )}

                  {formData.paymentMethod === 'apple_pay' && (
                    <div className="p-4 bg-white border border-[#ded5bf] text-center text-xs text-[#5c564b] shadow-xs">
                      <p>Instant biometric authorization via Apple Pay will trigger upon clicking Authorize below.</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-3 text-[#6b6455] hover:text-[#111111] text-xs font-sans uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Delivery</span>
                    </button>

                    <button
                      onClick={handleCompletePayment}
                      disabled={isProcessing}
                      className="px-8 py-3.5 bg-[#111111] hover:bg-black text-[#faf8f5] border border-[#c59b27] text-xs font-sans tracking-[0.2em] uppercase font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#e2b740] border-t-transparent rounded-full animate-spin" />
                          <span>Securing Authorization...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Order — {formatPrice(orderSummary.total)}</span>
                          <Sparkles className="w-3.5 h-3.5 text-[#e2b740]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-[#f4ede0] border border-[#c59b27] flex items-center justify-center mx-auto text-[#8c6b1b]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-[11px] tracking-[0.3em] uppercase text-[#8c6b1b] font-sans font-semibold">
                      Bespoke Order Secured
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal mt-1">
                      Thank You for Wearing Your Story
                    </h2>
                    <p className="text-xs text-[#5c564b] font-light mt-1.5 max-w-md mx-auto">
                      Your order has been transmitted directly to our Biella &amp; Porto ateliers. An official certificate of authenticity and courier tracking manifest have been dispatched to <strong className="text-[#111111]">{formData.email}</strong>.
                    </p>
                  </div>

                  {/* Order Receipt Box */}
                  <div className="p-5 bg-white border border-[#ded5bf] text-left space-y-3 font-sans shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#e2d8c3] pb-3 text-xs">
                      <div>
                        <span className="text-[#787163] block text-[10px] uppercase tracking-wider font-medium">
                          Order Number
                        </span>
                        <span className="font-mono text-sm text-[#111111] font-semibold">
                          {confirmedOrderNumber}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#787163] block text-[10px] uppercase tracking-wider font-medium">
                          Estimated Delivery
                        </span>
                        <span className="text-[#8c6b1b] font-semibold text-xs flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3" />
                          3–5 Business Days
                        </span>
                      </div>
                    </div>

                    <div className="text-xs space-y-1 text-[#4a463e]">
                      <div>
                        <span className="text-[#787163]">Destination:</span> {formData.firstName} {formData.lastName}, {formData.address}, {formData.city}, {formData.postalCode}
                      </div>
                      <div>
                        <span className="text-[#787163]">Packaging:</span> {giftPackaging ? 'Signature Keepsake Box + Wax Seal' : 'Standard Atelier Cloth Enclosure'}
                      </div>
                      <div>
                        <span className="text-[#787163]">Payment Status:</span> Authorized ({formData.paymentMethod.toUpperCase()}) — {formatPrice(orderSummary.total)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                      onClick={handlePrint}
                      className="px-5 py-2.5 bg-white hover:bg-[#f4efe4] border border-[#ded5bf] text-xs font-sans uppercase tracking-wider text-[#111111] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#8c6b1b]" />
                      <span>Print Atelier Invoice</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#111111] hover:bg-black text-[#faf8f5] border border-[#c59b27] text-xs font-sans uppercase tracking-wider font-medium transition-colors cursor-pointer shadow-xs"
                    >
                      Return to Storefront
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary Column (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#f5f0e6] flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg text-[#111111] mb-4 font-normal">
                  Order Summary ({items.reduce((s, i) => s + i.quantity, 0)})
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => {
                    const matchedProduct = PRODUCTS.find((p) => p.id === item.id);
                    const freeGift = matchedProduct?.freeGift;

                    return (
                      <div
                        key={`${item.id}-${item.selectedSize}`}
                        className="py-2 border-b border-[#e2d8c3] space-y-1.5"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-14 object-cover bg-white shrink-0 border border-[#ded5bf]"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-[#111111] truncate font-serif">
                              {item.name}
                            </h4>
                            <div className="text-[10px] text-[#6b6455] font-sans">
                              Qty: {item.quantity} · Size: {item.selectedSize}
                            </div>
                          </div>
                          <span className="text-xs font-medium text-[#8c6b1b] font-sans tabular-nums shrink-0">
                            {formatPrice(item.price * item.quantity, item.currency)}
                          </span>
                        </div>

                        {freeGift && (
                          <div className="flex items-center gap-2 pl-2 bg-[#fdfbf7] p-1.5 border border-[#eddcc4] text-[10px]">
                            <div className="w-6 h-6 shrink-0 bg-[#0a0807] border border-[#c59b27] overflow-hidden">
                              <img src={freeGift.image} alt={freeGift.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[#8c6b1b] font-semibold uppercase tracking-wider text-[9px]">
                              Free Gift:
                            </span>
                            <span className="text-[#3d382e] truncate">{freeGift.name}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Packaging preview callout */}
                {giftPackaging && (
                  <div className="mt-4 p-3 bg-white border border-[#c59b27]/40 flex items-start gap-2.5 text-xs text-[#4a463e] shadow-xs">
                    <Gift className="w-4 h-4 text-[#a87f18] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-[#111111]">Signature Packaging Enclosed</span>
                      <p className="text-[11px] text-[#6b6455] font-light mt-0.5">
                        Matte ivory presentation box with wax seal, ribbon, and personalized note.
                      </p>
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="mt-6 pt-4 border-t border-[#ded5bf] space-y-2 text-xs font-sans">
                  <div className="flex justify-between text-[#5c564b]">
                    <span>Subtotal</span>
                    <span className="text-[#111111] font-medium tabular-nums">{formatPrice(orderSummary.subtotal)}</span>
                  </div>
                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Privilege Code ({promoCode})</span>
                      <span className="tabular-nums">-{formatPrice(orderSummary.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5c564b]">
                    <span>White-Glove Courier</span>
                    <span className="text-[#111111] tabular-nums">
                      {orderSummary.shipping === 0 ? 'Complimentary' : formatPrice(orderSummary.shipping)}
                    </span>
                  </div>
                  {orderSummary.giftPackagingFee > 0 && (
                    <div className="flex justify-between text-[#5c564b]">
                      <span>Signature Unboxing Suite</span>
                      <span className="text-[#111111] tabular-nums">
                        {formatPrice(orderSummary.giftPackagingFee)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5c564b]">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-[#111111] tabular-nums">{formatPrice(orderSummary.tax)}</span>
                  </div>
                  <div className="pt-3 border-t border-[#ded5bf] flex justify-between text-base font-serif text-[#111111]">
                    <span>Total Amount</span>
                    <span className="font-sans font-medium text-[#8c6b1b] tabular-nums">
                      {formatPrice(orderSummary.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Trust Badges */}
              <div className="mt-6 pt-4 border-t border-[#ded5bf] flex items-center justify-between text-[10px] text-[#787163] font-sans uppercase tracking-wider">
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a87f18]" />
                  Bank-Grade Encryption
                </span>
                <span>Authentic Lyra Atelier</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

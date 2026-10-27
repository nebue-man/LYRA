/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem, calculateOrderSummary, formatPrice, FREE_SHIPPING_THRESHOLD } from '../utils/checkout.ts';
import { PRODUCTS } from '../data/products.ts';
import { X, Trash2, Plus, Minus, Gift, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { ClothRackIcon } from './ClothRackIcon.tsx';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, color: string, qty: number) => void;
  onRemoveItem: (id: string, size: string, color: string) => void;
  onProceedToCheckout: () => void;
  giftPackaging: boolean;
  onToggleGiftPackaging: (val: boolean) => void;
  promoCode: string;
  onApplyPromoCode: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  giftPackaging,
  onToggleGiftPackaging,
  promoCode,
  onApplyPromoCode,
}) => {
  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const orderSummary = calculateOrderSummary({
    items,
    promoCode,
    shippingMethod: 'standard',
    giftPackaging,
  });

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    onApplyPromoCode(promoInput.trim().toUpperCase());
    setPromoMessage(`Promo code "${promoInput.trim().toUpperCase()}" applied`);
    setTimeout(() => setPromoMessage(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
        {/* Backdrop click */}
        <div className="fixed inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

        {/* Slide-over Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#f6efe6] border-l border-[#ded1be] shadow-2xl h-full flex flex-col justify-between z-10 text-[#15110d]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#ded1be] flex items-center justify-between bg-[#fcfaf7]">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8c6b1b] font-sans font-semibold">
                Your Selection
              </span>
              <h2 className="font-serif text-2xl text-[#0a0807] font-normal mt-0.5 flex items-center gap-2.5">
                <ClothRackIcon className="w-5 h-5 text-[#c59b27]" />
                <span>Wardrobe Rack ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#736c5e] hover:text-[#0a0807] transition-colors cursor-pointer"
              aria-label="Close Wardrobe Rack"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Meter */}
          <div className="px-6 py-3.5 bg-[#ede4d6] border-b border-[#ded1be] text-xs">
            <div className="flex items-center justify-between text-[#3d382e] font-sans mb-1.5 font-medium">
              <span>White-Glove Courier Delivery</span>
              <span className="text-[#8c6b1b]">
                {orderSummary.isFreeShipping
                  ? 'Complimentary'
                  : `$${orderSummary.freeShippingRemaining} away`}
              </span>
            </div>
            <div className="w-full bg-[#ded6c4] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#c59b27] h-full transition-all duration-500"
                style={{ width: `${orderSummary.freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white border border-[#c59b27]/40 flex items-center justify-center text-[#c59b27] mb-4 shadow-xs">
                  <ClothRackIcon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-[#111111]">Your wardrobe rack is empty</h3>
                <p className="text-xs text-[#6b6455] mt-1 max-w-xs font-light">
                  Explore our Autumn/Winter haute collection and select pieces to hang on your rack.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#111111] text-[#faf8f5] border border-[#c59b27]/60 text-xs font-sans tracking-[0.16em] uppercase font-medium hover:bg-black transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => {
                const matchingProduct = PRODUCTS.find((p) => p.id === item.id);
                const freeGift = matchingProduct?.freeGift;

                return (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex flex-col gap-2.5 p-3.5 bg-white border border-[#e5decb] hover:border-[#c59b27] transition-all shadow-xs"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover shrink-0 bg-[#f4efe4]"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-base text-[#111111] leading-tight font-medium">
                              {item.name}
                            </h4>
                            <button
                              onClick={() =>
                                onRemoveItem(item.id, item.selectedSize, item.selectedColor)
                              }
                              className="text-[#999080] hover:text-red-500 transition-colors p-1 cursor-pointer"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] text-[#6b6455] font-sans mt-0.5 space-x-2">
                            <span>Size: <strong className="text-[#111111]">{item.selectedSize}</strong></span>
                            <span>·</span>
                            <span>Color: <strong className="text-[#111111]">{item.selectedColor}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-[#ded5bf] bg-[#faf8f5]">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.id,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 hover:text-[#111111] text-[#6b6455] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs px-2.5 text-[#111111] tabular-nums font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.id,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 hover:text-[#111111] text-[#6b6455] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Tabular Price */}
                          <span className="font-sans text-sm font-medium text-[#8c6b1b] tabular-nums">
                            {formatPrice(item.price * item.quantity, item.currency)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Free Item display in Cart */}
                    {freeGift && (
                      <div className="pt-2 border-t border-[#f0eae0] flex items-center gap-2.5 bg-[#fdfaf5] p-2 border border-[#eddcc4]">
                        <div className="relative w-9 h-9 shrink-0 bg-[#0c0907] border border-[#c59b27] overflow-hidden">
                          <img
                            src={freeGift.image}
                            alt={freeGift.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-[#c59b27] text-[#0a0807] text-[7px] font-sans font-bold uppercase tracking-wider text-center py-0.2 leading-none">
                            Free
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] uppercase tracking-wider font-sans font-bold text-[#8c6b1b] bg-[#f5ede0] px-1 py-0.2 border border-[#c59b27]/30">
                              Free Gift Included
                            </span>
                          </div>
                          <p className="text-[11px] font-medium text-[#111111] truncate mt-0.5">
                            {freeGift.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Packaging Add-on Selection */}
            {items.length > 0 && (
              <div className="mt-4 p-4 bg-white border border-[#c59b27]/40 shadow-xs space-y-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={giftPackaging}
                    onChange={(e) => onToggleGiftPackaging(e.target.checked)}
                    className="w-4 h-4 accent-[#c59b27] cursor-pointer"
                  />
                  <div className="flex-1 text-xs">
                    <span className="text-[#111111] font-semibold flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#a87f18]" />
                      Signature Luxury Unboxing Suite (+$15)
                    </span>
                    <span className="text-[#615a4d] block text-[11px] font-light mt-0.5">
                      Foil-embossed keepsake box, wax medallion seal, satin ribbon & handwritten note.
                    </span>
                  </div>
                </label>
              </div>
            )}

            {/* Promo Code Input */}
            {items.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[#e5decb]">
                <form onSubmit={handlePromoSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (e.g. LYRA10, STORY)"
                    className="flex-1 bg-white border border-[#ded5bf] px-3 py-2 text-xs text-[#111111] placeholder-[#8c8577] font-sans focus:outline-none focus:border-[#c59b27] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#111111] hover:bg-black text-xs font-sans tracking-wider uppercase text-white transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p className="text-[11px] text-[#8c6b1b] mt-1 font-medium">{promoMessage}</p>
                )}
                {orderSummary.promoApplied && (
                  <div className="mt-1 flex items-center justify-between text-[11px] text-emerald-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Code {orderSummary.promoApplied.code} applied
                    </span>
                    <span>-{formatPrice(orderSummary.discount)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-[#f6f2eb] border-t border-[#e2d8c3] space-y-4">
              <div className="space-y-1.5 text-xs text-[#4a463e] font-sans">
                <div className="flex justify-between">
                  <span className="text-[#615a4d]">Subtotal</span>
                  <span className="tabular-nums text-[#111111] font-medium">
                    {formatPrice(orderSummary.subtotal)}
                  </span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Atelier Privilege Discount</span>
                    <span className="tabular-nums">-{formatPrice(orderSummary.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#615a4d]">Courier Shipping</span>
                  <span className="tabular-nums text-[#111111]">
                    {orderSummary.shipping === 0 ? 'Complimentary' : formatPrice(orderSummary.shipping)}
                  </span>
                </div>
                {orderSummary.giftPackagingFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#615a4d]">Unboxing Presentation</span>
                    <span className="tabular-nums text-[#111111]">
                      {formatPrice(orderSummary.giftPackagingFee)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#615a4d]">Estimated Tax</span>
                  <span className="tabular-nums text-[#111111]">
                    {formatPrice(orderSummary.tax)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#ded5bf] flex justify-between text-base font-serif text-[#111111]">
                  <span>Total</span>
                  <span className="font-sans font-medium text-[#8c6b1b] tabular-nums">
                    {formatPrice(orderSummary.total)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-4 bg-[#111111] hover:bg-black text-[#faf8f5] border border-[#c59b27] text-xs font-sans font-medium tracking-[0.22em] uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#e2b740]" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#787163] uppercase tracking-widest pt-1">
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3 text-[#a87f18]" />
                  Encrypted 256-Bit SSL
                </span>
                <span>·</span>
                <span>Authentic Atelier Guarantee</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

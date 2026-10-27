/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../data/products.ts';
import { formatPrice } from '../utils/checkout.ts';
import { X, Check, ShieldCheck, Truck, Gift, Ruler } from 'lucide-react';
import { HangerIcon } from './HangerIcon.tsx';
import { ClothRackIcon } from './ClothRackIcon.tsx';
import { motion, AnimatePresence } from 'motion/react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Noir Black');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'fabric' | 'care'>('story');
  const [addedNotice, setAddedNotice] = useState(false);

  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);
  const currentStock = currentSizeObj?.stock ?? 0;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10">
        {/* Backdrop dismiss */}
        <div className="fixed inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#faf8f5] border border-[#d9ceb7] shadow-2xl text-[#141414] z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#736c5e] hover:text-[#111111] bg-white/80 hover:bg-white border border-[#ded5bf] transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Showcase & Gallery */}
          <div className="w-full md:w-1/2 bg-[#f4efe4] flex flex-col justify-between p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[#e2d8c3]">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white border border-[#e2d8c3] shadow-sm">
              <img
                src={product.galleryImages[activeImageIdx] || product.image}
                alt={`${product.name} view ${activeImageIdx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-sans text-[#735212] font-semibold border border-[#c59b27]/40 shadow-xs">
                {product.origin}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative w-16 h-20 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                      activeImageIdx === i
                        ? 'border-[#c59b27] ring-1 ring-[#c59b27] opacity-100'
                        : 'border-[#ded5bf] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between max-h-[85vh] bg-[#faf8f5]">
            <div className="space-y-6">
              {/* Category & Status */}
              <div className="pr-12">
                <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#736c5e] font-sans font-medium">
                  <span>{product.categoryLabel}</span>
                  <span className="text-[#8c6b1b]">Ref: {product.id.toUpperCase()}</span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] mt-1.5 font-normal">
                  {product.name}
                </h1>
                <p className="text-sm text-[#5c564b] mt-1 font-light">
                  {product.subtitle}
                </p>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-sans font-medium text-[#8c6b1b] tabular-nums">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  <span className="text-xs text-[#736c5e] font-light">
                    Taxes & White-Glove Packaging included
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <div className="flex items-center justify-between text-xs tracking-[0.16em] uppercase text-[#3d382e] mb-2 font-sans font-medium">
                  <span>Color / Shade</span>
                  <span className="text-[#8c6b1b] font-semibold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative p-0.5 rounded-full border transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#c59b27] ring-2 ring-[#c59b27]/30'
                          : 'border-transparent hover:border-[#ded5bf]'
                      }`}
                      title={c.name}
                      aria-label={`Select ${c.name}`}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Guide */}
              <div>
                <div className="flex items-center justify-between text-xs tracking-[0.16em] uppercase text-[#3d382e] mb-2 font-sans font-medium">
                  <span>Select Size</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center gap-1 text-[11px] text-[#8c6b1b] hover:text-[#735212] font-semibold cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeGuide ? 'Hide Measurements' : 'Size Guide'}</span>
                  </button>
                </div>

                {/* Size buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-2.5 px-3 text-xs tracking-wider font-sans uppercase border transition-all cursor-pointer text-center relative ${
                        selectedSize === s.size
                          ? 'bg-[#111111] text-white border-[#c59b27] font-semibold'
                          : 'bg-white text-[#3d382e] border-[#ded5bf] hover:border-[#c59b27]'
                      }`}
                    >
                      {s.size}
                      {s.stock <= 3 && (
                        <span className="block text-[9px] text-[#a87f18] font-semibold">
                          {s.stock} left
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Size Guide Drawer/Accordion */}
                {showSizeGuide && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 p-3 bg-white border border-[#ded5bf] text-xs text-[#4a463e] space-y-1.5 font-sans shadow-xs"
                  >
                    <div className="font-semibold text-[#111111] mb-1">Garment Measurements (cm):</div>
                    <div className="grid grid-cols-4 gap-1 text-[11px] text-[#787163] border-b border-[#ded5bf] pb-1 font-medium">
                      <span>Size</span>
                      <span>Chest</span>
                      <span>Waist</span>
                      <span>Length</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-[11px]">
                      <span>XS</span>
                      <span>96</span>
                      <span>78</span>
                      <span>72</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-[11px]">
                      <span>S</span>
                      <span>102</span>
                      <span>84</span>
                      <span>74</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-[11px]">
                      <span>M</span>
                      <span>108</span>
                      <span>90</span>
                      <span>76</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-[11px]">
                      <span>L</span>
                      <span>114</span>
                      <span>96</span>
                      <span>78</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Complimentary Free Gift With Purchase */}
              {product.freeGift && (
                <div className="p-3.5 bg-[#f5efe4] border border-[#c59b27]/60 flex items-center gap-3.5 shadow-xs">
                  <div className="relative w-14 h-14 shrink-0 bg-[#0c0907] border border-[#c59b27] overflow-hidden">
                    <img
                      src={product.freeGift.image}
                      alt={product.freeGift.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-[#c59b27] text-[#0a0807] text-[8px] font-sans font-bold uppercase tracking-wider text-center py-0.5 leading-none">
                      Free
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#c59b27] text-[#0a0807] text-[9px] font-sans font-bold uppercase tracking-wider px-1.5 py-0.5">
                        Complimentary Gift
                      </span>
                      <span className="text-[11px] text-[#735212] font-sans font-semibold">
                        Included with this order
                      </span>
                    </div>
                    <div className="font-serif text-sm text-[#111111] font-medium mt-1 truncate">
                      {product.freeGift.name}
                    </div>
                    <p className="text-[11px] text-[#6b6455] font-light">
                      {product.freeGift.subtitle || 'Complimentary luxury gift with purchase'}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons: Add to Bag & Hanger (Save) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-4 px-6 bg-[#111111] hover:bg-black text-[#faf8f5] border border-[#c59b27] font-sans text-xs tracking-[0.22em] font-medium uppercase transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Wardrobe Rack</span>
                      </>
                    ) : (
                      <>
                        <ClothRackIcon className="w-4 h-4 text-[#e6cb6d]" />
                        <span>Add to Rack — {formatPrice(product.price, product.currency)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-4 border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#111111] text-[#e2b740] border-[#c59b27]'
                        : 'border-[#ded5bf] text-[#6b6455] hover:text-[#111111] hover:border-[#c59b27] bg-white'
                    }`}
                    aria-label="Save piece to wardrobe"
                    title={isWishlisted ? 'Saved in wardrobe' : 'Save piece'}
                  >
                    <HangerIcon filled={isWishlisted} className="w-4 h-4" />
                  </button>
                </div>

                {/* Packaging Trust Guarantee */}
                <div className="p-3 bg-white border border-[#e5decb] flex items-start gap-2.5 text-xs text-[#5c564b] shadow-xs">
                  <Gift className="w-4 h-4 text-[#a87f18] shrink-0 mt-0.5" />
                  <span>
                    Delivered in signature LYRA magnetic presentation box with grossgrain ribbon & wax seal.
                  </span>
                </div>
              </div>

              {/* Informational Tabs (Story / Fabric / Care) */}
              <div className="pt-4 border-t border-[#ded5bf]">
                <div className="flex items-center gap-6 border-b border-[#ded5bf] pb-2 text-xs tracking-[0.16em] uppercase font-sans">
                  <button
                    onClick={() => setActiveTab('story')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'story'
                        ? 'text-[#8c6b1b] border-b-2 border-[#c59b27] font-semibold'
                        : 'text-[#736c5e] hover:text-[#111111]'
                    }`}
                  >
                    The Story
                  </button>
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'fabric'
                        ? 'text-[#8c6b1b] border-b-2 border-[#c59b27] font-semibold'
                        : 'text-[#736c5e] hover:text-[#111111]'
                    }`}
                  >
                    Fabric & Origin
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'care'
                        ? 'text-[#8c6b1b] border-b-2 border-[#c59b27] font-semibold'
                        : 'text-[#736c5e] hover:text-[#111111]'
                    }`}
                  >
                    Care & Delivery
                  </button>
                </div>

                <div className="py-3 text-xs text-[#4a463e] leading-relaxed font-light">
                  {activeTab === 'story' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                      <p className="italic text-[#6b6455]">{product.story}</p>
                    </div>
                  )}
                  {activeTab === 'fabric' && (
                    <div className="space-y-1.5">
                      <p>
                        <span className="text-[#111111] font-semibold">Composition:</span> {product.fabric}
                      </p>
                      <p>
                        <span className="text-[#111111] font-semibold">Provenance:</span> {product.origin}
                      </p>
                    </div>
                  )}
                  {activeTab === 'care' && (
                    <div className="space-y-1.5">
                      <p>
                        <span className="text-[#111111] font-semibold">Garment Care:</span> {product.care}
                      </p>
                      <p>
                        <span className="text-[#111111] font-semibold">Shipping:</span> Complimentary express courier on orders over $250. 30-day atelier returns.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../data/products.ts';
import { formatPrice } from '../utils/checkout.ts';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { HangerIcon } from './HangerIcon.tsx';
import { ClothRackIcon } from './ClothRackIcon.tsx';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemove: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onMoveToBag: (product: Product, size: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onRemove,
  onSelectProduct,
  onMoveToBag,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
        <div className="fixed inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#111111] border-l border-white/10 shadow-2xl h-full flex flex-col justify-between z-10 text-neutral-100"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300 font-sans">
                Curated Atelier
              </span>
              <h2 className="font-serif text-2xl text-white font-normal mt-0.5 flex items-center gap-2.5">
                <HangerIcon className="w-5 h-5 text-[#c59b27]" />
                <span>Saved Pieces ({products.length})</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {products.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-[#c59b27]/40 flex items-center justify-center text-[#c59b27] mb-4">
                  <HangerIcon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-neutral-200">No saved pieces</h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs font-light">
                  Tap the hanger icon on any piece to curate your private atelier wardrobe.
                </p>
              </div>
            ) : (
              products.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-neutral-900/60 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover shrink-0 bg-neutral-800 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(item);
                          }}
                          className="font-serif text-base text-white text-left leading-tight hover:text-amber-200 transition-colors"
                        >
                          {item.name}
                        </button>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          aria-label={`Remove ${item.name} from saved items`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                        {item.categoryLabel}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-sans text-sm font-medium text-amber-300 tabular-nums">
                        {formatPrice(item.price)}
                      </span>

                      <button
                        onClick={() => {
                          onMoveToBag(item, item.sizes[0]?.size || 'M');
                        }}
                        className="px-3 py-1.5 bg-neutral-100 hover:bg-white text-black text-[11px] font-sans font-medium uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                      >
                        <ClothRackIcon className="w-3.5 h-3.5" />
                        <span>Move to Rack</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-[#141414] border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-sans tracking-widest uppercase transition-colors"
            >
              Back to Collections
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../data/products.ts';
import { formatPrice } from '../utils/checkout.ts';
import { Eye, Plus } from 'lucide-react';
import { HangerIcon } from './HangerIcon.tsx';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(
    product.sizes[0]?.size || 'M'
  );

  return (
    <div
      className="group relative flex flex-col bg-[#14100c] border border-[#261f18] hover:border-[#c59b27] transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_24px_-4px_rgba(197,155,39,0.2)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container (65% - 75% height) */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#1c1712] cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Minimal text tag (Zero-pill compliant) */}
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 bg-[#0a0807]/90 backdrop-blur-sm px-2.5 py-1 border border-[#c59b27]/60 shadow-sm">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#e6cb6d] font-sans font-semibold">
              New Arrival
            </span>
          </div>
        )}

        {/* Saved Items (Hanger Action) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-none backdrop-blur-md transition-colors cursor-pointer border shadow-sm ${
            isWishlisted
              ? 'bg-[#c59b27] text-[#0a0807] border-[#c59b27]'
              : 'bg-[#1c1712]/90 text-[#ded1be] hover:text-[#e6cb6d] hover:bg-[#261f18] border-[#2e261e]'
          }`}
          aria-label={isWishlisted ? `Remove ${product.name} from saved items` : `Save ${product.name}`}
        >
          <HangerIcon filled={isWishlisted} className="w-3.5 h-3.5" />
        </button>

        {/* Quick View / Inspect Hover Prompt */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2 pointer-events-none">
          <span className="text-[11px] tracking-[0.18em] uppercase text-white font-sans backdrop-blur-md bg-[#0a0807]/90 px-3 py-1 flex items-center gap-1.5 border border-[#c59b27]/60 shadow-sm">
            <Eye className="w-3 h-3 text-[#e6cb6d]" />
            Quick Inspect
          </span>
        </div>
      </div>

      {/* Product Content Details (Bottom Section) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-[#14100c]">
        <div>
          {/* Metadata: Category & Origin */}
          <div className="flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-[#9e917f] font-sans font-medium">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-[#c59b27]">·</span>
            <span>{product.origin.split(',')[1]?.trim() || 'Italy'}</span>
          </div>

          {/* Item Name & Small Image of the Free Item */}
          <div className="mt-2 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0 pr-1">
              <button
                onClick={() => onSelect(product)}
                className="text-left font-serif text-lg text-[#f6efe6] font-normal hover:text-[#e6cb6d] transition-colors line-clamp-2 cursor-pointer leading-snug"
              >
                {product.name}
              </button>
              <p className="text-xs text-[#a89d8c] font-light line-clamp-1 mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Small Image of Free Item */}
            {product.freeGift && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(product);
                }}
                className="shrink-0 flex flex-col items-center group/gift cursor-pointer"
                title={`Complimentary Gift: ${product.freeGift.name}`}
              >
                <div className="relative w-12 h-12 bg-[#090806] border border-[#c59b27] overflow-hidden shadow-sm hover:border-[#f3d97d] transition-all">
                  <img
                    src={product.freeGift.image}
                    alt={product.freeGift.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover/gift:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-[#c59b27] text-[#0a0807] text-[8px] font-sans font-bold uppercase tracking-wider text-center py-0.5 leading-none">
                    Free
                  </span>
                </div>
                <span className="text-[9px] text-[#e6cb6d] font-sans uppercase tracking-wider mt-1 font-semibold text-center leading-tight">
                  Free Gift
                </span>
              </div>
            )}
          </div>

          {/* Complimentary Free Item indicator */}
          {product.freeGift && (
            <div className="mt-2.5 px-2.5 py-1.5 bg-[#1b150f] border border-[#332619] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c59b27] shrink-0" />
                <span className="text-[11px] text-[#ded1be] truncate font-sans">
                  <span className="text-[#e6cb6d] font-medium">Free with order:</span>{' '}
                  {product.freeGift.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Price and Quick-Add Size Bar */}
        <div className="pt-3 border-t border-[#261f18] flex items-center justify-between gap-2">
          <span className="font-sans text-sm font-semibold text-[#e6cb6d] tabular-nums">
            {formatPrice(product.price, product.currency)}
          </span>

          <div className="flex items-center gap-1.5">
            <select
              value={selectedQuickSize}
              onChange={(e) => setSelectedQuickSize(e.target.value)}
              className="bg-[#1c1712] border border-[#2e261e] text-[#f6efe6] text-[11px] px-2 py-1 rounded-none font-sans focus:outline-none focus:border-[#c59b27] cursor-pointer"
              aria-label={`Select size for ${product.name}`}
            >
              {product.sizes.map((s) => (
                <option key={s.size} value={s.size} className="bg-[#1c1712] text-[#f6efe6]">
                  {s.size}
                </option>
              ))}
            </select>

            <button
              onClick={() => onQuickAdd(product, selectedQuickSize)}
              className="p-1.5 bg-[#c59b27] hover:bg-[#dfb538] text-[#0a0807] transition-colors cursor-pointer shadow-sm font-semibold"
              aria-label={`Add ${product.name} in size ${selectedQuickSize} to rack`}
              title="Add to wardrobe rack"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { HangerIcon } from './HangerIcon.tsx';
import { ClothRackIcon } from './ClothRackIcon.tsx';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0807]/90 backdrop-blur-md transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group cursor-pointer shrink-0"
          aria-label="LYRA Clothing Home"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.26em] text-[#f6efe6] font-normal group-hover:text-[#c59b27] transition-colors uppercase whitespace-nowrap drop-shadow-sm">
            LYRA
          </span>
          <div className="flex items-center gap-1.5 -mt-0.5">
            <span className="w-2.5 h-px bg-[#c59b27]/80" />
            <span className="text-[9px] tracking-[0.52em] text-[#e6cb6d] font-sans font-medium uppercase">
              Clothing
            </span>
            <span className="w-2.5 h-px bg-[#c59b27]/80" />
          </div>
        </button>

        {/* Zone 2: 4–5 Single-Line Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-9 text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#ded1be]"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => onNavigate('collections')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
              activeSection === 'collections' ? 'text-white font-semibold' : 'text-[#c2b6a3]'
            }`}
          >
            Collections
            {activeSection === 'collections' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c59b27]" />
            )}
          </button>
          <button
            onClick={() => onNavigate('lookbook')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
              activeSection === 'lookbook' ? 'text-white font-semibold' : 'text-[#c2b6a3]'
            }`}
          >
            Lookbook
            {activeSection === 'lookbook' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c59b27]" />
            )}
          </button>
          <button
            onClick={() => onNavigate('atelier')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
              activeSection === 'atelier' ? 'text-white font-semibold' : 'text-[#c2b6a3]'
            }`}
          >
            Atelier
            {activeSection === 'atelier' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c59b27]" />
            )}
          </button>
          <button
            onClick={() => onNavigate('boutique')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
              activeSection === 'boutique' ? 'text-white font-semibold' : 'text-[#c2b6a3]'
            }`}
          >
            Flagship
            {activeSection === 'boutique' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c59b27]" />
            )}
          </button>
          <button
            onClick={() => onNavigate('story')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
              activeSection === 'story' ? 'text-white font-semibold' : 'text-[#c2b6a3]'
            }`}
          >
            Story
            {activeSection === 'story' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c59b27]" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Bag / Checkout Launcher with Item Counter) & Wishlist */}
        <div className="flex items-center gap-3 shrink-0">
          {wishlistCount > 0 && (
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#c2b6a3] hover:text-[#c59b27] transition-colors cursor-pointer relative"
              aria-label={`View Saved Items (${wishlistCount})`}
              title="Saved Items"
            >
              <HangerIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c59b27] text-[#0a0807] text-[10px] flex items-center justify-center font-mono font-bold">
                {wishlistCount}
              </span>
            </button>
          )}

          <button
            onClick={onOpenCart}
            className="p-2 text-[#c2b6a3] hover:text-[#c59b27] transition-colors cursor-pointer relative"
            aria-label={`Wardrobe Rack Cart, ${cartCount} items`}
            title="Wardrobe Rack Cart"
          >
            <ClothRackIcon className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c59b27] text-[#0a0807] text-[10px] flex items-center justify-center font-mono font-bold shadow-sm">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Quick-Navigation Strip (horizontal swipe) */}
      <div className="md:hidden flex items-center gap-5 px-4 py-2.5 bg-[#0a0807]/95 overflow-x-auto text-[11px] tracking-[0.18em] uppercase font-sans text-[#c2b6a3]">
        <button
          onClick={() => onNavigate('collections')}
          className={`whitespace-nowrap cursor-pointer ${
            activeSection === 'collections' ? 'text-white font-semibold' : 'hover:text-white'
          }`}
        >
          Collections
        </button>
        <span className="text-[#c59b27]">·</span>
        <button
          onClick={() => onNavigate('lookbook')}
          className={`whitespace-nowrap cursor-pointer ${
            activeSection === 'lookbook' ? 'text-white font-semibold' : 'hover:text-white'
          }`}
        >
          Lookbook
        </button>
        <span className="text-[#c59b27]">·</span>
        <button
          onClick={() => onNavigate('atelier')}
          className={`whitespace-nowrap cursor-pointer ${
            activeSection === 'atelier' ? 'text-white font-semibold' : 'hover:text-white'
          }`}
        >
          Atelier
        </button>
        <span className="text-[#c59b27]">·</span>
        <button
          onClick={() => onNavigate('boutique')}
          className={`whitespace-nowrap cursor-pointer ${
            activeSection === 'boutique' ? 'text-white font-semibold' : 'hover:text-white'
          }`}
        >
          Flagship
        </button>
        <span className="text-[#c59b27]">·</span>
        <button
          onClick={() => onNavigate('story')}
          className={`whitespace-nowrap cursor-pointer ${
            activeSection === 'story' ? 'text-white font-semibold' : 'hover:text-white'
          }`}
        >
          Story
        </button>
      </div>
    </header>
  );
};

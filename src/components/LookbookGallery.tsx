/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LOOKBOOK_SCENES, LookbookScene, Hotspot } from '../data/lookbook.ts';
import { PRODUCTS, Product } from '../data/products.ts';
import { formatPrice } from '../utils/checkout.ts';
import { ChevronLeft, ChevronRight, Eye, Maximize2, ShoppingBag, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LookbookGalleryProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
}

export const LookbookGallery: React.FC<LookbookGalleryProps> = ({
  onSelectProduct,
  onQuickAdd,
}) => {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Campaign', 'Flagship', 'Packaging', 'Craftsmanship'];

  const filteredScenes = filterCategory === 'All'
    ? LOOKBOOK_SCENES
    : LOOKBOOK_SCENES.filter((s) => s.category === filterCategory);

  const currentScene: LookbookScene = filteredScenes[activeSceneIdx] || LOOKBOOK_SCENES[0];

  const handlePrev = () => {
    setActiveHotspot(null);
    setActiveSceneIdx((prev) => (prev === 0 ? filteredScenes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveHotspot(null);
    setActiveSceneIdx((prev) => (prev === filteredScenes.length - 1 ? 0 : prev + 1));
  };

  const getAssociatedProduct = (productId?: string): Product | undefined => {
    if (!productId) return undefined;
    return PRODUCTS.find((p) => p.id === productId);
  };

  return (
    <section id="lookbook" className="w-full py-20 bg-[#0c0907] text-[#f6efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Seamless, no divider line) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#e6cb6d] font-sans font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Interactive Haute Lookbook</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#f6efe6]">
              The Living Editorial
            </h2>
            <p className="text-sm text-[#a89d8c] font-light mt-1 max-w-xl">
              Architectural spaces, packaging rituals, and runway silhouettes. Click gold pins to inspect garments.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#14100c] border border-[#261f18]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilterCategory(cat);
                  setActiveSceneIdx(0);
                  setActiveHotspot(null);
                }}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#c59b27] text-[#0a0807] font-semibold shadow'
                    : 'text-[#a89d8c] hover:text-[#f6efe6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Presentation */}
        <div className="relative w-full bg-[#14100c] border border-[#261f18] overflow-hidden shadow-2xl">
          {/* Main Visual Canvas */}
          <div className="relative aspect-[16/9] w-full max-h-[70vh] bg-black overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentScene.id}
                src={currentScene.image}
                alt={currentScene.title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center select-none"
              />
            </AnimatePresence>

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Hotspots layer */}
            {currentScene.hotspots.map((hs) => {
              const isSelected = activeHotspot?.id === hs.id;
              const product = getAssociatedProduct(hs.productId);

              return (
                <div
                  key={hs.id}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                >
                  {/* Pin Button */}
                  <button
                    onClick={() => setActiveHotspot(isSelected ? null : hs)}
                    className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-black ring-4 ring-amber-400/40 scale-110'
                        : 'bg-black/80 text-amber-300 border border-amber-400/70 hover:bg-amber-400 hover:text-black'
                    }`}
                    aria-label={`Inspect ${hs.title}`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current" />
                    {/* Subtle pulse animation ring */}
                    <span className="absolute inset-0 rounded-full border border-amber-400 animate-ping opacity-30" />
                  </button>

                  {/* Hotspot Card Overlay Popover */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute z-30 bottom-10 left-1/2 -translate-x-1/2 w-64 p-3 bg-neutral-900/95 backdrop-blur-md border border-amber-400/60 shadow-2xl text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] tracking-[0.2em] uppercase text-amber-300 font-sans">
                            Atelier Detail
                          </span>
                          <h4 className="font-serif text-base text-white leading-tight mt-0.5">
                            {hs.title}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {hs.subtitle}
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveHotspot(null)}
                          className="text-neutral-400 hover:text-white p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {product && (
                        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="font-sans text-sm font-medium text-amber-300 tabular-nums">
                            {formatPrice(product.price)}
                          </span>
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="px-2.5 py-1 bg-white text-black text-[11px] font-sans uppercase font-medium hover:bg-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>Inspect</span>
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Navigation Overlay Controls */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setLightboxOpen(true)}
                className="p-2.5 bg-black/60 hover:bg-black/90 text-neutral-300 hover:text-white border border-white/15 transition-colors cursor-pointer backdrop-blur-sm"
                aria-label="Expand image in lightbox"
                title="Fullscreen view"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Carousel Navigation Chevrons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 hover:bg-black/90 text-white border border-white/15 hover:border-amber-400/60 transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Previous editorial scene"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 hover:bg-black/90 text-white border border-white/15 hover:border-amber-400/60 transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Next editorial scene"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Scene Editorial Footer Bar (Dark tone, seamless) */}
          <div className="p-6 md:p-8 bg-[#14100c] border-t border-[#261f18] grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-[#f6efe6]">
            {/* Scene Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#e6cb6d] font-sans font-medium mb-1">
                <span>
                  Chapter 0{activeSceneIdx + 1} / 0{filteredScenes.length}
                </span>
                <span aria-hidden="true" className="text-[#c59b27]">·</span>
                <span>{currentScene.category}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f6efe6] font-normal">
                {currentScene.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#b8ad9e] font-light mt-1.5 leading-relaxed">
                {currentScene.description}
              </p>
              <blockquote className="mt-2 text-xs italic text-[#c2b6a3] font-serif border-l-0 pl-0">
                {currentScene.quote}
              </blockquote>
            </div>

            {/* Hotspots Counter and Quick Action */}
            <div className="flex flex-col md:items-end justify-center gap-3 border-t md:border-t-0 md:border-l border-[#261f18] pt-4 md:pt-0 md:pl-6">
              <div className="text-xs text-[#a89d8c] font-sans">
                Interactive Elements:{' '}
                <span className="text-[#f6efe6] font-semibold">{currentScene.hotspots.length} points</span>
              </div>
              <div className="flex items-center gap-2">
                {filteredScenes.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveSceneIdx(idx);
                      setActiveHotspot(null);
                    }}
                    className={`h-1.5 transition-all cursor-pointer ${
                      activeSceneIdx === idx
                        ? 'w-8 bg-[#c59b27]'
                        : 'w-3 bg-[#2a2219] hover:bg-[#c59b27]/60'
                    }`}
                    aria-label={`Jump to scene ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 text-white bg-neutral-900 border border-white/20 hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-6xl max-h-[90vh] overflow-hidden">
              <img
                src={currentScene.image}
                alt={currentScene.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <div className="text-center mt-3 text-neutral-300 font-serif text-lg">
                {currentScene.title} — {currentScene.subtitle}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

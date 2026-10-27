/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BRAND_ASSETS, BRAND_PILLARS } from '../data/products.ts';
import { Sparkles, Shirt, Leaf, Heart, ArrowDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenLookbook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenLookbook }) => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'diamond':
        return <Sparkles className="w-4 h-4 text-[#a87f18]" />;
      case 'hanger':
        return <Shirt className="w-4 h-4 text-[#a87f18]" />;
      case 'leaf':
        return <Leaf className="w-4 h-4 text-[#a87f18]" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-[#a87f18]" />;
      default:
        return null;
    }
  };

  return (
    <section className="relative w-full bg-[#0a0807] text-[#15110d] overflow-hidden">
      {/* Editorial Campaign Hero Image Frame: 1600x595 cinematic banner ratio */}
      <div className="relative w-full aspect-[1600/595] min-h-[400px] sm:min-h-[460px] lg:min-h-[500px] max-h-[70vh] bg-[#0a0807] flex items-center justify-center overflow-hidden">
        {/* Main Background Image */}
        <img
          src={BRAND_ASSETS.heroCampaign}
          alt="LYRA Clothing Campaign — Wear Your Story"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[1.0] contrast-[1.02]"
        />

        {/* Top Bleed: Seamlessly blends the dark photo edge with the header/nav above */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0a0807] via-[#0a0807]/70 to-transparent pointer-events-none z-10" />

        {/* Bottom Bleed: Seamlessly melts the dark photo base into the dark web page section below */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0a0807] via-[#0a0807]/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Haute Couture Action Bar: Unobstructed luxury discovery dock with zero breaking lines */}
      <div className="w-full bg-[#0a0807] py-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={onExplore}
            className="px-8 py-3.5 bg-[#16120d] hover:bg-[#221a11] border border-[#c59b27] text-white text-xs tracking-[0.22em] font-sans font-medium uppercase transition-all shadow-lg hover:shadow-[#c59b27]/25 cursor-pointer flex items-center gap-2 group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#e6cb6d] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenLookbook}
            className="px-8 py-3.5 bg-[#16120d] hover:bg-[#201812] text-[#f6efe6] border border-[#c59b27]/60 hover:border-[#c59b27] text-xs tracking-[0.22em] font-sans font-medium uppercase transition-all cursor-pointer shadow-md"
          >
            Lookbook
          </button>

          <button
            onClick={onExplore}
            className="cursor-pointer text-[10px] tracking-[0.28em] uppercase text-[#c2b6a3] hover:text-[#e6cb6d] flex items-center gap-2 transition-colors pt-0.5 font-sans font-medium px-3 py-1.5"
            aria-label="Scroll to collection"
          >
            <span>Atelier Pieces</span>
            <ArrowDown className="w-3 h-3 text-[#e6cb6d] animate-bounce" />
          </button>
        </motion.div>
      </div>

      {/* 4 Brand Pillars Strip: Darker tone continuous flow, zero breaking lines, -20% text density */}
      <div className="w-full bg-[#0a0807] pb-14 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              title: 'PREMIUM QUALITY',
              desc: 'Virgin wool, mulberry silk, and Egyptian cotton.',
              icon: 'diamond',
            },
            {
              title: 'TRENDY DESIGNS',
              desc: 'Architectural silhouettes with timeless haute couture lines.',
              icon: 'hanger',
            },
            {
              title: 'FOR EVERY STORY',
              desc: 'Bespoke tailoring engineered for personal presence.',
              icon: 'leaf',
            },
            {
              title: 'SEASONAL EDITIONS',
              desc: 'Cohesive seasonal palettes tailored for modern elegance.',
              icon: 'heart',
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col items-center text-center p-5 rounded-none bg-[#120e0b]/60 border border-[#221a13]/80 hover:border-[#c59b27]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#18130f] border border-[#c59b27]/60 shadow-sm flex items-center justify-center mb-3">
                {getPillarIcon(pillar.icon)}
              </div>
              <h3 className="text-xs tracking-[0.25em] font-sans font-medium uppercase text-[#f6efe6] mb-1.5">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#a89d8c] leading-relaxed max-w-xs font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

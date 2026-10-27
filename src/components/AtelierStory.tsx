/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BRAND_ASSETS } from '../data/products.ts';
import { Sparkles, Scissors, Feather, Award } from 'lucide-react';

export const AtelierStory: React.FC = () => {
  return (
    <section id="atelier" className="w-full py-24 bg-[#0a0807] text-[#f6efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#16120d] border border-[#c59b27]/60 shadow-xs mb-3">
            <Sparkles className="w-3 h-3 text-[#c59b27]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#e6cb6d] font-medium font-sans">
              The Philosophy
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f6efe6]">
            Wear Your Story
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c59b27] to-transparent mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#a89d8c] font-light mt-1 leading-relaxed">
            True luxury is marked not by loud ornamentation, but by the quiet confidence of sculptural cuts, tactile pure fibers, and unhurried craftsmanship.
          </p>
        </div>

        {/* 3 Editorial Pillars with imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Material Provenance */}
          <div className="bg-[#14100c] border border-[#261f18] p-6 sm:p-7 flex flex-col justify-between group hover:border-[#c59b27] hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#1c1712] mb-6 border border-[#261f18]">
                <img
                  src={BRAND_ASSETS.touchpointsCollage}
                  alt="Craftsmanship and Hardware"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#e6cb6d] font-sans font-semibold block mb-1">
                Chapter 01
              </span>
              <h3 className="font-serif text-2xl text-[#f6efe6] font-normal mb-2.5">
                Uncompromising Provenance
              </h3>
              <p className="text-xs text-[#a89d8c] leading-relaxed font-light">
                Direct partnerships with heritage mills in Biella, Como, and Okayama. Every fiber traceable to its ethical origin.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#261f18] flex items-center gap-2 text-xs text-[#c2b6a3]">
              <Scissors className="w-3.5 h-3.5 text-[#c59b27]" />
              <span className="font-medium">Double-faced hand-finished hems</span>
            </div>
          </div>

          {/* Pillar 2: Unboxing Presentation */}
          <div className="bg-[#14100c] border border-[#261f18] p-6 sm:p-7 flex flex-col justify-between group hover:border-[#c59b27] hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#1c1712] mb-6 border border-[#261f18]">
                <img
                  src={BRAND_ASSETS.packagingSuite}
                  alt="Packaging and Unboxing Suite"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#e6cb6d] font-sans font-semibold block mb-1">
                Chapter 02
              </span>
              <h3 className="font-serif text-2xl text-[#f6efe6] font-normal mb-2.5">
                The Unboxing Ritual
              </h3>
              <p className="text-xs text-[#a89d8c] leading-relaxed font-light">
                Prepared as a ceremonial gift with hand-pleated tissue, authentic wax insignia, velvet pouches, and calligraphy stationery.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#261f18] flex items-center gap-2 text-xs text-[#c2b6a3]">
              <Feather className="w-3.5 h-3.5 text-[#c59b27]" />
              <span className="font-medium">Certified archival presentation packaging</span>
            </div>
          </div>

          {/* Pillar 3: Architectural Longevity */}
          <div className="bg-[#14100c] border border-[#261f18] p-6 sm:p-7 flex flex-col justify-between group hover:border-[#c59b27] hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#1c1712] mb-6 border border-[#261f18]">
                <img
                  src={BRAND_ASSETS.medallionMirror}
                  alt="Boutique Atmosphere and Reflection"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#e6cb6d] font-sans font-semibold block mb-1">
                Chapter 03
              </span>
              <h3 className="font-serif text-2xl text-[#f6efe6] font-normal mb-2.5">
                Permanent Wardrobe
              </h3>
              <p className="text-xs text-[#a89d8c] leading-relaxed font-light">
                Permanent silhouettes designed to age with character and retain sculptural form across decades of wear.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#261f18] flex items-center gap-2 text-xs text-[#c2b6a3]">
              <Award className="w-3.5 h-3.5 text-[#c59b27]" />
              <span className="font-medium">Lifetime repair warranty at any flagship</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

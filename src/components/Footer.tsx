/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer id="story" className="w-full bg-[#070504] text-[#e8e2d5] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand Info & Newsletter (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-serif text-3xl tracking-[0.24em] text-white uppercase block font-medium">
                  LYRA
                </span>
                <span className="h-4 w-px bg-[#c59b27]/60" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#e2b740] font-sans">
                  Haute Couture
                </span>
              </div>
              <span className="text-[10px] tracking-[0.45em] text-[#a87f18] uppercase font-sans block mt-1">
                Wear Your Story
              </span>
            </div>

            <p className="text-xs text-[#a39b8c] max-w-sm leading-relaxed font-light">
              Bespoke ready-to-wear and couture crafted with generational European artisans. Dedicated to the dialogue between fabric, form, and legacy.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#d4cbba] block mb-2 font-sans font-medium">
                Atelier Correspondence
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#e2b740] py-2 bg-[#1a1712] px-3 border border-[#c59b27]/40">
                  <Check className="w-4 h-4 text-[#e2b740]" />
                  <span>Welcome to the private correspondence of LYRA.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for new releases"
                    className="flex-1 bg-[#171512] border border-[#3d362a] px-3.5 py-2.5 text-xs text-white placeholder-[#736c5e] font-sans focus:outline-none focus:border-[#c59b27] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-[#c59b27] to-[#e2b740] hover:from-[#b58b1a] hover:to-[#d4a833] text-black text-xs font-sans uppercase font-medium tracking-wider transition-all cursor-pointer shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
                    aria-label="Subscribe to newsletter"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Links Column 1: Salons & Ateliers (2 cols) */}
          <div className="md:col-span-2 space-y-3 font-sans">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#e2b740] font-semibold">
              Shops
            </h4>
            <ul className="space-y-2 text-xs text-[#9c9384]">
              <li className="hover:text-white transition-colors">Havelock City Mall, Havelock, Sri Lanka</li>
              <li className="hover:text-white transition-colors">Galle, Sri Lanka</li>
            </ul>
          </div>

          {/* Nav Links Column 2: Client Concierge (2 cols) */}
          <div className="md:col-span-2 space-y-3 font-sans">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#e2b740] font-semibold">
              Contact Us
            </h4>
            <ul className="space-y-2 text-xs text-[#9c9384]">
              <li className="hover:text-white transition-colors cursor-pointer">E-Mail: LYRACLOTHING@gmail.com</li>
              <li className="hover:text-white transition-colors cursor-pointer"></li>
              <li className="hover:text-white transition-colors cursor-pointer"></li>
              <li className="hover:text-white transition-colors cursor-pointer"></li>
              <li className="hover:text-white transition-colors cursor-pointer"></li>
            </ul>
          </div>

          {/* Nav Links Column 3: Legal & Standards (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-sans">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#e2b740] font-semibold">
              Commitment to Craft
            </h4>
            <p className="text-xs text-[#9c9384] leading-relaxed font-light">
              Certified GOTS and OEKO-TEX Standard 100 fibers with FSC-certified archival packaging.
            </p>
            <div className="text-[11px] text-[#e2b740] tracking-wider uppercase pt-1 font-medium">
              Atelier Direct · Zero Middlemen
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736c5e] font-sans">
          <div>
            © {new Date().getFullYear()} LYRA Clothing Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#d4cbba] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-[#d4cbba] transition-colors">
              Terms of Atelier Service
            </a>
            <a href="#sustainability" className="hover:text-[#d4cbba] transition-colors">
              Ethical Sourcing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

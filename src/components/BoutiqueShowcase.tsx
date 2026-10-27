/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/products.ts';
import { MapPin, Clock, Calendar, Check, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BoutiqueShowcase: React.FC = () => {
  const [activeSalon, setActiveSalon] = useState<'milan' | 'paris' | 'nyc'>('milan');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: 'Julian Vance',
    email: 'client@atelier.com',
    date: '2026-11-04',
    time: '15:00',
    service: 'Bespoke Fitting & Seasonal Wardrobe Preview',
  });

  const salons = {
    milan: {
      name: 'Milan Flagship & Atelier',
      address: 'Via Montenapoleone, 18, 20121 Milano',
      hours: 'Mon – Sat: 10:00 – 19:30 · Sunday by Appointment',
      concierge: '+39 02 8901 4400',
      description: 'Our primary architectural sanctuary. Features custom roman travertine walls, monolithic Nero Marquina plinths, and private VIP dressing salons overlooking the private courtyard.',
    },
    paris: {
      name: 'Paris Haute Salon',
      address: '24 Rue du Faubourg Saint-Honoré, 75008 Paris',
      hours: 'Mon – Sat: 10:30 – 19:00',
      concierge: '+33 1 42 68 55 00',
      description: 'An intimate salon steeped in Parisian couture tradition. Dedicated to bespoke eveningwear fittings, silk consultations, and rare vintage archives.',
    },
    nyc: {
      name: 'New York Madison Salon',
      address: '740 Madison Avenue, New York, NY 10065',
      hours: 'Mon – Sat: 11:00 – 19:00 · Sun: 12:00 – 18:00',
      concierge: '+1 212 555 0199',
      description: 'Two floors of bespoke ready-to-wear and tailored menswear, featuring our signature private VIP champagne lounge.',
    },
  };

  const current = salons[activeSalon];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setAppointmentModalOpen(false);
    }, 2500);
  };

  return (
    <section id="boutique" className="w-full py-24 bg-[#0c0907] text-[#f6efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#261f18] bg-[#14100c] shadow-2xl">
              <img
                src={BRAND_ASSETS.flagshipFacade}
                alt="LYRA Flagship Boutique Facade"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Medallion Inset Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-[#14100c]/90 backdrop-blur-md p-2.5 border border-[#c59b27]/60 shadow-md pr-4">
                <img
                  src={BRAND_ASSETS.medallionMirror}
                  alt="LYRA Emblem Medallion"
                  className="w-10 h-10 rounded-full object-cover border border-[#c59b27]"
                />
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#e6cb6d] font-sans font-semibold block">
                    Physical Sanctum
                  </span>
                  <span className="text-xs text-[#f6efe6] font-serif font-medium">
                    Via Montenapoleone, Milan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Salons Info & Booking Action (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#16120d] border border-[#c59b27]/60 shadow-xs mb-3">
                <Sparkles className="w-3 h-3 text-[#c59b27]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#e6cb6d] font-semibold font-sans">
                  Physical Architecture
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f6efe6] font-light">
                The Flagship Experience
              </h2>
              <div className="w-12 h-px bg-[#c59b27] my-3" />
              <p className="text-sm text-[#a89d8c] font-light mt-2 leading-relaxed">
                Architectural retreats where tailored consultations, champagne receptions, and bespoke fittings unfold in total discretion.
              </p>
            </div>

            {/* City Selector Tabs (Seamless, no divider line) */}
            <div className="flex items-center gap-4 pb-2">
              <button
                onClick={() => setActiveSalon('milan')}
                className={`pb-1 text-xs font-sans tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                  activeSalon === 'milan'
                    ? 'text-[#e6cb6d] border-b-2 border-[#c59b27] font-semibold'
                    : 'text-[#a89d8c] hover:text-[#f6efe6]'
                }`}
              >
                Milan
              </button>
              <span className="text-[#3a3026]">·</span>
              <button
                onClick={() => setActiveSalon('paris')}
                className={`pb-1 text-xs font-sans tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                  activeSalon === 'paris'
                    ? 'text-[#e6cb6d] border-b-2 border-[#c59b27] font-semibold'
                    : 'text-[#a89d8c] hover:text-[#f6efe6]'
                }`}
              >
                Paris
              </button>
              <span className="text-[#3a3026]">·</span>
              <button
                onClick={() => setActiveSalon('nyc')}
                className={`pb-1 text-xs font-sans tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                  activeSalon === 'nyc'
                    ? 'text-[#e6cb6d] border-b-2 border-[#c59b27] font-semibold'
                    : 'text-[#a89d8c] hover:text-[#f6efe6]'
                }`}
              >
                New York
              </button>
            </div>

            {/* Salon Card */}
            <div className="p-6 bg-[#14100c] border border-[#261f18] shadow-sm space-y-3 font-sans">
              <h3 className="font-serif text-2xl text-[#f6efe6] font-normal">
                {current.name}
              </h3>
              <p className="text-xs text-[#a89d8c] leading-relaxed font-light">
                {current.description}
              </p>
              <div className="pt-3 border-t border-[#261f18] space-y-2 text-xs text-[#c2b6a3]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>{current.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>{current.hours}</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() => setAppointmentModalOpen(true)}
                className="px-8 py-3.5 bg-[#16120d] hover:bg-[#221b13] text-white border border-[#c59b27] text-xs font-sans tracking-[0.2em] uppercase font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#e6cb6d]" />
                <span>Reserve Private Styling Salon</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      <AnimatePresence>
        {appointmentModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="fixed inset-0 cursor-pointer" onClick={() => setAppointmentModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#faf8f5] border border-[#d9ceb7] p-6 sm:p-8 z-10 text-[#141414] shadow-2xl"
            >
              <button
                onClick={() => setAppointmentModalOpen(false)}
                className="absolute top-4 right-4 text-[#666053] hover:text-[#111111] p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingConfirmed ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#f3ebd6] border border-[#c59b27] flex items-center justify-center mx-auto text-[#8c6b1b]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#111111]">Private Salon Reserved</h3>
                  <p className="text-xs text-[#555044] font-light max-w-xs mx-auto">
                    A senior stylist has been assigned to your session at {current.name}. A confirmation SMS and private calendar invitation have been dispatched.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#8c6b1b] font-sans font-semibold block">
                      Private Atelier Concierge
                    </span>
                    <h3 className="font-serif text-2xl text-[#111111] mt-0.5">
                      Reserve Styling Salon
                    </h3>
                    <p className="text-xs text-[#615a4d] font-light mt-0.5">
                      {current.name} · Complimentary private champagne appointment
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1 font-sans font-medium">
                      Client Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={appointmentData.name}
                      onChange={(e) => setAppointmentData({ ...appointmentData, name: e.target.value })}
                      className="w-full bg-white border border-[#ded5bf] px-3 py-2 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1 font-sans font-medium">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={appointmentData.date}
                        onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                        className="w-full bg-white border border-[#ded5bf] px-3 py-2 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1 font-sans font-medium">
                        Time Slot
                      </label>
                      <select
                        value={appointmentData.time}
                        onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                        className="w-full bg-white border border-[#ded5bf] px-3 py-2 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27]"
                      >
                        <option value="11:00">11:00 AM</option>
                        <option value="13:30">1:30 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:30">6:30 PM (Private Evening)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3d382e] mb-1 font-sans font-medium">
                      Experience Focus
                    </label>
                    <select
                      value={appointmentData.service}
                      onChange={(e) => setAppointmentData({ ...appointmentData, service: e.target.value })}
                      className="w-full bg-white border border-[#ded5bf] px-3 py-2 text-xs text-[#111111] font-sans focus:outline-none focus:border-[#c59b27]"
                    >
                      <option value="Bespoke Fitting &amp; Seasonal Wardrobe Preview">Bespoke Fitting &amp; Seasonal Wardrobe Preview</option>
                      <option value="Haute Couture Eveningwear Consultation">Haute Couture Eveningwear Consultation</option>
                      <option value="Made-to-Measure Suiting &amp; Coat Sizing">Made-to-Measure Suiting &amp; Coat Sizing</option>
                      <option value="Private Salon Champagne VIP Gifting">Private Salon Champagne VIP Gifting</option>
                    </select>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#111111] hover:bg-black text-[#faf8f5] border border-[#c59b27]/60 text-xs font-sans tracking-[0.2em] uppercase font-medium transition-all shadow-md cursor-pointer"
                    >
                      Confirm Salon Reservation
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

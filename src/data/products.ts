/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FreeGift {
  name: string;
  image: string;
  subtitle?: string;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency?: string;
  category: 'Women' | 'Men' | 'Essentials' | 'Accessories';
  categoryLabel: string;
  image: string;
  secondaryImage?: string;
  galleryImages: string[];
  description: string;
  story: string;
  fabric: string;
  origin: string;
  care: string;
  colors: { name: string; hex: string }[];
  sizes: { size: string; stock: number }[];
  featured?: boolean;
  isNewArrival?: boolean;
  lookbookSceneId?: string;
  freeGift?: FreeGift;
}

export const BRAND_ASSETS = {
  heroCampaign: '/assets/images/hero_campaign.jpeg',
  logoClean: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.00__1__e7d9247d.jpeg',
  medallionMirror: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.05.59_91760463.jpeg',
  flagshipFacade: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.01__2__1687fde4.jpeg',
  packagingSuite: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.01_943f75b3.jpeg',
  touchpointsCollage: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.00__2__366dff9b.jpeg',
  storefrontDetails: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.01__1__0a14976e.jpeg',
};

export const BRAND_PILLARS = [
  {
    title: 'PREMIUM QUALITY',
    desc: 'Ethically sourced Virgin Wool, Mulberry Silk, and Egyptian long-staple cotton.',
    icon: 'diamond',
  },
  {
    title: 'TRENDY DESIGNS',
    desc: 'Architectural silhouettes blending modern minimalist lines with timeless haute couture.',
    icon: 'hanger',
  },
  {
    title: 'FOR EVERY STORY',
    desc: 'Bespoke garments engineered to empower individual expression in every room.',
    icon: 'leaf',
  },
  {
    title: 'MEN & WOMEN COLLECTION',
    desc: 'Cohesive seasonal palettes tailored for contemporary sartorial elegance.',
    icon: 'heart',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'lyra-01',
    name: 'Atelier Halterneck Pleated Silk Gown',
    subtitle: 'Laurel Olive Pleated Mulberry Silk',
    price: 2450,
    currency: 'LKR',
    category: 'Women',
    categoryLabel: "Women's Atelier",
    image: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.46.51-2_5502a9d5.jpeg',
    secondaryImage: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.46.50_4df5a283.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.46.51-2_5502a9d5.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.46.50_4df5a283.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.46.51_c5a7a499.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.46.52-2_9c7f38ef.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.46.52_ca6f0c49.jpeg',
    ],
    description: 'An ethereal floor-sweeping silhouette tailored in flowing pleated mulberry silk. Features a sculpted halterneck with cascading back tie ribbons, architectural waist gathering, and fine micro-accordion pleats.',
    story: 'Conceived for gala evenings and grand soirees. The fluid Laurel Olive drape catches amber light with every stride, embodying quiet aristocratic grace and haute couture artistry.',
    fabric: '100% Mulberry Silk Chiffon. Hand-pleated bodice & skirt.',
    origin: 'Handcrafted in Milan, Italy',
    care: 'Specialist dry clean only. Store in breathable garment bag.',
    colors: [
      { name: 'Ivory White', hex: '#F5F0E6' },
      { name: 'Olive Green', hex: '#41472A' },
      { name: 'Classic Black', hex: '#171717' },
      { name: 'Navy Blue', hex: '#142D59' },
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 },
    ],
    featured: true,
    isNewArrival: true,
    lookbookSceneId: 'campaign-women',
    freeGift: {
      name: 'Atelier Crystal Chandelier Earrings',
      subtitle: 'Complimentary luxury gift with purchase',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.46.54_0a6d56f3.jpeg',
      badge: 'Free Gift',
    },
  },
  {
    id: 'lyra-02',
    name: 'Atelier Relaxed Silhouette Overshirt',
    subtitle: 'Four-Tone Soft Touch Cotton',
    price: 2450,
    currency: 'LKR',
    category: 'Women',
    categoryLabel: "Men's Atelier",
    image: '/assets/aistudio/ly2_1.jpeg',
    secondaryImage: '/assets/aistudio/ly2_2.jpeg',
    galleryImages: [
      '/assets/aistudio/ly2_1.jpeg',
      '/assets/aistudio/ly2_2.jpeg',
      '/assets/aistudio/ly2_3.jpeg',
      '/assets/aistudio/ly2_4.jpeg',
    ],
    description: 'A contemporary relaxed staple crafted from premium combed cotton twill. Features a fluid silhouette, drop shoulders, clean placket, and tonal horn buttons tailored across four versatile shades.',
    story: 'Crafted for relaxed elegance. Transitions effortlessly from sunlit mornings to evening gatherings with understated sartorial confidence.',
    fabric: '100% Breathable High-Density Cotton Twill',
    origin: 'Crafted in Colombo, Sri Lanka',
    care: 'Cold gentle wash. Reshape and line dry in shade.',
    colors: [
      { name: 'Baby Pink', hex: '#F2B7C3' },
      { name: 'Black', hex: '#171717' },
      { name: 'Baby Blue', hex: '#8DB5E8' },
      { name: 'White / Ivory', hex: '#F7F3EB' },
    ],
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 4 },
    ],
    featured: true,
    isNewArrival: true,
    lookbookSceneId: 'campaign-men',
    freeGift: {
      name: 'Atelier Crystal Chandelier Bengals',
      subtitle: 'Complimentary luxury gift with purchase',
      image: '/assets/aistudio/ly2_f.jpeg',
      badge: 'Free Gift',
    },
  },
  {
    id: 'lyra-03',
    name: 'Pleated High-Waisted Atelier Top',
    subtitle: 'Double Pleat Sartorial Drape',
    price: 2450,
    currency: 'LKR',
    category: 'Women',
    categoryLabel: "Women's Atelier",
    image: '/assets/aistudio/ly3_2.jpeg',
    secondaryImage: '/assets/aistudio/ly3_1.jpeg',
    galleryImages: [
      '/assets/aistudio/ly3_2.jpeg',
      '/assets/aistudio/ly3_1.jpeg',
      '/assets/aistudio/ly3_3.jpeg',
      '/assets/aistudio/ly3_4.jpeg',
    ],
    description: 'Designed with deep inverted front pleats and an extended waistband tab. Yields an elongated, sculptural silhouette with unparalleled movement.',
    story: 'Pairs seamlessly with the Atelier Double-Breasted Blazer to form the definitive Lyra power suit.',
    fabric: '96% Virgin Wool, 4% Cashmere',
    origin: 'Florence, Italy',
    care: 'Dry clean only.',
    colors: [
      { name: 'Ivory', hex: '#F8F5EF' },
      { name: 'Beige', hex: '#C9A27E' },
      { name: 'Classic Black', hex: '#171717' },
      { name: 'Beige', hex: '#C9A27E' },
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 3 },
      { size: 'L', stock: 1 },
    ],
    featured: true,
    isNewArrival: true,
    freeGift: {
      name: 'Braided Silk Neckless',
      subtitle: 'Complimentary luxury gift with purchase',
      image: '/assets/aistudio/ly3_f.jpeg',
      badge: 'Free Gift',
    },
  },
  {
    id: 'lyra-04',
    name: 'Signature Embossed Heavyweight Crewneck',
    subtitle: '480gsm Combed Loopback Cotton',
    price: 3400,
    currency: 'LKR',
    category: 'Essentials',
    categoryLabel: 'Signature Essentials',
    image: '/assets/aistudio/ly4_1.jpeg',
    secondaryImage: '/assets/aistudio/ly4_2.jpeg',
    galleryImages: [
      '/assets/aistudio/ly4_1.jpeg',
      '/assets/aistudio/ly4_2.jpeg',
      '/assets/aistudio/ly4_3.jpeg',
      '/assets/aistudio/ly4_4.jpeg',
      '/assets/aistudio/ly4_5.jpeg',
    ],
    description: 'Our iconic daily piece. Constructed with substantial 480gsm brushed loopback cotton, seamless flatlock stitching, and the signature gold-embossed LYRA neck and hem tags.',
    story: 'Tested across 100 wash cycles to guarantee zero pilling and lifelong structural integrity.',
    fabric: '100% GOTS-Certified Organic Combed Cotton',
    origin: 'Porto, Portugal',
    care: 'Machine wash delicate at 30°C. Reshape while damp.',
    colors: [
      { name: 'Chocolate Brown', hex: '#824522' },
      { name: 'Ivory White', hex: '#F4E9D5' },
      { name: 'Classic Black', hex: '#171615' },
      { name: 'Burgundy Wine', hex: '#841B2D' },
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 9 },
      { size: 'XL', stock: 4 },
    ],
    featured: true,
    isNewArrival: false,
    lookbookSceneId: 'unboxing-details',
    freeGift: {
      name: 'Braided Silk Neckless',
      subtitle: 'Complimentary luxury gift with purchase',
      image: '/assets/aistudio/ly4_f.jpeg',
      badge: 'Free Gift',
    },
  },
  {
    id: 'lyra-05',
    name: 'Satin Muse Top',
    subtitle: '500gsm Heavyweight with Engraved Zipper',
    price: 290,
    category: 'Essentials',
    categoryLabel: 'Signature Essentials',
    image: '/assets/aistudio/ly5_1.jpeg',
    secondaryImage: '/assets/aistudio/ly5_2.jpeg',
    galleryImages: [
      '/assets/aistudio/ly5_1.jpeg',
      '/assets/aistudio/ly5_2.jpeg',
      '/assets/aistudio/ly5_3.jpeg',
      '/assets/aistudio/ly5_4.jpeg',
    ],
    description: 'Double-layered hood that holds its structure. Features a custom champagne brass zipper pull and aglets hand-engraved with the LYRA wordmark.',
    story: 'Elevating the humble hoodie into an object of haute desire. The tactile metallic weight and ultra-dense knit provide unmatched warmth.',
    fabric: '100% Extra-Long Staple Cotton (500gsm)',
    origin: 'Porto, Portugal',
    care: 'Machine wash cold inside out. Do not tumble dry.',
    colors: [
      { name: 'Obsidian Noir', hex: '#111111' },
    ],
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 7 },
      { size: 'XL', stock: 3 },
    ],
    featured: false,
    isNewArrival: true,
    freeGift: {
      name: 'Archival Organic Cotton Shopper Tote',
      subtitle: 'Complimentary luxury gift with purchase',
      image: '/assets/aistudio/ly4_f.jpeg',
      badge: 'Free Gift',
    },
  },
  {
    id: 'lyra-06',
    name: 'Architectural Leather Grand Flap Bag',
    subtitle: 'French Box Calfskin with Gold Hardware',
    price: 7850,
    currency: 'LKR',
    category: 'Accessories',
    categoryLabel: 'Leather & Accessories',
    image: '/assets/aistudio/ly_bag2.jpeg',
    secondaryImage: '/assets/aistudio/ly_bag2.jpeg',
    galleryImages: [
      '/assets/aistudio/ly_bag2.jpeg',
    ],
    description: 'Sharp bevelled edges sculpted from vegetable-tanned French calfskin. Finished with our signature polished 24k gold-plated brass lock mechanism.',
    story: 'Echoing the architectural geometries of our flagship salon. Comes enveloped in custom Lyra archival tissue and luxury presentation case.',
    fabric: '100% Full-Grain French Calfskin. Suede microfiber interior.',
    origin: 'Crafted in Lyon, France',
    care: 'Store in velvet dust bag. Condition annually with leather balm.',
    colors: [
      { name: 'Matte Noir', hex: '#090909' },
      { name: 'Travertine Warm Sand', hex: '#c5b8a5' },
      { name: 'Baby Pink', hex: '#F2B7C3' },
    ],
    sizes: [{ size: 'One Size (36cm x 28cm x 12cm)', stock: 5 }],
    featured: true,
    isNewArrival: true,
    lookbookSceneId: 'unboxing-suite',
  },
  {
    id: 'lyra-07',
    name: 'Rebel Muse Jeans',
    subtitle: 'Hand-Rolled Edges & Gold Foil Monogram',
    price: 195,
    category: 'Essentials',
    categoryLabel: 'Leather & Accessories',
    image: '/assets/aistudio/ly6_1.jpeg',
    secondaryImage: '/assets/aistudio/ly6_2.jpeg',
    galleryImages: [
      '/assets/aistudio/ly6_1.jpeg',
      '/assets/aistudio/ly6_2.jpeg',
      '/assets/aistudio/ly6_3.jpeg',
      '/assets/aistudio/ly6_4.jpeg',
      '/assets/aistudio/ly6_5.jpeg',
    ],
    description: 'Woven with whisper-light 70% Mongolian Cashmere and 30% Mulberry Silk. Edges meticulously hand-rolled by master artisans.',
    story: 'The delicate tactile companion to our tailored outerwear. Packaged in our black magnetic keepsake box with wax seal sticker.',
    fabric: '70% Cashmere, 30% Mulberry Silk',
    origin: 'Como, Italy',
    care: 'Dry clean only.',
    colors: [
      { name: 'Champagne Ivory', hex: '#ede8dd' },
      { name: 'Charcoal Noir', hex: '#1c1c1c' },
    ],
    sizes: [{ size: 'One Size (200cm x 70cm)', stock: 8 }],
    featured: false,
    isNewArrival: false,
    freeGift: {
      name: 'Atelier Cashmere Mist Conditioning Spray',
      subtitle: 'Complimentary luxury gift with purchase',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.01_943f75b3.jpeg',
      badge: 'Free Gift',
    },
  },
  {
    id: 'lyra-08',
    name: 'Crystal Royale Pumps',
    subtitle: 'Double-Faced Loro Piana Cashmere',
    price: 1150,
    category: 'Accessories',
    categoryLabel: "Women's Atelier",
    image: '/assets/aistudio/ly_shoes1.jpeg',
    secondaryImage: '/assets/aistudio/ly_shoes1.jpeg',
    galleryImages: [
      '/assets/aistudio/ly_shoes2.jpeg',
    ],
    description: 'An unlined, double-faced cashmere coat meticulously joined by invisible hand stitches. Fluid drape with kimono-cut sleeves and self-fabric sash.',
    story: 'The pinnacle of tactile luxury. Featherlight yet effortlessly insulating against autumn and winter chills.',
    fabric: '100% Double-Faced Cashmere (620gsm)',
    origin: 'Piedmont, Italy',
    care: 'Specialist luxury dry clean.',
    colors: [
      { name: 'Oatmeal Travertine', hex: '#dfd8cc' },
      { name: 'Midnight Obsidian', hex: '#0a0a0c' },
    ],
    sizes: [
      { size: 'XS', stock: 1 },
      { size: 'S', stock: 3 },
      { size: 'M', stock: 2 },
      { size: 'L', stock: 1 },
    ],
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'lyra-09',
    name: 'The Élora Blouse',
    subtitle: 'Double-Faced Loro Piana Cashmere',
    price: 2900,
    category: 'Women',
    categoryLabel: "Women's Atelier",
    image: '/assets/aistudio/ly9_1.jpeg',
    secondaryImage: '/assets/aistudio/ly9_2.jpeg',
    galleryImages: [
      '/assets/aistudio/ly9_1.jpeg',
      '/assets/aistudio/ly9_2.jpeg',
      '/assets/aistudio/ly9_3.jpeg',
      '/assets/aistudio/ly9_4.jpeg',
    ],
    description: 'An unlined, double-faced cashmere coat meticulously joined by invisible hand stitches. Fluid drape with kimono-cut sleeves and self-fabric sash.',
    story: 'The pinnacle of tactile luxury. Featherlight yet effortlessly insulating against autumn and winter chills.',
    fabric: '100% Double-Faced Cashmere (620gsm)',
    origin: 'Piedmont, Italy',
    care: 'Specialist luxury dry clean.',
    colors: [
      { name: 'Oatmeal Travertine', hex: '#dfd8cc' },
      { name: 'Midnight Obsidian', hex: '#0a0a0c' },
    ],
    sizes: [
      { size: 'XS', stock: 1 },
      { size: 'S', stock: 3 },
      { size: 'M', stock: 2 },
      { size: 'L', stock: 1 },
    ],
    featured: true,
    isNewArrival: true,
  },
];

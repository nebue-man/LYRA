/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Hotspot {
  id: string;
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  title: string;
  subtitle: string;
  productId?: string;
  price?: number;
}

export interface LookbookScene {
  id: string;
  title: string;
  subtitle: string;
  category: 'Campaign' | 'Flagship' | 'Packaging' | 'Craftsmanship';
  image: string;
  description: string;
  quote: string;
  hotspots: Hotspot[];
}

export const LOOKBOOK_SCENES: LookbookScene[] = [
  {
    id: 'campaign-editorial',
    title: 'The Sartorial Duet',
    subtitle: 'Campaign Autumn/Winter — Wear Your Story',
    category: 'Campaign',
    image: '/src/assets/images/hero_campaign_upscaled.PNG',
    description: 'An architectural dialogue between light and shadow. Impeccably draped virgin wool flannel juxtaposed against textured travertine pillars.',
    quote: '"Fashion is not merely what we put on; it is the silent architecture of who we become."',
    hotspots: [
      {
        id: 'The Élora Blouse',
        x: 25,
        y: 40,
        title: 'Double-Faced Loro Piana Cashmere',
        subtitle: 'Womens Atelier',
        productId: 'lyra-09',
        price: 2900,
      },
      {
        id: 'Signature Embossed Heavyweight Crewneck',
        x: 70,
        y: 35,
        title: 'Signature Embossed Heavyweight Crewneck',
        subtitle: '480gsm Combed Loopback Cotton',
        productId: 'lyra-04',
        price: 3400,
      },
    ],
  },
  {
    id: 'packaging-suite',
    title: 'The Art of Unboxing',
    subtitle: 'Signature Presentation & Atelier Care',
    category: 'Packaging',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.01_943f75b3.jpeg',
    description: 'Every LYRA garment is enveloped in bespoke tissue paper, sealed with our gold wax medallion, and nestled inside a magnetic gift box with grossgrain ribbons.',
    quote: '"The journey begins the moment your fingertips meet the weighted cotton ribbon."',
    hotspots: [
      {
        id: 'hs-pack-box',
        x: 18,
        y: 58,
        title: 'Matte Obsidian Keepsake Box',
        subtitle: 'Foil embossed with recycled card',
      },
      {
        id: 'hs-pack-crew',
        x: 50,
        y: 56,
        title: 'Signature Embossed Crewneck',
        subtitle: '480gsm Organic Combed Cotton',
        productId: 'lyra-04',
        price: 240,
      },
      {
        id: 'hs-pack-note',
        x: 38,
        y: 88,
        title: 'Handwritten Atelier Letter',
        subtitle: 'Personalized greeting with every order',
      },
      {
        id: 'hs-pack-pouch',
        x: 14,
        y: 88,
        title: 'Velvet Drawstring Travel Bag',
        subtitle: 'Custom gold hardware aglets',
      },
    ],
  },
  {
    id: 'flagship-boutique',
    title: 'Via Montenapoleone Flagship',
    subtitle: 'Architectural Sanctum & Private Salon',
    category: 'Flagship',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.01__2__1687fde4.jpeg',
    description: 'Bespoke travertine slabs, warm indirect perimeter halos, and monolithic Nero Marquina display plinths define our Milanese physical sanctuary.',
    quote: '"A physical space crafted to suspend time and elevate the human touch."',
    hotspots: [
      {
        id: 'hs-store-facade',
        x: 50,
        y: 18,
        title: 'Halo-Backlit Golden Logotype',
        subtitle: 'Custom bronze foundry casting',
      },
      {
        id: 'hs-store-mannequin-w',
        x: 28,
        y: 65,
        title: 'Pleated High-Waisted Atelier Trousers',
        subtitle: 'Hand-tailored in Florence',
        productId: 'lyra-03',
        price: 320,
      },
      {
        id: 'hs-store-mannequin-m',
        x: 18,
        y: 65,
        title: 'Obsidian Overshirt & Tee',
        subtitle: 'Contemporary evening profile',
        productId: 'lyra-02',
        price: 360,
      },
    ],
  },
  {
    id: 'craftsmanship-details',
    title: 'Touchpoints of Distinction',
    subtitle: 'Materials, Hardware & Woven Identity',
    category: 'Craftsmanship',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_15.06.00__2__366dff9b.jpeg',
    description: 'Heavyweight textured cardstocks with gold hot-stamping, milled brass zipper pulls with micro-chamfers, and woven damask labels that soften with wear.',
    quote: '"True luxury whispers through the details that only the wearer discovers."',
    hotspots: [
      {
        id: 'hs-craft-zipper',
        x: 44,
        y: 90,
        title: 'Engraved Brass Zipper Pull',
        subtitle: 'Solid brass with satin nickel finish',
        productId: 'lyra-05',
        price: 290,
      },
      {
        id: 'hs-craft-tag',
        x: 75,
        y: 25,
        title: 'Foil-Embossed Hangtag Suite',
        subtitle: 'FSC-Certified 600gsm stock',
      },
      {
        id: 'hs-craft-neck',
        x: 26,
        y: 65,
        title: 'Signature Gold Woven Label',
        subtitle: 'Zero-irritation jacquard weave',
        productId: 'lyra-04',
        price: 240,
      },
    ],
  },
];

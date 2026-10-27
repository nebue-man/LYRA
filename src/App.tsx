/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product } from './data/products.ts';
import { CartItem } from './utils/checkout.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { ProductModal } from './components/ProductModal.tsx';
import { LookbookGallery } from './components/LookbookGallery.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { BoutiqueShowcase } from './components/BoutiqueShowcase.tsx';
import { AtelierStory } from './components/AtelierStory.tsx';
import { Footer } from './components/Footer.tsx';
import { FallingLeaves } from './components/FallingLeaves.tsx';
import { Search, SlidersHorizontal, Sparkles, Check, Heart } from 'lucide-react';

export default function App() {
  // Initial cart with signature Atelier Halterneck Gown for immediate interactive checkout experience
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'lyra-01',
      name: 'Atelier Halterneck Pleated Silk Gown',
      price: 540,
      quantity: 1,
      selectedSize: 'S',
      selectedColor: 'Laurel Olive',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.46.51-2_5502a9d5.jpeg',
      category: "Women's Atelier",
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['lyra-02', 'lyra-06']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [giftPackaging, setGiftPackaging] = useState(true);
  const [promoCode, setPromoCode] = useState('LYRA10');

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeSection, setActiveSection] = useState('hero');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Section navigation helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          quantity: 1,
          selectedSize: size,
          selectedColor: color,
          image: product.image,
          category: product.categoryLabel,
        },
      ];
    });
    showToast(`Added "${product.name}" (${size}) to your Wardrobe Rack`);
  };

  const handleUpdateQuantity = (id: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id, size, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string, size: string, color: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
      )
    );
    showToast('Item removed from Wardrobe Rack');
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved atelier pieces');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your private atelier wishlist');
        return [...prev, productId];
      }
    });
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Filtered & sorted products
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-[#0a0807] text-[#f6efe6] flex flex-col selection:bg-[#c59b27]/30 selection:text-white relative">
      {/* Ambient Autumn Falling Leaves Animation */}
      <FallingLeaves />

      {/* Top Bar Contract Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Editorial Campaign Hero */}
        <Hero
          onExplore={() => handleNavigate('collections')}
          onOpenLookbook={() => handleNavigate('lookbook')}
        />

        {/* Collections Catalog Section: Continues darker tone with zero dividing lines */}
        <section id="collections" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Section Header & Description (No breaking border line) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#e6cb6d] font-sans font-medium block mb-1.5">
                Autumn / Winter Atelier
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#f6efe6]">
                The Permanent Collection
              </h2>
              <p className="text-xs sm:text-sm text-[#a89d8c] font-light mt-1 max-w-lg">
                Sculptural tailored suiting, knitwear, and leather goods crafted in Italy and Portugal.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection, fabric, cut..."
                className="w-full bg-[#14100c] border border-[#2a2219] pl-9 pr-3 py-2 text-xs text-[#f6efe6] placeholder-[#8c7e6c] font-sans focus:outline-none focus:border-[#c59b27] shadow-sm"
              />
              <Search className="w-3.5 h-3.5 text-[#8c7e6c] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Filtering & Sorting Controls (Zero-pill compliant segmented tabs) */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-sans">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#14100c] border border-[#261f18]">
              {['All', 'Women', 'Men', 'Essentials', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 uppercase tracking-wider font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#c59b27] text-[#0a0807] font-semibold shadow-sm'
                      : 'text-[#a89d8c] hover:text-[#f6efe6] bg-transparent'
                  }`}
                >
                  {cat === 'All' ? 'All Pieces' : cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-[#a89d8c]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#14100c] border border-[#261f18] text-[#f6efe6] text-xs px-2.5 py-1.5 font-sans focus:outline-none focus:border-[#c59b27] cursor-pointer shadow-sm"
                aria-label="Sort collection"
              >
                <option value="featured">Atelier Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid (3-column desktop baseline with uniform cards) */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <h3 className="font-serif text-2xl text-neutral-300">No pieces found</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Try adjusting your search terms or filter selections.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-neutral-800 text-xs text-white uppercase tracking-wider hover:bg-neutral-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                  onQuickAdd={(p, size) => handleAddToCart(p, size, p.colors[0]?.name || 'Noir')}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}
        </section>

        {/* Interactive Haute Lookbook Gallery (Editorial hotspots + flagship views) */}
        <LookbookGallery
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={(p, size) => handleAddToCart(p, size, p.colors[0]?.name || 'Noir')}
        />

        {/* Atelier Craftsmanship & Packaging Suite Story */}
        <AtelierStory />

        {/* Flagship Boutique & Private VIP Appointments */}
        <BoutiqueShowcase />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Product Detail Modal (PDP) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        giftPackaging={giftPackaging}
        onToggleGiftPackaging={setGiftPackaging}
        promoCode={promoCode}
        onApplyPromoCode={setPromoCode}
      />

      {/* Seamless Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        giftPackaging={giftPackaging}
        promoCode={promoCode}
        onOrderCompleted={(orderNum) => {
          showToast(`Order ${orderNum} confirmed! Confirmation sent to your email.`);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistedProducts}
        onRemove={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onMoveToBag={(p, size) => {
          handleAddToCart(p, size, p.colors[0]?.name || 'Noir');
          showToast(`Moved "${p.name}" to your Wardrobe Rack`);
        }}
      />

      {/* Quiet Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616] text-white border border-amber-400/60 shadow-2xl px-4 py-3 flex items-center gap-2.5 text-xs font-sans tracking-wide">
          <Check className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

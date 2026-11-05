import React, { useState } from 'react';
import {
  ArrowRight,
  Shield,
  Truck,
  Sparkles,
  CheckCircle,
  Mail,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES, ARTISANS } from '../data/mockData';
import { REAL_ASSETS } from '../data/artVisuals';
import { ArtImage } from './ArtImage';

export const HomeView: React.FC = () => {
  const { navigateTo, products, showToast } = useMarketplace();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew || p.isTrending).slice(0, 4);
  const personalized = products.slice(4, 8);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      showToast('Welcome to ARTORA! Use code ARTORA10 for 10% off your first order.', 'success');
    }
  };

  return (
    <div className="pb-24 lg:pb-16 space-y-16">
      {/* 1. Hero Promotional Campaign Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-[#EAE2F5]/60 border border-[#D8C8F0]/60 relative shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:min-h-[520px]">
            {/* Left Content Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-center z-10">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#77717D] uppercase mb-3">
                <span>Curated International Masterpieces</span>
                <span aria-hidden="true">·</span>
                <span>Original Artworks</span>
              </div>

              <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#35313B] leading-[1.15] text-balance">
                Discover Art. <br />
                <span className="italic font-normal">Express Yourself.</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#77717D] leading-relaxed max-w-xl">
                The premier global marketplace connecting discerning collectors with master calligraphers, fine art painters, and bespoke heirloom artisans worldwide.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => navigateTo('explore')}
                  className="px-6 py-3.5 rounded-xl bg-[#35313B] text-white text-xs sm:text-sm font-semibold hover:bg-[#35313B]/90 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Artworks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const cat = CATEGORIES.find((c) => c.id === 'islamic-calligraphy');
                    navigateTo('category-view', { category: cat });
                  }}
                  className="px-5 py-3.5 rounded-xl bg-[#FFFDF7] text-[#35313B] border border-[#D8C8F0] text-xs sm:text-sm font-semibold hover:bg-[#EAE2F5] transition-all cursor-pointer"
                >
                  Islamic & Arabic Calligraphy
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 pt-6 border-t border-[#D8C8F0]/60 flex items-center gap-6 text-xs text-[#77717D]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#35313B]" />
                  <span>100% Certified Originals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#35313B]" />
                  <span>Insured Global Art Courier</span>
                </div>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden">
              <ArtImage
                src={REAL_ASSETS.heroBanner}
                alt="ARTORA Fine Art Exhibition"
                fallbackTitle="ARTORA Fine Art Exhibition"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#EAE2F5]/80 via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 14 Product Categories Strip */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif-title text-2xl font-bold text-[#35313B]">
              Browse Product Categories
            </h2>
            <p className="text-xs text-[#77717D] mt-0.5">
              14 dedicated collections of fine art, calligraphy, albums & decor
            </p>
          </div>
          <button
            onClick={() => navigateTo('explore')}
            className="text-xs font-semibold text-[#35313B] hover:text-[#77717D] flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 14 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => navigateTo('category-view', { category })}
              className="group p-3.5 rounded-2xl bg-white border border-[#D8C8F0]/40 hover:border-[#D8C8F0] hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#FFFDF7] mb-2.5">
                <ArtImage
                  src={category.featuredImage}
                  alt={category.name}
                  fallbackTitle={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[#35313B] group-hover:text-[#77717D] transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <span className="text-[10px] text-[#77717D] mt-0.5 block">
                  {category.itemCount} items
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Curated Collections Bento */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="font-serif-title text-2xl font-bold text-[#35313B]">
            Featured Artisan Spotlights
          </h2>
          <p className="text-xs text-[#77717D] mt-0.5">
            Curated works from celebrated calligraphy ateliers & bookbinderies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Spotlight 1: Master Calligraphers */}
          <div
            onClick={() => {
              const cat = CATEGORIES.find((c) => c.id === 'islamic-calligraphy');
              navigateTo('category-view', { category: cat });
            }}
            className="group relative rounded-3xl overflow-hidden bg-[#FCEEF3] border border-[#F8DDE8] p-6 sm:p-8 flex flex-col justify-between min-h-[320px] cursor-pointer hover:shadow-md transition-all"
          >
            <div className="z-10">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717D]">
                Sacred Tradition
              </span>
              <h3 className="font-serif-title text-xl font-bold text-[#35313B] mt-1">
                24k Gold Islamic Calligraphy
              </h3>
              <p className="text-xs text-[#77717D] mt-2 max-w-xs">
                Hand-illuminated Quranic verses on archival tea-toned ahar parchment by Istanbul master calligraphers.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#35313B] group-hover:gap-2 transition-all">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 rounded-full overflow-hidden opacity-90 border-4 border-white shadow-md">
              <ArtImage
                src={REAL_ASSETS.goldCalligraphy}
                alt="Gold Calligraphy"
                fallbackTitle="Gold Calligraphy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Spotlight 2: Handbound Heirlooms */}
          <div
            onClick={() => {
              const cat = CATEGORIES.find((c) => c.id === 'art-albums');
              navigateTo('category-view', { category: cat });
            }}
            className="group relative rounded-3xl overflow-hidden bg-[#EAE2F5] border border-[#D8C8F0] p-6 sm:p-8 flex flex-col justify-between min-h-[320px] cursor-pointer hover:shadow-md transition-all"
          >
            <div className="z-10">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717D]">
                Artisan Bookbindery
              </span>
              <h3 className="font-serif-title text-xl font-bold text-[#35313B] mt-1">
                Heirloom Art & Photo Albums
              </h3>
              <p className="text-xs text-[#77717D] mt-2 max-w-xs">
                Bound with Italian lilac bookcloth and gold foil stamped monograms for your most cherished memories.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#35313B] group-hover:gap-2 transition-all">
              <span>View Albums</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 rounded-full overflow-hidden opacity-90 border-4 border-white shadow-md">
              <ArtImage
                src={REAL_ASSETS.heirloomAlbum}
                alt="Heirloom Album"
                fallbackTitle="Heirloom Album"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Spotlight 3: Original Fine Art */}
          <div
            onClick={() => {
              const cat = CATEGORIES.find((c) => c.id === 'paintings');
              navigateTo('category-view', { category: cat });
            }}
            className="group relative rounded-3xl overflow-hidden bg-[#FFFDF7] border border-[#D8C8F0] p-6 sm:p-8 flex flex-col justify-between min-h-[320px] cursor-pointer hover:shadow-md transition-all"
          >
            <div className="z-10">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717D]">
                Studio Gallery
              </span>
              <h3 className="font-serif-title text-xl font-bold text-[#35313B] mt-1">
                Contemporary Linen Originals
              </h3>
              <p className="text-xs text-[#77717D] mt-2 max-w-xs">
                Ethereal dawn florals and atmospheric abstracts layered with organic mineral pigments.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#35313B] group-hover:gap-2 transition-all">
              <span>View Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 rounded-full overflow-hidden opacity-90 border-4 border-white shadow-md">
              <ArtImage
                src={REAL_ASSETS.abstractPainting}
                alt="Original Painting"
                fallbackTitle="Original Painting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Best-Selling Products */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif-title text-2xl font-bold text-[#35313B]">
              Best-Selling Creations
            </h2>
            <p className="text-xs text-[#77717D] mt-0.5">
              The most loved artworks in collectors homes worldwide
            </p>
          </div>
          <button
            onClick={() => navigateTo('explore')}
            className="text-xs font-semibold text-[#35313B] hover:text-[#77717D] flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Trending & New Arrivals */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif-title text-2xl font-bold text-[#35313B]">
              New Arrivals & Trending Work
            </h2>
            <p className="text-xs text-[#77717D] mt-0.5">
              Freshly finished pieces from worldwide artisan studios
            </p>
          </div>
          <button
            onClick={() => navigateTo('explore')}
            className="text-xs font-semibold text-[#35313B] hover:text-[#77717D] flex items-center gap-1 cursor-pointer"
          >
            <span>See More</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Featured Artists & Sellers Spotlight */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="font-serif-title text-2xl font-bold text-[#35313B]">
            Featured Artisans & Masters
          </h2>
          <p className="text-xs text-[#77717D] mt-0.5">
            Meet the international artists behind our certified handmade collections
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARTISANS.slice(0, 4).map((artisan) => (
            <div
              key={artisan.id}
              onClick={() => navigateTo('artist-profile', { artist: artisan })}
              className="p-5 rounded-2xl bg-white border border-[#D8C8F0]/50 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <ArtImage
                    src={artisan.avatar}
                    alt={artisan.name}
                    fallbackTitle={artisan.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#D8C8F0]"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-[#35313B] flex items-center gap-1">
                      {artisan.name}
                      {artisan.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-[#35313B] fill-[#D8C8F0]" />
                      )}
                    </h3>
                    <p className="text-[11px] text-[#77717D]">{artisan.storeName}</p>
                    <p className="text-[10px] text-[#77717D]">{artisan.location}</p>
                  </div>
                </div>
                <p className="text-xs text-[#77717D] line-clamp-2 leading-relaxed">
                  {artisan.bio}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAE2F5] flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-[#35313B]">{artisan.specialty}</span>
                <span className="text-[#35313B] font-semibold flex items-center gap-0.5">
                  ★ {artisan.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Personalized Product Recommendations */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#35313B]" />
            <div>
              <h2 className="font-serif-title text-2xl font-bold text-[#35313B]">
                Curated For Your Aesthetic
              </h2>
              <p className="text-xs text-[#77717D] mt-0.5">
                Personalized recommendations inspired by mindful living and timeless craftsmanship
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('explore')}
            className="text-xs font-semibold text-[#35313B] hover:text-[#77717D] flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personalized.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Newsletter Subscription Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#EAE2F5] via-[#FFFDF7] to-[#FCEEF3] border border-[#D8C8F0] p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-white border border-[#D8C8F0] flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-[#35313B]" />
          </div>

          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#35313B]">
            Join The ARTORA Art Salon
          </h2>
          <p className="text-xs sm:text-sm text-[#77717D] mt-2 max-w-md mx-auto">
            Receive private exhibition invitations, artisan studio stories, and an exclusive 10% welcome coupon.
          </p>

          {subscribed ? (
            <div className="mt-6 p-4 rounded-xl bg-white/80 border border-emerald-200 max-w-md mx-auto text-emerald-800 text-xs font-medium flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>You are subscribed! Use promo code <strong>ARTORA10</strong> at checkout for 10% off.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#D8C8F0] text-xs text-[#35313B] focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#35313B] text-white text-xs font-semibold hover:bg-[#35313B]/90 transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[10px] text-[#77717D] mt-3">
            We respect your privacy. Unsubscribe at any time with one click.
          </p>
        </div>
      </section>

      {/* 9. Professional Footer */}
      <footer className="border-t border-[#D8C8F0]/40 bg-white pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <span className="font-serif-title text-2xl font-bold text-[#35313B]">
              ARTORA
            </span>
            <p className="text-xs text-[#77717D] mt-2 font-medium">
              Discover Art. Express Yourself.
            </p>
            <p className="text-xs text-[#77717D] mt-3 leading-relaxed max-w-sm">
              The premier international destination for authentic original artwork, Islamic and modern calligraphy, handbound photo albums, and personalized artisan creations.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-[#77717D]">
              <span>Age-Appropriate Safe Marketplace (15–65)</span>
              <span>·</span>
              <span>Verified Artisans</span>
            </div>
          </div>

          {/* Product Categories Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#35313B] mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#77717D]">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('category-view', { category: cat })}
                    className="hover:text-[#35313B] transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="hover:text-[#35313B] font-medium text-[#35313B] cursor-pointer"
                >
                  View All 14 Categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#35313B] mb-3">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#77717D]">
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-[#35313B] transition-colors cursor-pointer">
                  Track Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-[#35313B] transition-colors cursor-pointer">
                  Shipping & Customs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-[#35313B] transition-colors cursor-pointer">
                  14-Day Global Returns
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-[#35313B] transition-colors cursor-pointer">
                  Certificate of Authenticity
                </button>
              </li>
            </ul>
          </div>

          {/* Artisan & Admin */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#35313B] mb-3">
              Portals
            </h4>
            <ul className="space-y-2 text-xs text-[#77717D]">
              <li>
                <button onClick={() => navigateTo('seller-dashboard')} className="hover:text-[#35313B] transition-colors cursor-pointer">
                  Artisan Seller Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin-dashboard')} className="hover:text-[#35313B] transition-colors cursor-pointer">
                  Marketplace Administration
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-[#35313B] transition-colors cursor-pointer">
                  Artisan Commission Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-[#35313B] transition-colors cursor-pointer">
                  International Policies
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#EAE2F5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#77717D] gap-4">
          <p>© {new Date().getFullYear()} ARTORA. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Global Express Art Transit</span>
            <span>·</span>
            <span>Zero Counterfeit Guarantee</span>
            <span>·</span>
            <span>Secure Tokenized Payments</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

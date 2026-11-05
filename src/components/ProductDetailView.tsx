import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingBag,
  Zap,
  MessageSquare,
  Sparkles,
  Award,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from './ProductCard';
import { SelectedVariation } from '../types';
import { ArtImage } from './ArtImage';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    goBack,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    products,
    submitReview,
    submitInquiry,
    user,
  } = useMarketplace();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[#77717D]">No artwork selected.</p>
        <button
          onClick={() => navigateTo('explore')}
          className="mt-4 px-4 py-2 bg-[#35313B] text-white text-xs rounded-xl"
        >
          Explore All Artworks
        </button>
      </div>
    );
  }

  // Active Gallery Image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Variation States
  const [selectedFrame, setSelectedFrame] = useState(
    selectedProduct.variations.framing ? selectedProduct.variations.framing[0] : undefined
  );
  const [selectedDimension, setSelectedDimension] = useState(
    selectedProduct.variations.dimensions ? selectedProduct.variations.dimensions[0] : undefined
  );
  const [selectedMaterial, setSelectedMaterial] = useState(
    selectedProduct.variations.materials ? selectedProduct.variations.materials[0] : undefined
  );
  const [selectedAlbumSize, setSelectedAlbumSize] = useState(
    selectedProduct.variations.albumSizes ? selectedProduct.variations.albumSizes[0] : undefined
  );
  const [selectedAlbumPage, setSelectedAlbumPage] = useState<number | undefined>(
    selectedProduct.variations.albumPages ? selectedProduct.variations.albumPages[0] : undefined
  );
  const [selectedAlbumCover, setSelectedAlbumCover] = useState(
    selectedProduct.variations.albumCovers ? selectedProduct.variations.albumCovers[0] : undefined
  );
  const [customText, setCustomText] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Tab state (Overview vs Shipping vs Reviews vs Inquiry)
  const [activeDetailTab, setActiveDetailTab] = useState<'details' | 'shipping' | 'reviews' | 'inquiry'>('details');

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Inquiry submission state
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isInquirySent, setIsInquirySent] = useState(false);

  const isSaved = isInWishlist(selectedProduct.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.categoryId === selectedProduct.categoryId && p.id !== selectedProduct.id)
    .slice(0, 4);

  const currentVariation: SelectedVariation = {
    framing: selectedFrame,
    dimensions: selectedDimension,
    material: selectedMaterial,
    albumSize: selectedAlbumSize,
    albumPages: selectedAlbumPage,
    albumCover: selectedAlbumCover,
    customNote: customText.trim() ? customText.trim() : undefined,
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, currentVariation);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, currentVariation);
    navigateTo('cart');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) return;

    submitReview(selectedProduct.id, {
      author: user.name,
      country: user.addresses[0]?.country || 'International Collector',
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      verifiedPurchase: true,
      productVariant: selectedFrame || selectedAlbumCover || 'Original Artwork',
    });

    setReviewTitle('');
    setReviewComment('');
    setIsSubmittingReview(false);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) return;

    submitInquiry({
      productId: selectedProduct.id,
      productTitle: selectedProduct.title,
      customerName: user.name,
      customerEmail: user.email,
      message: inquiryMessage,
    });

    setInquiryMessage('');
    setIsInquirySent(true);
    setTimeout(() => setIsInquirySent(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-16 space-y-12">
      {/* Back & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#77717D] hover:text-[#35313B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="text-xs text-[#77717D] flex items-center gap-2">
          <span>Artisan Original</span>
          <span>·</span>
          <span className="font-medium text-[#35313B]">{selectedProduct.categoryName}</span>
        </div>
      </div>

      {/* Main PDP Grid (Contiguous Purchase Module §2.A) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden bg-white border border-[#D8C8F0]/50 shadow-xs">
            <ArtImage
              src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
              alt={selectedProduct.title}
              fallbackTitle={selectedProduct.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-white/90 text-[#35313B] rounded-lg shadow-xs backdrop-blur-xs">
                {selectedProduct.categoryName}
              </span>
              {selectedProduct.isBestseller && (
                <span className="text-xs font-semibold px-2.5 py-1 bg-[#F8DDE8]/95 text-[#35313B] rounded-lg shadow-xs">
                  Bestseller
                </span>
              )}
            </div>
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                isSaved
                  ? 'bg-[#F8DDE8] text-rose-600 scale-105'
                  : 'bg-white/85 text-[#77717D] hover:text-[#35313B] hover:bg-white'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Multi-Angle Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {selectedProduct.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-4/3 w-20 sm:w-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  activeImageIndex === idx
                    ? 'border-[#35313B] shadow-xs'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <ArtImage
                  src={imgUrl}
                  alt={`View angle ${idx + 1}`}
                  fallbackTitle={`${selectedProduct.title} angle ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Provenance & Authenticity Banner */}
          <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D8C8F0]/60 flex items-center gap-3 text-xs text-[#77717D]">
            <Award className="w-5 h-5 text-[#35313B] shrink-0" />
            <div>
              <span className="font-semibold text-[#35313B]">Certificate of Provenance & Authenticity: </span>
              Every piece comes hand-signed with an embossed archival seal and registered provenance ID.
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#77717D] mb-1">
              <span className="uppercase tracking-wider font-semibold text-[#77717D]">
                {selectedProduct.categoryName}
              </span>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-bold text-[#35313B]">{selectedProduct.rating.toFixed(1)}</span>
                <span className="text-[#77717D]">({selectedProduct.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#35313B] leading-tight">
              {selectedProduct.title}
            </h1>

            {/* Artisan Pill Link */}
            <div className="mt-2.5 flex items-center gap-3">
              <ArtImage
                src={selectedProduct.artisan.avatar}
                alt={selectedProduct.artisan.name}
                fallbackTitle={selectedProduct.artisan.name}
                className="w-8 h-8 rounded-full object-cover border border-[#D8C8F0]"
              />
              <div className="text-xs">
                <span className="text-[#77717D]">Crafted by </span>
                <button
                  onClick={() => navigateTo('artist-profile', { artist: selectedProduct.artisan })}
                  className="font-semibold text-[#35313B] hover:underline cursor-pointer"
                >
                  {selectedProduct.artisan.name}
                </button>
                <span className="text-[#77717D]"> · {selectedProduct.artisan.location}</span>
              </div>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="p-4 rounded-2xl bg-[#EAE2F5]/40 border border-[#D8C8F0]/60 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#35313B] font-mono tabular-nums">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.compareAtPrice && (
                  <span className="text-sm text-[#77717D] line-through font-mono tabular-nums">
                    {formatPrice(selectedProduct.compareAtPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#77717D] mt-0.5">
                Includes international taxes and customs clearance
              </p>
            </div>

            {/* Stock pill */}
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Check className="w-3 h-3 stroke-[3]" />
                In Stock ({selectedProduct.stock} available)
              </span>
            </div>
          </div>

          {/* Description Excerpt */}
          <p className="text-xs sm:text-sm text-[#77717D] leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Dynamic Variations Selector */}
          <div className="space-y-4 pt-2 border-t border-[#EAE2F5]">
            {/* 1. Framing Options (if available) */}
            {selectedProduct.variations.framing && (
              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-2">
                  Select Frame & Mounting: <span className="font-normal text-[#77717D]">{selectedFrame}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProduct.variations.framing.map((frame) => (
                    <button
                      key={frame}
                      onClick={() => setSelectedFrame(frame)}
                      className={`text-left p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedFrame === frame
                          ? 'border-[#35313B] bg-[#FFFDF7] text-[#35313B] font-semibold shadow-xs'
                          : 'border-[#D8C8F0]/60 bg-white text-[#77717D] hover:border-[#D8C8F0]'
                      }`}
                    >
                      {frame}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Dimensions Options (if available) */}
            {selectedProduct.variations.dimensions && (
              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-2">
                  Dimensions: <span className="font-normal text-[#77717D]">{selectedDimension}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variations.dimensions.map((dim) => (
                    <button
                      key={dim}
                      onClick={() => setSelectedDimension(dim)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedDimension === dim
                          ? 'border-[#35313B] bg-[#35313B] text-white'
                          : 'border-[#D8C8F0] bg-white text-[#35313B] hover:bg-[#EAE2F5]'
                      }`}
                    >
                      {dim}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Album Cover Materials (if album) */}
            {selectedProduct.variations.albumCovers && (
              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-2">
                  Bookcloth & Leather Cover: <span className="font-normal text-[#77717D]">{selectedAlbumCover}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProduct.variations.albumCovers.map((cover) => (
                    <button
                      key={cover}
                      onClick={() => setSelectedAlbumCover(cover)}
                      className={`text-left p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedAlbumCover === cover
                          ? 'border-[#35313B] bg-[#FFFDF7] text-[#35313B] font-semibold shadow-xs'
                          : 'border-[#D8C8F0]/60 bg-white text-[#77717D] hover:border-[#D8C8F0]'
                      }`}
                    >
                      {cover}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Album Sizes & Page count (if album) */}
            {selectedProduct.variations.albumPages && (
              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-2">
                  Page Count: <span className="font-normal text-[#77717D]">{selectedAlbumPage} Heavy Archival Pages</span>
                </label>
                <div className="flex gap-2">
                  {selectedProduct.variations.albumPages.map((pages) => (
                    <button
                      key={pages}
                      onClick={() => setSelectedAlbumPage(pages)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-medium border cursor-pointer ${
                        selectedAlbumPage === pages
                          ? 'border-[#35313B] bg-[#35313B] text-white'
                          : 'border-[#D8C8F0] bg-white text-[#35313B]'
                      }`}
                    >
                      {pages} Pages
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Custom Inscription / Debossing (if customizable) */}
            {selectedProduct.isCustomizable && (
              <div className="p-4 rounded-2xl bg-[#FCEEF3]/70 border border-[#F8DDE8]">
                <label className="text-xs font-semibold text-[#35313B] flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#35313B]" />
                  <span>Custom Inscription & Personalization</span>
                </label>
                <p className="text-[11px] text-[#77717D] mb-2">
                  {selectedProduct.customizationPrompt || 'Enter your custom text or names for hand-lettered gold foil debossing:'}
                </p>
                <input
                  type="text"
                  placeholder="e.g. Eleanor & Marcus · Est. 2026"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  maxLength={60}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C8F0] text-xs text-[#35313B] focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-semibold text-[#35313B]">Quantity:</span>
              <div className="flex items-center border border-[#D8C8F0] rounded-xl bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm text-[#77717D] hover:text-[#35313B] hover:bg-[#EAE2F5] transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-[#35313B] font-mono min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  className="px-3 py-1.5 text-sm text-[#77717D] hover:text-[#35313B] hover:bg-[#EAE2F5] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="px-5 py-3.5 rounded-xl bg-[#EAE2F5] hover:bg-[#D8C8F0] text-[#35313B] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="px-5 py-3.5 rounded-xl bg-[#35313B] hover:bg-[#35313B]/90 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Shipping & Delivery Guarantee Strip */}
          <div className="pt-4 border-t border-[#EAE2F5] space-y-2.5 text-xs text-[#77717D]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#35313B] shrink-0" />
              <span>{selectedProduct.shippingDays}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#35313B] shrink-0" />
              <span>Insured transit with climate-controlled art packaging</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#35313B] shrink-0" />
              <span>14-day international collector satisfaction guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Secondary Tabs: Details, Shipping, Reviews, Inquiries */}
      <div className="pt-8 border-t border-[#D8C8F0]/40">
        <div className="flex items-center gap-3 border-b border-[#EAE2F5] overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveDetailTab('details')}
            className={`pb-3 px-2 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
              activeDetailTab === 'details'
                ? 'border-[#35313B] text-[#35313B]'
                : 'border-transparent text-[#77717D] hover:text-[#35313B]'
            }`}
          >
            Artwork & Materials
          </button>
          <button
            onClick={() => setActiveDetailTab('shipping')}
            className={`pb-3 px-2 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
              activeDetailTab === 'shipping'
                ? 'border-[#35313B] text-[#35313B]'
                : 'border-transparent text-[#77717D] hover:text-[#35313B]'
            }`}
          >
            Shipping & Customs
          </button>
          <button
            onClick={() => setActiveDetailTab('reviews')}
            className={`pb-3 px-2 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
              activeDetailTab === 'reviews'
                ? 'border-[#35313B] text-[#35313B]'
                : 'border-transparent text-[#77717D] hover:text-[#35313B]'
            }`}
          >
            Verified Reviews ({selectedProduct.reviews.length})
          </button>
          <button
            onClick={() => setActiveDetailTab('inquiry')}
            className={`pb-3 px-2 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
              activeDetailTab === 'inquiry'
                ? 'border-[#35313B] text-[#35313B]'
                : 'border-transparent text-[#77717D] hover:text-[#35313B]'
            }`}
          >
            Ask Artisan a Question
          </button>
        </div>

        {/* Tab Content 1: Details & Materials */}
        {activeDetailTab === 'details' && (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#35313B]">
            <div className="space-y-3">
              <h3 className="font-serif-title text-base font-bold text-[#35313B]">
                Materials & Specifications
              </h3>
              <p className="text-[#77717D] leading-relaxed">
                {selectedProduct.materialsText}
              </p>
              <div className="pt-2">
                <span className="font-semibold text-[#35313B]">Dimensions: </span>
                <span className="text-[#77717D]">{selectedProduct.dimensionsText}</span>
              </div>
              <div>
                <span className="font-semibold text-[#35313B]">Packaged Weight: </span>
                <span className="text-[#77717D]">{selectedProduct.weightKg} kg</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif-title text-base font-bold text-[#35313B]">
                Artisan Studio Note
              </h3>
              <p className="text-[#77717D] leading-relaxed">
                {selectedProduct.artisan.bio}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('artist-profile', { artist: selectedProduct.artisan })}
                  className="font-semibold text-[#35313B] underline hover:text-[#77717D] cursor-pointer"
                >
                  Visit {selectedProduct.artisan.storeName} Storefront →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: International Shipping */}
        {activeDetailTab === 'shipping' && (
          <div className="pt-6 max-w-2xl space-y-4 text-xs text-[#77717D] leading-relaxed">
            <h3 className="font-serif-title text-base font-bold text-[#35313B]">
              Global Delivery & Customs Policy
            </h3>
            <p>
              ARTORA partners with specialized fine art couriers (DHL Express, FedEx Art Division, and white-glove art logistics) to ensure each parcel is climate-isolated and shock-buffered.
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Tracked International Transit:</strong> Dispatched with physical GPS tracking and direct courier signature on delivery.</li>
              <li><strong>Customs & Import Duties:</strong> All standard customs formalities are pre-cleared for UK, EU, UAE, Saudi Arabia, USA, and Canada.</li>
              <li><strong>Insured Transit:</strong> Every piece is fully covered up to full commercial valuation against damage during transit.</li>
            </ul>
          </div>
        )}

        {/* Tab Content 3: Customer Reviews */}
        {activeDetailTab === 'reviews' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE2F5]">
              <div>
                <h3 className="font-serif-title text-base font-bold text-[#35313B]">
                  Customer Reviews ({selectedProduct.reviews.length})
                </h3>
                <p className="text-xs text-[#77717D]">
                  Average rating: {selectedProduct.rating.toFixed(1)} / 5.0 from verified collectors
                </p>
              </div>

              {!isSubmittingReview && (
                <button
                  onClick={() => setIsSubmittingReview(true)}
                  className="px-4 py-2 rounded-xl bg-[#35313B] text-white text-xs font-semibold hover:bg-[#35313B]/90 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Write a Verified Review
                </button>
              )}
            </div>

            {/* Write a review form */}
            {isSubmittingReview && (
              <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-white border border-[#D8C8F0] space-y-4 max-w-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#35313B]">Your Collector Review</span>
                  <button
                    type="button"
                    onClick={() => setIsSubmittingReview(false)}
                    className="text-xs text-[#77717D] hover:text-[#35313B]"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#35313B] block mb-1">
                    Rating (1 to 5 Stars):
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewRating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#35313B] block mb-1">Review Headline:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Incredible craftsmanship and gold leaf"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#35313B] block mb-1">Detailed Feedback:</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share your experience with the artwork's texture, framing, and delivery..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#35313B] text-white text-xs font-semibold cursor-pointer hover:bg-[#35313B]/90"
                >
                  Publish Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            {selectedProduct.reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProduct.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white border border-[#D8C8F0]/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#77717D]">{rev.date}</span>
                    </div>

                    <h4 className="text-xs font-bold text-[#35313B]">{rev.title}</h4>
                    <p className="text-xs text-[#77717D] leading-relaxed">{rev.comment}</p>

                    <div className="pt-2 border-t border-[#EAE2F5] flex items-center justify-between text-[11px] text-[#77717D]">
                      <span className="font-medium text-[#35313B]">{rev.author} ({rev.country})</span>
                      {rev.verifiedPurchase && (
                        <span className="flex items-center gap-1 text-emerald-700">
                          <Check className="w-3 h-3" />
                          Verified Collector
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#77717D]">
                Be the first to leave a review for this original creation!
              </p>
            )}
          </div>
        )}

        {/* Tab Content 4: Inquire / Custom Commission */}
        {activeDetailTab === 'inquiry' && (
          <div className="pt-6 max-w-xl space-y-4">
            <div>
              <h3 className="font-serif-title text-base font-bold text-[#35313B]">
                Direct Message to {selectedProduct.artisan.name}
              </h3>
              <p className="text-xs text-[#77717D] mt-0.5">
                Have a question about sizing, custom framing, or a commissioned variation? Our artisan responds within {selectedProduct.artisan.responseRate}.
              </p>
            </div>

            {isInquirySent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Your message has been received by {selectedProduct.artisan.name}. You will receive a response at {user.email}.</span>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <textarea
                  rows={4}
                  required
                  placeholder={`Write your inquiry for ${selectedProduct.title}...`}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full p-3 text-xs bg-white border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#35313B] text-white text-xs font-semibold hover:bg-[#35313B]/90 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Inquiry to Artisan</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Related Artworks Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#D8C8F0]/40">
          <h2 className="font-serif-title text-xl font-bold text-[#35313B] mb-4">
            More from {selectedProduct.categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Purchase Bar (Thumb Ergonomics Pattern 3 §C) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-[#D8C8F0] flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-[10px] text-[#77717D] uppercase font-semibold block">Total Price</span>
          <span className="text-lg font-bold text-[#35313B] font-mono tabular-nums">
            {formatPrice(selectedProduct.price * quantity)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2.5 rounded-xl bg-[#EAE2F5] text-[#35313B] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="px-5 py-2.5 rounded-xl bg-[#35313B] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

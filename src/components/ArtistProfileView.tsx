import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  Sparkles,
  MessageSquare,
  Package,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from './ProductCard';
import { ARTISANS } from '../data/mockData';
import { ArtImage } from './ArtImage';

export const ArtistProfileView: React.FC = () => {
  const { selectedArtist, goBack, products, submitInquiry, user } = useMarketplace();

  const artisan = selectedArtist || ARTISANS[0];
  const artisanProducts = products.filter(
    (p) => p.artisan.id === artisan.id || p.artisan.name === artisan.name
  );

  const [inquiryText, setInquiryText] = useState('');
  const [isInquirySent, setIsInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;

    submitInquiry({
      productId: artisanProducts[0]?.id || 'custom-commission',
      productTitle: `Bespoke Commission with ${artisan.name}`,
      customerName: user.name,
      customerEmail: user.email,
      message: inquiryText,
    });

    setInquiryText('');
    setIsInquirySent(true);
    setTimeout(() => setIsInquirySent(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-16 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#77717D] hover:text-[#35313B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
      </div>

      {/* Atelier Storefront Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#EAE2F5] via-[#FFFDF7] to-[#FCEEF3] border border-[#D8C8F0] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <ArtImage
            src={artisan.avatar}
            alt={artisan.name}
            fallbackTitle={artisan.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#35313B]">
                {artisan.storeName}
              </h1>
              {artisan.verified && (
                <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#77717D] mt-0.5">
              Master Artisan: {artisan.name} · <MapPin className="w-3.5 h-3.5 inline text-[#77717D]" /> {artisan.location}
            </p>
            <p className="text-xs text-[#77717D] mt-2 max-w-xl leading-relaxed">
              {artisan.bio}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#77717D]">
              <span className="flex items-center gap-1 font-semibold text-[#35313B]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                {artisan.rating} Rating ({artisan.salesCount} global commissions)
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Replies within {artisan.responseRate}
              </span>
              <span>·</span>
              <span>Member since {artisan.joinedYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Artisan Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-title text-xl font-bold text-[#35313B]">
              Artworks by {artisan.name} ({artisanProducts.length})
            </h2>
            <p className="text-xs text-[#77717D]">
              Specialty: {artisan.specialty}
            </p>
          </div>
        </div>

        {artisanProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {artisanProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-white border border-[#D8C8F0] text-xs text-[#77717D]">
            All current collection originals are in private collections. Inquire below for custom commissions.
          </div>
        )}
      </div>

      {/* Custom Commission Inquiry Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs max-w-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#35313B]" />
          <div>
            <h3 className="font-serif-title text-base sm:text-lg font-bold text-[#35313B]">
              Commission a Custom Piece with {artisan.name}
            </h3>
            <p className="text-xs text-[#77717D]">
              Request bespoke dimensions, framing, custom calligraphy dedications, or family heirlooms
            </p>
          </div>
        </div>

        {isInquirySent ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Your commission inquiry was received! {artisan.name} will review your request.</span>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2 text-xs">
            <textarea
              rows={4}
              required
              placeholder={`Describe your vision for a custom piece (e.g. "Looking for an 80x100cm oil abstract with warm lavender notes" or "Custom Thuluth Quranic verse on tea parchment")...`}
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
              className="w-full p-3.5 bg-[#FFFDF7] border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#35313B] text-white font-semibold flex items-center gap-2 hover:bg-[#35313B]/90 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submit Custom Commission Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

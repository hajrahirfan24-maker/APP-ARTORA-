import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';
import { ArtImage } from './ArtImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, toggleWishlist, isInWishlist, formatPrice } = useMarketplace();

  const isSaved = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-white border border-[#D8C8F0]/40 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Visual Image Slot */}
      <div
        onClick={() => navigateTo('product-detail', { product })}
        className="relative aspect-4/3 w-full bg-[#FFFDF7] overflow-hidden cursor-pointer"
      >
        <ArtImage
          src={product.images[0]}
          alt={product.title}
          fallbackTitle={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
        />

        {/* Top subtle tags */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none">
          {product.isBestseller && (
            <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 bg-[#FFFDF7]/90 text-[#35313B] rounded-md shadow-xs backdrop-blur-xs">
              Bestseller
            </span>
          )}
          {product.isNew && !product.isBestseller && (
            <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 bg-[#FFFDF7]/90 text-[#35313B] rounded-md shadow-xs backdrop-blur-xs">
              New Arrival
            </span>
          )}
          {product.isCustomizable && (
            <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 bg-[#F8DDE8]/90 text-[#35313B] rounded-md shadow-xs backdrop-blur-xs">
              Customizable
            </span>
          )}
        </div>

        {/* Wishlist toggle button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
            isSaved
              ? 'bg-[#F8DDE8] text-rose-600 scale-105'
              : 'bg-white/85 text-[#77717D] hover:text-[#35313B] hover:bg-white'
          }`}
          title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#77717D] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-[#77717D]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="font-semibold text-[#35313B]">{product.rating.toFixed(1)}</span>
              <span className="text-[#77717D]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => navigateTo('product-detail', { product })}
            className="text-sm font-semibold text-[#35313B] line-clamp-1 hover:text-[#77717D] transition-colors cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Artisan Name */}
          <p className="text-xs text-[#77717D] mt-0.5">
            by{' '}
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigateTo('artist-profile', { artist: product.artisan });
              }}
              className="text-[#35313B] hover:underline cursor-pointer font-medium"
            >
              {product.artisan.name}
            </span>
          </p>
        </div>

        {/* Pricing and Action row */}
        <div className="mt-3 pt-2.5 border-t border-[#EAE2F5] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#35313B] font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#77717D] line-through font-mono tabular-nums">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => navigateTo('product-detail', { product })}
            className="text-xs font-medium text-[#35313B] bg-[#EAE2F5] hover:bg-[#D8C8F0] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

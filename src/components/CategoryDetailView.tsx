import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/mockData';
import { ArtImage } from './ArtImage';

export const CategoryDetailView: React.FC = () => {
  const { selectedCategory, products, navigateTo, goBack } = useMarketplace();

  const category = selectedCategory || CATEGORIES[0];
  const categoryProducts = products.filter((p) => p.categoryId === category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-16 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#77717D] hover:text-[#35313B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#EAE2F5] via-[#FFFDF7] to-[#FCEEF3] border border-[#D8C8F0] p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#77717D] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#35313B]" />
              <span>Category Showcase</span>
            </div>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#35313B]">
              {category.name}
            </h1>
            <p className="text-sm font-medium text-[#35313B]/80 mt-1 italic">
              {category.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#77717D] mt-3 max-w-xl leading-relaxed">
              {category.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-[#77717D]">
              <span>{categoryProducts.length} certified pieces</span>
              <span>·</span>
              <span>Master Artisans</span>
              <span>·</span>
              <span>Global White-Glove Transit</span>
            </div>
          </div>

          <div className="md:col-span-4 aspect-4/3 rounded-2xl overflow-hidden border border-white shadow-xs">
            <ArtImage
              src={category.featuredImage}
              alt={category.name}
              fallbackTitle={category.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Category Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif-title text-xl font-bold text-[#35313B]">
            All {category.name} Products
          </h2>
          <span className="text-xs text-[#77717D] font-mono">
            Showing {categoryProducts.length} items
          </span>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#D8C8F0]">
            <p className="text-xs text-[#77717D]">
              New artworks are being crafted in this atelier category. Check back shortly!
            </p>
            <button
              onClick={() => navigateTo('explore')}
              className="mt-3 px-4 py-2 rounded-xl bg-[#35313B] text-white text-xs font-medium cursor-pointer"
            >
              Browse All Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

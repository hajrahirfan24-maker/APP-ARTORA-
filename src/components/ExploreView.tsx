import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/mockData';
import { CategoryId } from '../types';

export const ExploreView: React.FC = () => {
  const { products, searchQuery, setSearchQuery } = useMarketplace();

  const [selectedCatId, setSelectedCatId] = useState<CategoryId | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyCustomizable, setOnlyCustomizable] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCatId !== 'all' && p.categoryId !== selectedCatId) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        const matchesArtisan = p.artisan.name.toLowerCase().includes(q);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCat && !matchesArtisan && !matchesTags) return false;
      }

      // Price range
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

      // Stock filter
      if (onlyInStock && p.stock <= 0) return false;

      // Customizable filter
      if (onlyCustomizable && !p.isCustomizable) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCatId, searchQuery, priceRange, onlyInStock, onlyCustomizable, sortBy]);

  const resetFilters = () => {
    setSelectedCatId('all');
    setSearchQuery('');
    setPriceRange([0, 1500]);
    setOnlyInStock(false);
    setOnlyCustomizable(false);
    setSortBy('featured');
  };

  const activeFilterCount =
    (selectedCatId !== 'all' ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlyCustomizable ? 1 : 0) +
    (priceRange[1] < 1500 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-16 space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#D8C8F0]/40">
        <div>
          <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#35313B]">
            Explore Artworks & Creations
          </h1>
          <p className="text-xs text-[#77717D] mt-1">
            Discover {filteredProducts.length} certified original pieces across 14 artistic categories
          </p>
        </div>

        {/* Search input in explore page */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <input
              type="text"
              placeholder="Filter by keyword, artisan, script..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
            />
            <Search className="w-4 h-4 text-[#77717D] absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#77717D] hover:text-[#35313B]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter toggle button */}
          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#D8C8F0] bg-white text-xs font-medium text-[#35313B] hover:bg-[#EAE2F5] transition-colors cursor-pointer shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#D8C8F0] text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-[#D8C8F0] bg-white text-xs font-medium text-[#35313B] focus:outline-none focus:ring-2 focus:ring-[#D8C8F0] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* 14 Categories Horizontal Filter Bar */}
      <div className="overflow-x-auto pb-2 scrollbar-none flex items-center gap-2">
        <button
          onClick={() => setSelectedCatId('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
            selectedCatId === 'all'
              ? 'bg-[#35313B] text-white'
              : 'bg-white border border-[#D8C8F0] text-[#77717D] hover:text-[#35313B]'
          }`}
        >
          All Categories ({products.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = products.filter((p) => p.categoryId === cat.id).length;
          const isActive = selectedCatId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#35313B] text-white'
                  : 'bg-white border border-[#D8C8F0] text-[#77717D] hover:text-[#35313B]'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Collapsible Filter Panel */}
      {isFilterDrawerOpen && (
        <div className="p-5 rounded-2xl bg-white border border-[#D8C8F0] shadow-sm animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE2F5] mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#35313B]">
              Refine Artworks
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-[#77717D] hover:text-[#35313B] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Price Filter */}
            <div>
              <label className="text-xs font-medium text-[#35313B] block mb-2">
                Maximum Price: ${priceRange[1]}
              </label>
              <input
                type="range"
                min="50"
                max="1500"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-[#35313B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#77717D] mt-1 font-mono">
                <span>$50</span>
                <span>$750</span>
                <span>$1500+</span>
              </div>
            </div>

            {/* In Stock toggle */}
            <div className="flex flex-col justify-center">
              <label
                onClick={() => setOnlyInStock(!onlyInStock)}
                className="flex items-center gap-2.5 text-xs font-medium text-[#35313B] cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                    onlyInStock
                      ? 'bg-[#35313B] border-[#35313B] text-white'
                      : 'border-[#D8C8F0] bg-white'
                  }`}
                >
                  {onlyInStock && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>In Stock & Ready to Dispatch</span>
              </label>
            </div>

            {/* Customizable toggle */}
            <div className="flex flex-col justify-center">
              <label
                onClick={() => setOnlyCustomizable(!onlyCustomizable)}
                className="flex items-center gap-2.5 text-xs font-medium text-[#35313B] cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                    onlyCustomizable
                      ? 'bg-[#35313B] border-[#35313B] text-white'
                      : 'border-[#D8C8F0] bg-white'
                  }`}
                >
                  {onlyCustomizable && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Customizable / Personalized Art</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Product Results Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-white border border-[#D8C8F0] max-w-lg mx-auto my-12">
          <div className="w-12 h-12 rounded-full bg-[#EAE2F5] flex items-center justify-center mx-auto mb-3">
            <Search className="w-5 h-5 text-[#77717D]" />
          </div>
          <h3 className="font-serif-title text-lg font-bold text-[#35313B]">
            No matching artworks found
          </h3>
          <p className="text-xs text-[#77717D] mt-1 max-w-sm mx-auto">
            Try adjusting your search query, price range, or category filter to discover more creations.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-[#35313B] text-white text-xs font-medium hover:bg-[#35313B]/90 transition-colors cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

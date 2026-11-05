import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Compass,
  Home,
  Globe,
  Palette,
  ShieldCheck,
  Store,
  ChevronDown,
  X,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CURRENCIES, CATEGORIES } from '../data/mockData';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    navigateTo,
    cart,
    wishlist,
    user,
    switchRole,
    selectedCurrency,
    setCurrency,
    searchQuery,
    setSearchQuery,
  } = useMarketplace();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('explore');
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Banner (Slim, dismissible trust note) */}
      <div className="bg-[#EAE2F5] text-[#35313B] text-xs py-2 px-4 border-b border-[#D8C8F0]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-semibold text-[#35313B]">Global Art Transit</span>
            <span className="text-[#77717D]">·</span>
            <span className="text-[#77717D] hidden sm:inline">Insured climate-controlled delivery for original masterpieces</span>
            <span className="text-[#77717D] sm:hidden">Insured international art transit</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-1 text-[#35313B] hover:text-[#77717D] py-1 px-1.5 transition-colors cursor-pointer"
                title="Select Currency"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{selectedCurrency.code} ({selectedCurrency.symbol})</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isCurrencyOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-[#FFFDF7] border border-[#D8C8F0] rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[10px] font-semibold tracking-wider text-[#77717D] uppercase">
                    Select Currency
                  </div>
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#EAE2F5] transition-colors cursor-pointer ${
                        selectedCurrency.code === c.code ? 'font-semibold text-[#35313B] bg-[#FCEEF3]' : 'text-[#77717D]'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="font-mono">{c.code} {c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Persona Switcher shortcut */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-1.5 text-xs py-1 px-2 rounded-lg bg-[#D8C8F0]/40 text-[#35313B] font-medium hover:bg-[#D8C8F0]/70 transition-colors cursor-pointer"
              >
                {user.role === 'customer' && <User className="w-3.5 h-3.5" />}
                {user.role === 'seller' && <Store className="w-3.5 h-3.5" />}
                {user.role === 'admin' && <ShieldCheck className="w-3.5 h-3.5" />}
                <span className="capitalize">{user.role}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-[#FFFDF7] border border-[#D8C8F0] rounded-xl shadow-xl z-50 py-1.5">
                  <div className="px-3 py-1 text-[10px] font-semibold tracking-wider text-[#77717D] uppercase">
                    Switch Persona View
                  </div>
                  <button
                    onClick={() => {
                      switchRole('customer');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-[#EAE2F5] transition-colors cursor-pointer ${
                      user.role === 'customer' ? 'bg-[#FCEEF3] font-semibold text-[#35313B]' : 'text-[#77717D]'
                    }`}
                  >
                    <User className="w-4 h-4 text-[#77717D]" />
                    <div>
                      <div className="text-[#35313B]">Customer Experience</div>
                      <div className="text-[10px] text-[#77717D]">Browse & Buy Artwork</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      switchRole('seller');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-[#EAE2F5] transition-colors cursor-pointer ${
                      user.role === 'seller' ? 'bg-[#FCEEF3] font-semibold text-[#35313B]' : 'text-[#77717D]'
                    }`}
                  >
                    <Store className="w-4 h-4 text-[#77717D]" />
                    <div>
                      <div className="text-[#35313B]">Artisan Seller Portal</div>
                      <div className="text-[10px] text-[#77717D]">Manage Store & Orders</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      switchRole('admin');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-[#EAE2F5] transition-colors cursor-pointer ${
                      user.role === 'admin' ? 'bg-[#FCEEF3] font-semibold text-[#35313B]' : 'text-[#77717D]'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#77717D]" />
                    <div>
                      <div className="text-[#35313B]">Marketplace Admin</div>
                      <div className="text-[10px] text-[#77717D]">Catalog & Moderation</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Complies with 3-zone contract) */}
      <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#D8C8F0]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('home')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D8C8F0] to-[#F8DDE8] flex items-center justify-center shadow-xs">
                  <Palette className="w-4 h-4 text-[#35313B]" />
                </div>
                <span className="font-serif-title text-2xl font-bold tracking-tight text-[#35313B] whitespace-nowrap">
                  ARTORA
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Single-line, concise) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#77717D]">
            <button
              onClick={() => navigateTo('explore')}
              className={`hover:text-[#35313B] transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'explore' ? 'text-[#35313B] font-semibold' : ''
              }`}
            >
              All Artworks
            </button>
            <button
              onClick={() => {
                const cat = CATEGORIES.find((c) => c.id === 'paintings');
                navigateTo('category-view', { category: cat });
              }}
              className="hover:text-[#35313B] transition-colors whitespace-nowrap cursor-pointer"
            >
              Paintings
            </button>
            <button
              onClick={() => {
                const cat = CATEGORIES.find((c) => c.id === 'islamic-calligraphy');
                navigateTo('category-view', { category: cat });
              }}
              className="hover:text-[#35313B] transition-colors whitespace-nowrap cursor-pointer"
            >
              Islamic Calligraphy
            </button>
            <button
              onClick={() => {
                const cat = CATEGORIES.find((c) => c.id === 'art-albums');
                navigateTo('category-view', { category: cat });
              }}
              className="hover:text-[#35313B] transition-colors whitespace-nowrap cursor-pointer"
            >
              Art & Photo Albums
            </button>
            <button
              onClick={() => {
                const cat = CATEGORIES.find((c) => c.id === 'personalized-gifts');
                navigateTo('category-view', { category: cat });
              }}
              className="hover:text-[#35313B] transition-colors whitespace-nowrap cursor-pointer"
            >
              Personalized Gifts
            </button>
          </nav>

          {/* Zone 3: Primary Action Controls (Search, Wishlist, Cart, Profile) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Trigger */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search calligraphy, paintings, albums..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-52 sm:w-72 pl-9 pr-8 py-2 text-xs bg-white border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                    />
                    <Search className="w-3.5 h-3.5 text-[#77717D] absolute left-3 top-2.5" />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-2.5 top-2.5 text-[#77717D] hover:text-[#35313B]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#77717D] hover:text-[#35313B] hover:bg-[#EAE2F5]/60 transition-colors cursor-pointer"
                  title="Search marketplace"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#77717D] hover:text-[#35313B] hover:bg-[#EAE2F5]/60 transition-colors cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#35313B]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#F8DDE8] text-[#35313B] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#FFFDF7]">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#77717D] hover:text-[#35313B] hover:bg-[#EAE2F5]/60 transition-colors cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className={`w-5 h-5 ${totalCartCount > 0 ? 'text-[#35313B]' : ''}`} />
              {totalCartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#D8C8F0] text-[#35313B] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#FFFDF7]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Account Profile */}
            <button
              onClick={() => navigateTo('profile')}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[#77717D] hover:text-[#35313B] hover:bg-[#EAE2F5]/60 transition-colors cursor-pointer ml-1"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Thumb ergonomics) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-t border-[#D8C8F0]/40 h-16 px-2">
        <div className="grid grid-cols-5 h-full items-center">
          <button
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeTab === 'home' ? 'text-[#35313B]' : 'text-[#77717D]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Home</span>
          </button>

          <button
            onClick={() => navigateTo('explore')}
            className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeTab === 'explore' || activeTab === 'category-view' ? 'text-[#35313B]' : 'text-[#77717D]'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Explore</span>
          </button>

          <button
            onClick={() => navigateTo('wishlist')}
            className={`relative flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeTab === 'wishlist' ? 'text-[#35313B]' : 'text-[#77717D]'
            }`}
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-5 w-3.5 h-3.5 bg-[#F8DDE8] text-[#35313B] text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
            <span className="text-[10px] font-medium mt-1">Wishlist</span>
          </button>

          <button
            onClick={() => navigateTo('cart')}
            className={`relative flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeTab === 'cart' || activeTab === 'checkout' ? 'text-[#35313B]' : 'text-[#77717D]'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-5 w-3.5 h-3.5 bg-[#D8C8F0] text-[#35313B] text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
            <span className="text-[10px] font-medium mt-1">Cart</span>
          </button>

          <button
            onClick={() => navigateTo('profile')}
            className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
              activeTab === 'profile' || activeTab === 'seller-dashboard' || activeTab === 'admin-dashboard'
                ? 'text-[#35313B]'
                : 'text-[#77717D]'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </>
  );
};

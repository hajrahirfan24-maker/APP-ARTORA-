import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { CategoryDetailView } from './components/CategoryDetailView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { ProfileView } from './components/ProfileView';
import { SellerDashboardView } from './components/SellerDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { ArtistProfileView } from './components/ArtistProfileView';

const MainContent: React.FC = () => {
  const { activeTab } = useMarketplace();

  return (
    <main className="min-h-screen">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'explore' && <ExploreView />}
      {activeTab === 'category-view' && <CategoryDetailView />}
      {activeTab === 'product-detail' && <ProductDetailView />}
      {activeTab === 'cart' && <CartView />}
      {activeTab === 'checkout' && <CheckoutView />}
      {activeTab === 'order-confirmation' && <OrderConfirmationView />}
      {activeTab === 'order-tracking' && <OrderTrackingView />}
      {(activeTab === 'profile' || activeTab === 'wishlist') && <ProfileView />}
      {activeTab === 'seller-dashboard' && <SellerDashboardView />}
      {activeTab === 'admin-dashboard' && <AdminDashboardView />}
      {activeTab === 'artist-profile' && <ArtistProfileView />}
    </main>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <div className="min-h-screen bg-[#FFFDF7] text-[#35313B] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">
          <MainContent />
        </div>
        <ToastContainer />
      </div>
    </MarketplaceProvider>
  );
}

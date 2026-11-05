import React, { useState } from 'react';
import {
  User,
  MapPin,
  Package,
  Heart,
  Bell,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Store,
  Check,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ArtImage } from './ArtImage';

export const ProfileView: React.FC = () => {
  const {
    user,
    orders,
    products,
    wishlist,
    navigateTo,
    formatPrice,
    switchRole,
    updateUserProfile,
    addAddress,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'preferences'>('orders');

  // New Address form modal/state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newFullName, setNewFullName] = useState(user.name);
  const [newStreet1, setNewStreet1] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostal, setNewPostal] = useState('');
  const [newCountry, setNewCountry] = useState('United States');
  const [newPhone, setNewPhone] = useState(user.phone);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      fullName: newFullName,
      street1: newStreet1,
      city: newCity,
      stateProvince: newState,
      postalCode: newPostal,
      country: newCountry,
      countryCode: 'US',
      phone: newPhone,
      isDefault: false,
    });
    setIsAddingAddress(false);
    setNewStreet1('');
    setNewCity('');
    setNewPostal('');
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-16 space-y-8">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <ArtImage
            src={user.avatar}
            alt={user.name}
            fallbackTitle={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#D8C8F0]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-title text-xl sm:text-2xl font-bold text-[#35313B]">
                {user.name}
              </h1>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-md bg-[#EAE2F5] text-[#35313B]">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-[#77717D] mt-0.5">{user.email} · {user.phone}</p>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-[#77717D]">
              <span className="flex items-center gap-1 text-emerald-700">
                <Check className="w-3.5 h-3.5" />
                Age-Verified Member (Marketplace Safe 15–65)
              </span>
            </div>
          </div>
        </div>

        {/* Portal Switching Panel */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => switchRole('seller')}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#EAE2F5] hover:bg-[#D8C8F0] text-[#35313B] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Artisan Dashboard</span>
          </button>
          <button
            onClick={() => switchRole('admin')}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#35313B] hover:bg-[#35313B]/90 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Console</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-[#EAE2F5] pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#35313B] text-white'
              : 'text-[#77717D] hover:bg-[#EAE2F5] hover:text-[#35313B]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'addresses'
              ? 'bg-[#35313B] text-white'
              : 'text-[#77717D] hover:bg-[#EAE2F5] hover:text-[#35313B]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({user.addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'wishlist'
              ? 'bg-[#35313B] text-white'
              : 'text-[#77717D] hover:bg-[#EAE2F5] hover:text-[#35313B]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Artworks ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'preferences'
              ? 'bg-[#35313B] text-white'
              : 'text-[#77717D] hover:bg-[#EAE2F5] hover:text-[#35313B]'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notification Settings</span>
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAE2F5] text-xs">
                  <div>
                    <span className="font-bold text-[#35313B] text-sm font-mono">
                      {order.orderNumber}
                    </span>
                    <span className="text-[#77717D] ml-2">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase bg-[#EAE2F5] text-[#35313B]">
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <button
                      onClick={() => navigateTo('order-tracking', { order })}
                      className="flex items-center gap-1 font-semibold text-[#35313B] hover:underline cursor-pointer"
                    >
                      <span>Track Transit</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <ArtImage
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fallbackTitle={item.product.title}
                          className="w-12 h-12 rounded-lg object-cover border border-[#D8C8F0]/40"
                        />
                        <div>
                          <p className="font-semibold text-[#35313B]">{item.product.title}</p>
                          <p className="text-[11px] text-[#77717D]">
                            Qty: {item.quantity} · {item.variation.framing || item.variation.albumCover || 'Original Artwork'}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#35313B]">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#EAE2F5] flex justify-between items-center text-xs">
                  <span className="text-[#77717D]">
                    Courier: {order.carrier} (Est: {order.estimatedDelivery})
                  </span>
                  <span className="text-sm font-bold text-[#35313B] font-mono">
                    Total: {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#D8C8F0]">
              <Package className="w-8 h-8 text-[#77717D] mx-auto mb-2" />
              <p className="text-xs text-[#77717D]">No orders placed yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold text-[#35313B]">Saved Delivery Addresses</h2>
            {!isAddingAddress && (
              <button
                onClick={() => setIsAddingAddress(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#35313B] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Address</span>
              </button>
            )}
          </div>

          {/* Add Address Form */}
          {isAddingAddress && (
            <form onSubmit={handleSaveAddress} className="p-6 rounded-3xl bg-white border border-[#D8C8F0] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE2F5]">
                <h3 className="text-xs font-bold text-[#35313B]">Add New International Address</h3>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  className="text-xs text-[#77717D] hover:text-[#35313B]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-[#35313B] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8C8F0] rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#35313B] block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8C8F0] rounded-xl"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-[#35313B] block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={newStreet1}
                    onChange={(e) => setNewStreet1(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8C8F0] rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#35313B] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8C8F0] rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#35313B] block mb-1">State / Province</label>
                  <input
                    type="text"
                    required
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8C8F0] rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#35313B] block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={newPostal}
                    onChange={(e) => setNewPostal(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8C8F0] rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#35313B] block mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8C8F0] rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#35313B] text-white text-xs font-semibold cursor-pointer"
              >
                Save Delivery Address
              </button>
            </form>
          )}

          {/* Saved addresses grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses.map((addr) => (
              <div key={addr.id} className="p-5 rounded-2xl bg-white border border-[#D8C8F0] text-xs space-y-1.5 relative">
                {addr.isDefault && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-[#EAE2F5] px-2 py-0.5 rounded-md inline-block mb-1">
                    Default Destination
                  </span>
                )}
                <h4 className="font-bold text-[#35313B]">{addr.fullName}</h4>
                <p className="text-[#77717D]">{addr.street1}</p>
                {addr.street2 && <p className="text-[#77717D]">{addr.street2}</p>}
                <p className="text-[#77717D]">
                  {addr.city}, {addr.stateProvince} {addr.postalCode}
                </p>
                <p className="text-[#77717D] font-medium">{addr.country}</p>
                <p className="text-[#77717D] pt-1">{addr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#35313B]">
            Your Curated Wishlist ({wishlistProducts.length})
          </h2>
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigateTo('product-detail', { product: p })}
                  className="p-4 rounded-2xl bg-white border border-[#D8C8F0] flex items-center gap-3 cursor-pointer hover:shadow-xs transition-all"
                >
                  <ArtImage
                    src={p.images[0]}
                    alt={p.title}
                    fallbackTitle={p.title}
                    className="w-16 h-16 rounded-xl object-cover border border-[#D8C8F0]/40 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold uppercase text-[#77717D]">
                      {p.categoryName}
                    </span>
                    <h4 className="text-xs font-bold text-[#35313B] truncate">{p.title}</h4>
                    <span className="text-xs font-bold font-mono text-[#35313B]">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#D8C8F0]">
              <Heart className="w-8 h-8 text-[#77717D] mx-auto mb-2" />
              <p className="text-xs text-[#77717D]">No saved artworks yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Preferences */}
      {activeTab === 'preferences' && (
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] space-y-4 text-xs">
          <h2 className="font-serif-title text-base font-bold text-[#35313B]">
            Communication & Marketplace Preferences
          </h2>
          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#FFFDF7] border border-[#D8C8F0]/40 cursor-pointer">
              <div>
                <p className="font-semibold text-[#35313B]">Order & Shipment Tracking Alerts</p>
                <p className="text-[#77717D] text-[11px]">Real-time courier milestone notifications via email & SMS</p>
              </div>
              <input
                type="checkbox"
                checked={user.notificationPrefs.orderUpdates}
                onChange={(e) =>
                  updateUserProfile({
                    notificationPrefs: { ...user.notificationPrefs, orderUpdates: e.target.checked },
                  })
                }
                className="w-4 h-4 rounded-md accent-[#35313B]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#FFFDF7] border border-[#D8C8F0]/40 cursor-pointer">
              <div>
                <p className="font-semibold text-[#35313B]">Artisan Studio Spotlights & Commission Alerts</p>
                <p className="text-[#77717D] text-[11px]">Quarterly exhibition invitations from Dar Al-Noor & Atelier Rostova</p>
              </div>
              <input
                type="checkbox"
                checked={user.notificationPrefs.artisanSpotlights}
                onChange={(e) =>
                  updateUserProfile({
                    notificationPrefs: { ...user.notificationPrefs, artisanSpotlights: e.target.checked },
                  })
                }
                className="w-4 h-4 rounded-md accent-[#35313B]"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

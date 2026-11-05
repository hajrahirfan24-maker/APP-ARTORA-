import React, { useState, useEffect } from 'react';
import {
  Store,
  Package,
  Plus,
  DollarSign,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  Truck,
  Edit3,
  Layers,
  Sparkles,
  UserCheck,
  ExternalLink,
  Save,
  RotateCcw,
  Check,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES } from '../data/mockData';
import { CategoryId, OrderStatus, Product } from '../types';
import { generateArtDataUri, ARTISAN_AVATARS } from '../data/artVisuals';
import { ArtImage } from './ArtImage';

export const SellerDashboardView: React.FC = () => {
  const {
    user,
    products,
    orders,
    inquiries,
    replyInquiry,
    updateOrderStatus,
    addProduct,
    formatPrice,
    updateProduct,
    updateSellerProfile,
    navigateTo,
  } = useMarketplace();

  const artisan = user.sellerProfile || {
    id: 'artisan-zainab',
    name: user.name,
    storeName: 'Dar Al-Noor Atelier',
    avatar: user.avatar,
    bio: 'Master artisan creating original calligraphy and illuminated masterpieces.',
    location: 'Istanbul, Turkey',
    countryCode: 'TR',
    verified: true,
    rating: 4.98,
    salesCount: 428,
    joinedYear: 2021,
    responseRate: '< 1 hour',
    specialty: 'Islamic & Arabic Gold Leaf Calligraphy',
  };

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'inquiries' | 'new-product' | 'edit-profile'>('inventory');

  // Seller Profile Edit State
  const [storeName, setStoreName] = useState(artisan.storeName);
  const [artisanName, setArtisanName] = useState(artisan.name);
  const [bio, setBio] = useState(artisan.bio);
  const [location, setLocation] = useState(artisan.location);
  const [countryCode, setCountryCode] = useState(artisan.countryCode || 'TR');
  const [specialty, setSpecialty] = useState(artisan.specialty);
  const [responseRate, setResponseRate] = useState(artisan.responseRate);
  const [selectedAvatar, setSelectedAvatar] = useState(artisan.avatar);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  // Sync state if artisan changes
  useEffect(() => {
    setStoreName(artisan.storeName);
    setArtisanName(artisan.name);
    setBio(artisan.bio);
    setLocation(artisan.location);
    setCountryCode(artisan.countryCode || 'TR');
    setSpecialty(artisan.specialty);
    setResponseRate(artisan.responseRate);
    setSelectedAvatar(artisan.avatar);
  }, [artisan]);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryId>('paintings');
  const [newPrice, setNewPrice] = useState('450');
  const [newStock, setNewStock] = useState('3');
  const [newDesc, setNewDesc] = useState('');
  const [newMaterials, setNewMaterials] = useState('Archival heavy linen canvas, natural pigments, 24k gold leaf.');
  const [newDimensions, setNewDimensions] = useState('50 x 70 cm (20 x 28 in)');
  const [newCustomizable, setNewCustomizable] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  // Inquiry Reply Form State
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // Filter products belonging to this seller (or all for demo flexibility)
  const myProducts = products.filter((p) => p.artisan.id === artisan.id || p.artisan.name === artisan.name);

  // Sales metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.subtotal, 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const catObj = CATEGORIES.find((c) => c.id === newCategory) || CATEGORIES[0];
    const frontImage = generateArtDataUri(newTitle, catObj.name, 'front', {
      primary: '#553C9A',
      secondary: '#E9D8FD',
      accent: '#D4AF37',
      bg: '#FFFDF7',
    });
    const detailImage = generateArtDataUri(newTitle, catObj.name, 'detail', {
      primary: '#553C9A',
      secondary: '#E9D8FD',
      accent: '#D4AF37',
      bg: '#FFFDF7',
    });
    const mockupImage = generateArtDataUri(newTitle, catObj.name, 'mockup', {
      primary: '#553C9A',
      secondary: '#E9D8FD',
      accent: '#D4AF37',
      bg: '#FFFDF7',
    });

    addProduct({
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryId: newCategory,
      categoryName: catObj.name,
      price: Number(newPrice),
      images: [frontImage, detailImage, mockupImage],
      description: newDesc || 'An authentic original piece handcrafted with archival grade materials.',
      artisan,
      stock: Number(newStock),
      isNew: true,
      isCustomizable: newCustomizable,
      customizationPrompt: newCustomizable ? customPrompt : undefined,
      variations: {
        framing: ['Gallery Stretched Canvas', 'Natural White Oak Frame', 'Champagne Brass Shadowbox'],
        dimensions: [newDimensions, '70 x 100 cm (28 x 39 in)'],
        materials: [newMaterials],
      },
      materialsText: newMaterials,
      dimensionsText: newDimensions,
      shippingDays: 'Ships in 3-5 business days via tracked art courier.',
      weightKg: 2.5,
      tags: ['Handmade', catObj.name, 'Artisan Original'],
    });

    setNewTitle('');
    setNewDesc('');
    setActiveTab('inventory');
  };

  const handleSendReply = (inqId: string) => {
    const text = replyTextMap[inqId];
    if (text?.trim()) {
      replyInquiry(inqId, text);
      setReplyTextMap((prev) => ({ ...prev, [inqId]: '' }));
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAvatar = customAvatarUrl.trim() || selectedAvatar;
    updateSellerProfile({
      storeName: storeName.trim() || artisan.storeName,
      name: artisanName.trim() || artisan.name,
      bio: bio.trim() || artisan.bio,
      location: location.trim() || artisan.location,
      countryCode: countryCode.trim().toUpperCase() || artisan.countryCode,
      specialty: specialty.trim() || artisan.specialty,
      responseRate: responseRate || artisan.responseRate,
      avatar: finalAvatar,
    });
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 3000);
  };

  const handleResetProfile = () => {
    setStoreName(artisan.storeName);
    setArtisanName(artisan.name);
    setBio(artisan.bio);
    setLocation(artisan.location);
    setCountryCode(artisan.countryCode || 'TR');
    setSpecialty(artisan.specialty);
    setResponseRate(artisan.responseRate);
    setSelectedAvatar(artisan.avatar);
    setCustomAvatarUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-16 space-y-8">
      {/* Atelier Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#EAE2F5] via-[#FFFDF7] to-[#FCEEF3] border border-[#D8C8F0] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <ArtImage
            src={artisan.avatar}
            alt={artisan.name}
            fallbackTitle={artisan.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-title text-2xl font-bold text-[#35313B]">
                {artisan.storeName}
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                Verified Artisan Atelier
              </span>
            </div>
            <p className="text-xs text-[#77717D] mt-0.5">
              Master Artisan: {artisan.name} · {artisan.location}
            </p>
            <p className="text-xs text-[#77717D] mt-1 italic max-w-lg">
              "{artisan.bio}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setActiveTab('edit-profile')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 border ${
              activeTab === 'edit-profile'
                ? 'bg-[#35313B] text-white border-[#35313B]'
                : 'bg-white border-[#D8C8F0] text-[#35313B] hover:bg-[#EAE2F5]'
            }`}
          >
            <Edit3 className="w-4 h-4 text-inherit" />
            <span>Edit Atelier Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('new-product')}
            className="px-5 py-2.5 rounded-xl bg-[#35313B] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#35313B]/90 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Artwork</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#D8C8F0] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#77717D] mb-1">
            <span>Total Sales Volume</span>
            <DollarSign className="w-4 h-4 text-[#35313B]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#35313B] tabular-nums">
            {formatPrice(totalRevenue)}
          </span>
          <span className="text-[11px] text-emerald-700 block mt-1">Verified Escrow Balance</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D8C8F0] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#77717D] mb-1">
            <span>Total Orders Fulfilled</span>
            <Package className="w-4 h-4 text-[#35313B]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#35313B] tabular-nums">
            {orders.length}
          </span>
          <span className="text-[11px] text-[#77717D] block mt-1">100% on-time handover</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D8C8F0] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#77717D] mb-1">
            <span>Collector Rating</span>
            <TrendingUp className="w-4 h-4 text-[#35313B]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#35313B] tabular-nums">
            {artisan.rating} / 5.0
          </span>
          <span className="text-[11px] text-[#77717D] block mt-1">Based on {artisan.salesCount} commissions</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D8C8F0] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#77717D] mb-1">
            <span>Client Inquiries</span>
            <MessageSquare className="w-4 h-4 text-[#35313B]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#35313B] tabular-nums">
            {inquiries.filter((i) => i.status === 'pending').length} Pending
          </span>
          <span className="text-[11px] text-[#77717D] block mt-1">Avg response &lt; 1 hour</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAE2F5] pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'inventory' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Catalog & Inventory ({myProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'orders' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Fulfillment & Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'inquiries' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Customer Custom Inquiries ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('new-product')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'new-product' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>

        <button
          onClick={() => setActiveTab('edit-profile')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'edit-profile' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Edit Atelier Profile</span>
        </button>
      </div>

      {/* Tab 1: Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE2F5]">
            <h2 className="text-sm font-bold text-[#35313B]">
              Active Listings in Your Atelier
            </h2>
            <span className="text-xs text-[#77717D]">
              Click stock values to adjust inventory in real time
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#35313B]">
              <thead>
                <tr className="border-b border-[#EAE2F5] text-[#77717D] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Artwork</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Base Price</th>
                  <th className="py-3 px-3">Stock Available</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE2F5]">
                {myProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FFFDF7]">
                    <td className="py-3 px-3 flex items-center gap-3">
                      <ArtImage
                        src={p.images[0]}
                        alt={p.title}
                        fallbackTitle={p.title}
                        className="w-12 h-12 rounded-lg object-cover border border-[#D8C8F0]/40 shrink-0"
                      />
                      <div>
                        <span className="font-semibold block">{p.title}</span>
                        <span className="text-[11px] text-[#77717D]">★ {p.rating} ({p.reviewCount})</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">{p.categoryName}</td>
                    <td className="py-3 px-3 font-mono font-bold">{formatPrice(p.price)}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateProduct({ ...p, stock: Math.max(0, p.stock - 1) })}
                          className="w-6 h-6 rounded bg-[#EAE2F5] text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold min-w-[20px] text-center">{p.stock}</span>
                        <button
                          onClick={() => updateProduct({ ...p, stock: p.stock + 1 })}
                          className="w-6 h-6 rounded bg-[#EAE2F5] text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Active Listing
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => updateProduct({ ...p, price: p.price + 20 })}
                        className="text-xs text-[#35313B] hover:underline font-medium"
                      >
                        Adjust Price
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Fulfillment */}
      {activeTab === 'orders' && (
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#35313B]">
            Incoming Collector Orders
          </h2>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D8C8F0]/60 text-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#EAE2F5]">
                  <div>
                    <span className="font-bold text-[#35313B] font-mono text-sm">{ord.orderNumber}</span>
                    <span className="text-[#77717D] ml-2">Collector: {ord.customerName} ({ord.shippingAddress.country})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#77717D]">Fulfillment Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="px-2.5 py-1 rounded-lg border border-[#D8C8F0] bg-white font-semibold text-xs"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="artisan_crafting">Artisan Crafting</option>
                      <option value="quality_check">Quality Check</option>
                      <option value="shipped">Dispatched</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {ord.items.map((i) => (
                    <div key={i.id} className="flex justify-between items-center text-[#77717D]">
                      <span>{i.product.title} (Qty: {i.quantity}) · {i.variation.framing || 'Original'}</span>
                      <span className="font-mono text-[#35313B] font-bold">{formatPrice(i.unitPrice * i.quantity)}</span>
                    </div>
                  ))}
                  {ord.giftMessage && (
                    <p className="text-[11px] text-purple-800 italic pt-1">
                      Gift Inscription Note: "{ord.giftMessage}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Customer Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#35313B]">
            Custom Commission Requests & Inquiries
          </h2>

          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D8C8F0]/60 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#35313B]">{inq.productTitle}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    inq.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inq.status === 'resolved' ? 'Replied' : 'Pending Reply'}
                  </span>
                </div>

                <p className="text-[#35313B]">
                  <strong>{inq.customerName}</strong> ({inq.customerEmail}): "{inq.message}"
                </p>

                {inq.reply ? (
                  <div className="p-3 rounded-xl bg-white border border-emerald-200 text-emerald-900">
                    <strong>Your Response: </strong> {inq.reply}
                  </div>
                ) : (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Type direct response to collector..."
                      value={replyTextMap[inq.id] || ''}
                      onChange={(e) => setReplyTextMap({ ...replyTextMap, [inq.id]: e.target.value })}
                      className="flex-1 px-3 py-2 border border-[#D8C8F0] rounded-xl text-xs"
                    />
                    <button
                      onClick={() => handleSendReply(inq.id)}
                      className="px-4 py-2 bg-[#35313B] text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Add New Product Form */}
      {activeTab === 'new-product' && (
        <form onSubmit={handleCreateProduct} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE2F5]">
            <h2 className="font-serif-title text-lg font-bold text-[#35313B]">
              Add New Artwork to Global Catalog
            </h2>
            <span className="text-xs text-[#77717D]">
              Categorized in one of ARTORA's 14 verified departments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="font-semibold text-[#35313B] block mb-1">Artwork Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Diwani Quranic Verses on Tea Parchment"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-[#35313B] block mb-1">Select Department (14 Categories)</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as CategoryId)}
                className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#35313B] block mb-1">Base Price (USD)</label>
              <input
                type="number"
                required
                min="10"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-[#35313B] block mb-1">Initial Stock Units</label>
              <input
                type="number"
                required
                min="1"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-[#35313B] block mb-1">Dimensions</label>
              <input
                type="text"
                required
                value={newDimensions}
                onChange={(e) => setNewDimensions(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-[#35313B] block mb-1">Materials & Pigments</label>
              <input
                type="text"
                required
                value={newMaterials}
                onChange={(e) => setNewMaterials(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-[#35313B] block mb-1">Artwork Description & Provenance</label>
              <textarea
                rows={3}
                required
                placeholder="Describe the inspiration, calligraphy style, or painting technique..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full p-3 border border-[#D8C8F0] rounded-xl"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={newCustomizable}
                  onChange={(e) => setNewCustomizable(e.target.checked)}
                  className="w-4 h-4 accent-[#35313B]"
                />
                <span className="font-semibold text-[#35313B]">
                  Offer custom client dedications / debossed lettering
                </span>
              </label>

              {newCustomizable && (
                <input
                  type="text"
                  placeholder="Customization prompt (e.g. Enter family names for gold debossing)"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#D8C8F0] rounded-xl text-xs"
                />
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#EAE2F5] flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('inventory')}
              className="px-4 py-2.5 rounded-xl border border-[#D8C8F0] text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#35313B] text-white text-xs font-semibold hover:bg-[#35313B]/90"
            >
              Publish Artwork Listing
            </button>
          </div>
        </form>
      )}

      {/* Tab 5: Edit Atelier & Artisan Profile */}
      {activeTab === 'edit-profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Edit Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE2F5]">
              <div>
                <h2 className="font-serif-title text-xl font-bold text-[#35313B]">
                  Edit Atelier & Artisan Profile
                </h2>
                <p className="text-xs text-[#77717D] mt-0.5">
                  Update your public store name, craft specialty, location, and avatar displayed across ARTORA.
                </p>
              </div>
              {isSavedRecently && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <Check className="w-3.5 h-3.5" />
                  <span>Changes Saved!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Avatar Selection Section */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#35313B]">
                  1. Atelier & Artisan Avatar
                </label>
                <p className="text-xs text-[#77717D]">
                  Select an authentic artisan illustration or paste a custom image URL:
                </p>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {[
                    { key: 'zainab', name: 'Zainab (Calligraphy)', src: ARTISAN_AVATARS.zainab },
                    { key: 'elena', name: 'Elena (Oil Painting)', src: ARTISAN_AVATARS.elena },
                    { key: 'marcus', name: 'Marcus (Bookbindery)', src: ARTISAN_AVATARS.marcus },
                    { key: 'soraya', name: 'Soraya (Modern Script)', src: ARTISAN_AVATARS.soraya },
                    { key: 'kenji', name: 'Kenji (Wood & Decor)', src: ARTISAN_AVATARS.kenji },
                    { key: 'customer', name: 'Artisan Atelier', src: ARTISAN_AVATARS.customer },
                  ].map((av) => {
                    const isSelected = selectedAvatar === av.src && !customAvatarUrl;
                    return (
                      <button
                        key={av.key}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(av.src);
                          setCustomAvatarUrl('');
                        }}
                        className={`p-2 rounded-2xl border transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'border-[#35313B] bg-[#EAE2F5]/50 ring-2 ring-[#35313B]'
                            : 'border-[#D8C8F0]/60 hover:border-[#D8C8F0] bg-[#FFFDF7]'
                        }`}
                      >
                        <ArtImage
                          src={av.src}
                          alt={av.name}
                          fallbackTitle={av.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#D8C8F0]"
                        />
                        <span className="text-[10px] font-medium text-[#35313B] line-clamp-1">
                          {av.key.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <label className="text-xs text-[#77717D] block mb-1">
                    Or use a custom avatar image URL:
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/artisan-photo.jpg (Optional)"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl text-xs bg-white text-[#35313B]"
                  />
                </div>
              </div>

              {/* Atelier Brand Identity */}
              <div className="space-y-4 pt-2 border-t border-[#EAE2F5]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#35313B]">
                  2. Atelier Brand & Identification
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#35313B] block mb-1">
                      Store / Atelier Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="e.g. Dar Al-Noor Atelier"
                      className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl text-xs bg-white text-[#35313B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#35313B] block mb-1">
                      Master Artisan Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={artisanName}
                      onChange={(e) => setArtisanName(e.target.value)}
                      placeholder="e.g. Zainab Al-Mansoor"
                      className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl text-xs bg-white text-[#35313B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#35313B] block mb-1">
                    Primary Craft Specialty & Focus *
                  </label>
                  <input
                    type="text"
                    required
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="e.g. Islamic & Arabic Gold Leaf Calligraphy"
                    className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl text-xs bg-white text-[#35313B]"
                  />
                </div>
              </div>

              {/* Location & Client Guarantee */}
              <div className="space-y-4 pt-2 border-t border-[#EAE2F5]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#35313B]">
                  3. Studio Location & Response Guarantee
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[#35313B] block mb-1">
                      Atelier City & Region *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Istanbul, Turkey"
                      className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl text-xs bg-white text-[#35313B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#35313B] block mb-1">
                      Country Code
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                      placeholder="TR"
                      className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl text-xs bg-white text-[#35313B] uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#35313B] block mb-1">
                    Client Inquiry Turnaround Guarantee
                  </label>
                  <select
                    value={responseRate}
                    onChange={(e) => setResponseRate(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl text-xs bg-white text-[#35313B]"
                  >
                    <option value="< 30 mins">&lt; 30 mins (Priority Concierge)</option>
                    <option value="< 1 hour">&lt; 1 hour (Standard Artisan)</option>
                    <option value="< 2 hours">&lt; 2 hours</option>
                    <option value="< 4 hours">&lt; 4 hours</option>
                    <option value="Same business day">Same business day</option>
                  </select>
                </div>
              </div>

              {/* Artisan Bio & Statement */}
              <div className="space-y-4 pt-2 border-t border-[#EAE2F5]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#35313B]">
                  4. Studio Biography & Craft Philosophy
                </label>
                <textarea
                  rows={4}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share your heritage, lineage of apprenticeship, materials used, and artistic philosophy..."
                  className="w-full p-3.5 border border-[#D8C8F0] rounded-xl text-xs bg-white text-[#35313B] leading-relaxed"
                />
              </div>

              {/* Submit and Reset Actions */}
              <div className="pt-4 border-t border-[#EAE2F5] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetProfile}
                  className="px-4 py-2.5 rounded-xl border border-[#D8C8F0] text-xs font-semibold text-[#77717D] hover:bg-[#EAE2F5] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Changes</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateTo('artist-profile', { artist: artisan })}
                    className="px-4 py-2.5 rounded-xl bg-[#EAE2F5] text-[#35313B] text-xs font-semibold hover:bg-[#D8C8F0] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Public Page</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#35313B] text-white text-xs font-semibold hover:bg-[#35313B]/90 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Atelier Profile</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="p-3 bg-[#EAE2F5]/60 rounded-2xl border border-[#D8C8F0] flex items-center justify-between">
              <span className="text-xs font-bold text-[#35313B] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#35313B]" />
                <span>Live Public Atelier Card Preview</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#77717D] bg-white px-2 py-0.5 rounded-md">
                Buyer View
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-sm space-y-5">
              <div className="flex items-start gap-4">
                <ArtImage
                  src={customAvatarUrl.trim() || selectedAvatar}
                  alt={artisanName}
                  fallbackTitle={artisanName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#D8C8F0] shadow-xs shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-serif-title text-lg font-bold text-[#35313B]">
                      {storeName || 'Atelier Name'}
                    </h3>
                    <CheckCircle className="w-4 h-4 text-[#35313B] fill-[#D8C8F0]" />
                  </div>
                  <p className="text-xs font-medium text-[#35313B] mt-0.5">
                    {artisanName || 'Master Artisan'}
                  </p>
                  <p className="text-[11px] text-[#77717D] mt-0.5">
                    {location || 'Studio Location'} ({countryCode || 'INT'})
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#EAE2F5] text-xs text-[#77717D] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-[#77717D]">Specialty:</span>
                  <span className="font-semibold text-[#35313B] text-[11px] bg-[#EAE2F5] px-2 py-0.5 rounded-md">
                    {specialty || 'Fine Art'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-[#77717D]">Collector Rating:</span>
                  <span className="font-bold text-[#35313B] text-[11px]">
                    ★ {artisan.rating} ({artisan.salesCount} commissions)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-[#77717D]">Response Time:</span>
                  <span className="font-medium text-emerald-800 text-[11px]">
                    {responseRate}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#77717D] block mb-1">
                  Atelier Statement
                </span>
                <p className="text-xs text-[#35313B] leading-relaxed italic bg-[#FCEEF3]/50 p-3 rounded-xl border border-[#F8DDE8]">
                  "{bio || 'No artist statement provided yet.'}"
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('artist-profile', { artist: artisan })}
                  className="w-full py-2.5 rounded-xl bg-[#35313B] text-white text-xs font-semibold hover:bg-[#35313B]/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open Public Gallery</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

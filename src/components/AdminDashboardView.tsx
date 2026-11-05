import React, { useState } from 'react';
import {
  ShieldCheck,
  Package,
  Users,
  DollarSign,
  Tag,
  Settings,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES, PROMO_CODES } from '../data/mockData';
import { OrderStatus, Product, PromoCode } from '../types';
import { ArtImage } from './ArtImage';

export const AdminDashboardView: React.FC = () => {
  const {
    products,
    deleteProduct,
    updateProduct,
    orders,
    updateOrderStatus,
    formatPrice,
    showToast,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'sellers' | 'orders' | 'discounts' | 'settings'>('overview');

  // Promo management
  const [promos, setPromos] = useState<PromoCode[]>(PROMO_CODES);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState('15');

  // Seller moderation simulation state
  const [pendingSellers, setPendingSellers] = useState([
    {
      id: 'sel-req-1',
      name: 'Farid Mansoor',
      atelier: 'Naskh Heritage Studio',
      location: 'Amman, Jordan',
      specialty: 'Classical Quranic Manuscripts',
      status: 'pending',
    },
    {
      id: 'sel-req-2',
      name: 'Chantal Lemaire',
      atelier: 'Provence Botanical Art',
      location: 'Aix-en-Provence, France',
      specialty: 'Pressed Flora & Cotton Stationery',
      status: 'pending',
    },
  ]);

  const totalGMV = orders.reduce((sum, o) => sum + o.total, 0);

  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    const newP: PromoCode = {
      code: newPromoCode.trim().toUpperCase(),
      discountPercent: Number(newPromoDiscount),
      minSpendUSD: 100,
      description: `${newPromoDiscount}% off marketplace campaign`,
      active: true,
    };
    setPromos([...promos, newP]);
    setNewPromoCode('');
    showToast(`Campaign promo code "${newP.code}" created!`, 'success');
  };

  const handleApproveSeller = (id: string) => {
    setPendingSellers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s))
    );
    showToast('Artisan credentials verified and approved for marketplace listings.', 'success');
  };

  const handleRejectSeller = (id: string) => {
    setPendingSellers((prev) => prev.filter((s) => s.id !== id));
    showToast('Artisan application declined.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-16 space-y-8">
      {/* Admin Title Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#35313B] text-white shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D8C8F0]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D8C8F0]">
              Marketplace Administration Console
            </span>
          </div>
          <h1 className="font-serif-title text-2xl sm:text-3xl font-bold mt-1">
            ARTORA Global Governance & Analytics
          </h1>
          <p className="text-xs text-white/70 mt-1">
            Catalog oversight, artisan accreditation, international orders, and currency configuration
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/10 text-white border border-white/20">
            System Status: 100% Operational
          </span>
        </div>
      </div>

      {/* Primary KPI Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#D8C8F0] shadow-xs">
          <span className="text-xs text-[#77717D] block mb-1">Total Marketplace GMV</span>
          <span className="text-2xl font-bold font-mono text-[#35313B]">
            {formatPrice(totalGMV)}
          </span>
          <span className="text-[11px] text-emerald-700 block mt-1">+18.4% from previous month</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D8C8F0] shadow-xs">
          <span className="text-xs text-[#77717D] block mb-1">Active Catalog Artworks</span>
          <span className="text-2xl font-bold font-mono text-[#35313B]">
            {products.length}
          </span>
          <span className="text-[11px] text-[#77717D] block mt-1">Across 14 categories</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D8C8F0] shadow-xs">
          <span className="text-xs text-[#77717D] block mb-1">Total Customer Orders</span>
          <span className="text-2xl font-bold font-mono text-[#35313B]">
            {orders.length}
          </span>
          <span className="text-[11px] text-[#77717D] block mt-1">Global delivery coverage</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D8C8F0] shadow-xs">
          <span className="text-xs text-[#77717D] block mb-1">Pending Artisan Requests</span>
          <span className="text-2xl font-bold font-mono text-[#35313B]">
            {pendingSellers.filter((s) => s.status === 'pending').length}
          </span>
          <span className="text-[11px] text-amber-700 block mt-1">Awaiting portfolio review</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAE2F5] pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'overview' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          Marketplace Overview
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'catalog' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          Manage Artworks Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('sellers')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'sellers' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          Artisan Moderation ({pendingSellers.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'orders' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          Global Orders Oversight ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('discounts')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'discounts' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          Promo Codes & Campaigns
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'settings' ? 'bg-[#35313B] text-white' : 'text-[#77717D] hover:bg-[#EAE2F5]'
          }`}
        >
          Global Marketplace Settings
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Breakdown */}
          <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
            <h2 className="font-serif-title text-base font-bold text-[#35313B]">
              Active Department Inventory (14 Categories)
            </h2>
            <div className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <div key={cat.id} className="flex justify-between items-center py-1.5 border-b border-[#EAE2F5] last:border-0">
                    <span className="font-medium text-[#35313B]">{cat.name}</span>
                    <span className="font-mono text-[#77717D]">{count} registered pieces</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions & Governance Policy */}
          <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4 text-xs">
            <h2 className="font-serif-title text-base font-bold text-[#35313B]">
              Marketplace Integrity & Safety Standards
            </h2>
            <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D8C8F0] space-y-2">
              <span className="font-bold text-[#35313B] block">Age-Appropriate Safe Marketplace (15-65)</span>
              <p className="text-[#77717D] leading-relaxed">
                ARTORA enforces strict curation against prohibited materials, adult content, and deceptive replicas. All products must include authenticated provenance certificates and real materials documentation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EAE2F5]/40 border border-[#D8C8F0] space-y-2">
              <span className="font-bold text-[#35313B] block">Zero Counterfeit Policy</span>
              <p className="text-[#77717D] leading-relaxed">
                Artisans undergo manual ID verification and portfolio review prior to publishing listings. High-value pieces over $500 undergo secondary physical curator inspection.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Catalog Management */}
      {activeTab === 'catalog' && (
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE2F5]">
            <h2 className="text-sm font-bold text-[#35313B]">
              Catalog Inventory Oversight ({products.length} Items)
            </h2>
            <span className="text-xs text-[#77717D]">
              Feature or remove listings across global storefronts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#35313B]">
              <thead>
                <tr className="border-b border-[#EAE2F5] text-[#77717D] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Artwork</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Artisan</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Featured</th>
                  <th className="py-3 px-3 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE2F5]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FFFDF7]">
                    <td className="py-3 px-3 flex items-center gap-3">
                      <ArtImage
                        src={p.images[0]}
                        alt={p.title}
                        fallbackTitle={p.title}
                        className="w-10 h-10 rounded-lg object-cover border border-[#D8C8F0]/40 shrink-0"
                      />
                      <span className="font-semibold">{p.title}</span>
                    </td>
                    <td className="py-3 px-3">{p.categoryName}</td>
                    <td className="py-3 px-3">{p.artisan.name}</td>
                    <td className="py-3 px-3 font-mono font-bold">{formatPrice(p.price)}</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => updateProduct({ ...p, isFeatured: !p.isFeatured })}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer ${
                          p.isFeatured
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p.isFeatured ? '★ Featured on Home' : 'Standard'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove artwork from catalog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Sellers Moderation */}
      {activeTab === 'sellers' && (
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#35313B]">
            Pending Artisan Accreditation Applications
          </h2>

          <div className="space-y-4">
            {pendingSellers.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D8C8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#35313B] text-sm">{s.name}</span>
                    <span className="text-[#77717D]">· {s.atelier}</span>
                  </div>
                  <p className="text-[#77717D] mt-0.5">Location: {s.location} · Specialty: {s.specialty}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold ${
                    s.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {s.status === 'approved' ? 'Verified & Onboarded' : 'Pending Verification'}
                  </span>
                </div>

                {s.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveSeller(s.id)}
                      className="px-3.5 py-2 rounded-xl bg-[#35313B] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve Artisan</span>
                    </button>
                    <button
                      onClick={() => handleRejectSeller(s.id)}
                      className="px-3 py-2 rounded-xl border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Global Orders Oversight */}
      {activeTab === 'orders' && (
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#35313B]">
            Platform-Wide Collector Orders Oversight
          </h2>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D8C8F0]/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold font-mono text-[#35313B] text-sm">{ord.orderNumber}</span>
                  <span className="text-[#77717D] ml-2">Customer: {ord.customerName} ({ord.customerEmail})</span>
                  <p className="text-[#77717D] mt-0.5">
                    {ord.items.length} items · Total: <strong>{formatPrice(ord.total)}</strong> · Courier: {ord.carrier}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#77717D]">Status:</span>
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                    className="px-3 py-1.5 rounded-xl border border-[#D8C8F0] bg-white font-semibold text-xs cursor-pointer"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="artisan_crafting">Artisan Crafting</option>
                    <option value="quality_check">Quality Check</option>
                    <option value="shipped">Dispatched</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Promo Codes & Campaigns */}
      {activeTab === 'discounts' && (
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE2F5]">
            <h2 className="text-sm font-bold text-[#35313B]">
              Promotional Codes & Campaign Discounts
            </h2>
          </div>

          <form onSubmit={handleAddPromo} className="flex flex-col sm:flex-row gap-3 max-w-lg text-xs">
            <input
              type="text"
              required
              placeholder="Promo Code (e.g. SPRING25)"
              value={newPromoCode}
              onChange={(e) => setNewPromoCode(e.target.value)}
              className="flex-1 px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl uppercase font-mono"
            />
            <input
              type="number"
              required
              min="5"
              max="50"
              placeholder="% off"
              value={newPromoDiscount}
              onChange={(e) => setNewPromoDiscount(e.target.value)}
              className="w-24 px-3.5 py-2.5 border border-[#D8C8F0] rounded-xl font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#35313B] text-white font-semibold rounded-xl cursor-pointer shrink-0"
            >
              Add Promo
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {promos.map((p) => (
              <div key={p.code} className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D8C8F0] text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-[#35313B] text-sm">{p.code}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {p.discountPercent}% OFF
                  </span>
                </div>
                <p className="text-[#77717D] text-[11px]">{p.description}</p>
                <span className="text-[10px] text-emerald-700 block font-medium">Active Campaign</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Settings */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4 text-xs max-w-2xl">
          <h2 className="font-serif-title text-base font-bold text-[#35313B]">
            Global Marketplace Configuration
          </h2>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center p-3 rounded-xl bg-[#FFFDF7] border border-[#D8C8F0]/40">
              <div>
                <p className="font-semibold text-[#35313B]">Artisan Platform Commission Rate</p>
                <p className="text-[#77717D] text-[11px]">Fair global fee supporting master preservation and curator certification</p>
              </div>
              <span className="font-mono font-bold text-sm text-[#35313B]">10.0%</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-[#FFFDF7] border border-[#D8C8F0]/40">
              <div>
                <p className="font-semibold text-[#35313B]">Free International Shipping Threshold</p>
                <p className="text-[#77717D] text-[11px]">Orders exceeding this value receive complimentary insured courier transit</p>
              </div>
              <span className="font-mono font-bold text-sm text-[#35313B]">$500.00 USD</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-[#FFFDF7] border border-[#D8C8F0]/40">
              <div>
                <p className="font-semibold text-[#35313B]">Live Exchange Rate Feed</p>
                <p className="text-[#77717D] text-[11px]">Automated multi-currency conversion (USD, EUR, GBP, AED, SAR, CAD, AUD, JPY)</p>
              </div>
              <span className="text-emerald-700 font-bold">Synchronized</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

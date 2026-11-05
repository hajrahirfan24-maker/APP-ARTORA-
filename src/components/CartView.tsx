import React, { useState } from 'react';
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Truck,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ArtImage } from './ArtImage';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    formatPrice,
    navigateTo,
    appliedPromo,
    applyPromo,
    removePromo,
    selectedCurrency,
  } = useMarketplace();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('standard');

  const subtotalUSD = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Discount calculation
  const discountUSD = appliedPromo ? (subtotalUSD * appliedPromo.discountPercent) / 100 : 0;

  // Shipping calculation
  const baseShippingUSD = subtotalUSD > 500 ? 0 : 25; // Free over $500
  const shippingFeeUSD = shippingOption === 'express' ? baseShippingUSD + 40 : baseShippingUSD;

  // Tax calculation (e.g. 5% standard international import VAT)
  const taxUSD = (subtotalUSD - discountUSD) * 0.05;

  const totalUSD = subtotalUSD - discountUSD + shippingFeeUSD + taxUSD;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#EAE2F5] flex items-center justify-center mx-auto text-[#77717D]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif-title text-2xl font-bold text-[#35313B]">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-[#77717D] max-w-sm mx-auto">
          Explore our certified originals, calligraphy masterpieces, and heirloom albums to begin your collection.
        </p>
        <button
          onClick={() => navigateTo('explore')}
          className="mt-2 px-6 py-3 rounded-xl bg-[#35313B] text-white text-xs font-semibold hover:bg-[#35313B]/90 transition-all cursor-pointer"
        >
          Discover Artworks
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-16 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D8C8F0]/40">
        <div>
          <button
            onClick={() => navigateTo('explore')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#77717D] hover:text-[#35313B] transition-colors cursor-pointer mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#35313B]">
            Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8C8F0]/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div className="flex items-start gap-4">
                <ArtImage
                  src={item.product.images[0]}
                  alt={item.product.title}
                  fallbackTitle={item.product.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-[#D8C8F0]/40 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#77717D]">
                    {item.product.categoryName}
                  </span>
                  <h3
                    onClick={() => navigateTo('product-detail', { product: item.product })}
                    className="text-sm font-bold text-[#35313B] hover:underline cursor-pointer line-clamp-1"
                  >
                    {item.product.title}
                  </h3>
                  <p className="text-xs text-[#77717D] mt-0.5">
                    by {item.product.artisan.name}
                  </p>

                  {/* Variation Details */}
                  <div className="mt-1.5 text-[11px] text-[#77717D] space-y-0.5">
                    {item.variation.framing && (
                      <div>Frame: <span className="text-[#35313B] font-medium">{item.variation.framing}</span></div>
                    )}
                    {item.variation.dimensions && (
                      <div>Size: <span className="text-[#35313B] font-medium">{item.variation.dimensions}</span></div>
                    )}
                    {item.variation.albumCover && (
                      <div>Cover: <span className="text-[#35313B] font-medium">{item.variation.albumCover}</span></div>
                    )}
                    {item.variation.customNote && (
                      <div className="text-purple-800 font-medium">Custom Inscription: "{item.variation.customNote}"</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Price */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EAE2F5]">
                <div className="text-right">
                  <span className="text-base font-bold text-[#35313B] font-mono tabular-nums">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-[11px] text-[#77717D] block">
                      {formatPrice(item.unitPrice)} each
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#D8C8F0] rounded-lg bg-[#FFFDF7] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-xs text-[#77717D] hover:text-[#35313B] hover:bg-[#EAE2F5] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2.5 py-1 text-xs font-bold text-[#35313B] font-mono">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-xs text-[#77717D] hover:text-[#35313B] hover:bg-[#EAE2F5] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-[#77717D] hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Shipping speed selection */}
          <div className="p-4 rounded-2xl bg-white border border-[#D8C8F0]/50 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#35313B] block">
              International Art Delivery Options
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setShippingOption('standard')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  shippingOption === 'standard'
                    ? 'border-[#35313B] bg-[#FFFDF7]'
                    : 'border-[#D8C8F0]/60 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#35313B]" />
                  <div>
                    <div className="text-xs font-semibold text-[#35313B]">Tracked International Standard</div>
                    <div className="text-[10px] text-[#77717D]">5-8 business days · Fully Insured</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#35313B]">
                  {baseShippingUSD === 0 ? 'FREE' : formatPrice(baseShippingUSD)}
                </span>
              </label>

              <label
                onClick={() => setShippingOption('express')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  shippingOption === 'express'
                    ? 'border-[#35313B] bg-[#FFFDF7]'
                    : 'border-[#D8C8F0]/60 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#35313B]" />
                  <div>
                    <div className="text-xs font-semibold text-[#35313B]">Express Courier (DHL/FedEx)</div>
                    <div className="text-[10px] text-[#77717D]">2-4 business days · White-Glove</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#35313B]">
                  {formatPrice(baseShippingUSD + 40)}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
            <h2 className="font-serif-title text-xl font-bold text-[#35313B]">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. ARTORA10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0] uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EAE2F5] hover:bg-[#D8C8F0] text-[#35313B] text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-[11px] text-rose-600">{promoError}</p>
              )}
              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    {appliedPromo.code} ({appliedPromo.discountPercent}% off applied)
                  </span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-xs text-[#77717D] hover:text-[#35313B] underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Line items */}
            <div className="pt-2 border-t border-[#EAE2F5] space-y-2 text-xs text-[#77717D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#35313B] font-semibold">{formatPrice(subtotalUSD)}</span>
              </div>

              {discountUSD > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Artisan Promo Discount</span>
                  <span className="font-mono font-semibold">-{formatPrice(discountUSD)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>International Delivery</span>
                <span className="font-mono text-[#35313B]">
                  {shippingFeeUSD === 0 ? 'FREE' : formatPrice(shippingFeeUSD)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Import VAT / Taxes (5%)</span>
                <span className="font-mono text-[#35313B]">{formatPrice(taxUSD)}</span>
              </div>

              <div className="pt-3 border-t border-[#EAE2F5] flex justify-between items-baseline text-base font-bold text-[#35313B]">
                <span>Total Amount ({selectedCurrency.code})</span>
                <span className="text-xl font-mono tabular-nums">{formatPrice(totalUSD)}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 rounded-xl bg-[#35313B] hover:bg-[#35313B]/90 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <span className="text-[11px] text-[#77717D] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                256-Bit SSL Encrypted International Checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

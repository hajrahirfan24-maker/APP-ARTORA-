import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Lock,
  Truck,
  Gift,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Address } from '../types';
import { ArtImage } from './ArtImage';

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'TR', name: 'Turkey' },
];

export const CheckoutView: React.FC = () => {
  const {
    cart,
    user,
    appliedPromo,
    formatPrice,
    placeOrder,
    navigateTo,
    selectedCurrency,
  } = useMarketplace();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[#77717D]">Your cart is empty.</p>
        <button
          onClick={() => navigateTo('explore')}
          className="mt-4 px-4 py-2 bg-[#35313B] text-white text-xs rounded-xl"
        >
          Explore All Artworks
        </button>
      </div>
    );
  }

  // Pre-fill with user default address or blank
  const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];

  const [fullName, setFullName] = useState(defaultAddr?.fullName || user.name);
  const [email, setEmail] = useState(user.email);
  const [street1, setStreet1] = useState(defaultAddr?.street1 || '');
  const [street2, setStreet2] = useState(defaultAddr?.street2 || '');
  const [city, setCity] = useState(defaultAddr?.city || '');
  const [stateProvince, setStateProvince] = useState(defaultAddr?.stateProvince || '');
  const [postalCode, setPostalCode] = useState(defaultAddr?.postalCode || '');
  const [country, setCountry] = useState(defaultAddr?.country || 'United States');
  const [phone, setPhone] = useState(defaultAddr?.phone || '+1 555-0192');

  // Gift message
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'wire' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('389');
  const [cardName, setCardName] = useState(user.name);

  const [isProcessing, setIsProcessing] = useState(false);

  // Financial calculations
  const subtotalUSD = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountUSD = appliedPromo ? (subtotalUSD * appliedPromo.discountPercent) / 100 : 0;
  const shippingFeeUSD = subtotalUSD > 500 ? 0 : 25;
  const taxUSD = (subtotalUSD - discountUSD) * 0.05;
  const totalUSD = subtotalUSD - discountUSD + shippingFeeUSD + taxUSD;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const shippingAddress: Address = {
      id: `addr-${Date.now()}`,
      fullName,
      street1,
      street2,
      city,
      stateProvince,
      postalCode,
      country,
      countryCode: COUNTRIES.find((c) => c.name === country)?.code || 'US',
      phone,
    };

    setTimeout(() => {
      setIsProcessing(false);
      placeOrder({
        customerName: fullName,
        customerEmail: email,
        shippingAddress,
        items: cart,
        subtotal: subtotalUSD,
        shippingFee: shippingFeeUSD,
        tax: taxUSD,
        discount: discountUSD,
        total: totalUSD,
        currency: selectedCurrency.code,
        status: 'confirmed',
        paymentMethod,
        paymentLast4: paymentMethod === 'card' ? '4242' : undefined,
        estimatedDelivery: 'November 14, 2026',
        giftMessage: isGift ? giftNote : undefined,
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-16 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigateTo('cart')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#77717D] hover:text-[#35313B] transition-colors cursor-pointer mb-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shopping Bag</span>
        </button>
        <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#35313B]">
          Secure Checkout
        </h1>
        <p className="text-xs text-[#77717D] mt-0.5">
          Encrypted international payment & climate-controlled art delivery
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Shipping, Packaging & Payment */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Customer & Delivery Address */}
          <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#35313B] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#35313B]" />
              <span>1. Delivery Destination</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-1">Email for Courier Tracking</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#35313B] block mb-1">Country / Region</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#35313B] block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="House number, street name"
                  value={street1}
                  onChange={(e) => setStreet1(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#35313B] block mb-1">Apartment, Suite, Unit (Optional)</label>
                <input
                  type="text"
                  placeholder="Apt 4B, Studio 12"
                  value={street2}
                  onChange={(e) => setStreet2(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-1">State / Province / Emirate</label>
                <input
                  type="text"
                  required
                  value={stateProvince}
                  onChange={(e) => setStateProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-1">Postal / ZIP Code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#35313B] block mb-1">Contact Phone (for Courier Handover)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Complimentary Gift Inscription Option */}
          <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isGift}
                onChange={(e) => setIsGift(e.target.checked)}
                className="w-4 h-4 rounded-md accent-[#35313B]"
              />
              <span className="text-xs font-bold text-[#35313B] flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-[#35313B]" />
                This is a gift — Include a complimentary handwritten artisan note
              </span>
            </label>

            {isGift && (
              <div className="pt-2 animate-in fade-in duration-150">
                <textarea
                  rows={2}
                  placeholder="Enter your personal dedication to be handwritten on deckled cotton paper..."
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full p-3 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                />
              </div>
            )}
          </div>

          {/* Section 3: Secure Payment Method */}
          <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#35313B] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#35313B]" />
                <span>2. Payment Architecture</span>
              </h2>
              <span className="text-[11px] text-[#77717D] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                PCI-DSS Level 1 Compliant Tokenization
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-[#35313B] bg-[#FFFDF7] text-[#35313B]'
                    : 'border-[#D8C8F0]/60 bg-white text-[#77717D]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                  paymentMethod === 'wallet'
                    ? 'border-[#35313B] bg-[#FFFDF7] text-[#35313B]'
                    : 'border-[#D8C8F0]/60 bg-white text-[#77717D]'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Digital Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wire')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                  paymentMethod === 'wire'
                    ? 'border-[#35313B] bg-[#FFFDF7] text-[#35313B]'
                    : 'border-[#D8C8F0]/60 bg-white text-[#77717D]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Bank Wire (Art)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                  paymentMethod === 'cod'
                    ? 'border-[#35313B] bg-[#FFFDF7] text-[#35313B]'
                    : 'border-[#D8C8F0]/60 bg-white text-[#77717D]'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Payment Fields */}
            {paymentMethod === 'card' && (
              <div className="pt-2 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#35313B] block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-mono border border-[#D8C8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C8F0]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#35313B] block mb-1">Expiry</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-mono border border-[#D8C8F0] rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#35313B] block mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="3 digits"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-mono border border-[#D8C8F0] rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-[#35313B] block mb-1">Cardholder</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#D8C8F0] rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="p-4 rounded-xl bg-[#EAE2F5]/40 text-xs text-[#35313B] text-center space-y-1">
                <p className="font-semibold">Apple Pay / Google Pay Instant Checkout</p>
                <p className="text-[11px] text-[#77717D]">
                  Biometric authorization will be initiated when you click Confirm Order.
                </p>
              </div>
            )}

            {paymentMethod === 'wire' && (
              <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#D8C8F0] text-xs text-[#77717D] space-y-1">
                <p className="font-semibold text-[#35313B]">Direct Artisan Escrow Wire Transfer</p>
                <p className="text-[11px]">
                  For high-value artwork commissions over $1,000. Our escrow bureau will generate bespoke SWIFT/IBAN transfer coordinates on the confirmation receipt.
                </p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#D8C8F0] text-xs text-[#77717D] space-y-1">
                <p className="font-semibold text-[#35313B]">Cash on Delivery (COD) Authorized</p>
                <p className="text-[11px]">
                  Available for domestic UAE and Saudi Arabia deliveries. Payment is collected via courier POS or cash upon physical artwork inspection.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary & Confirm CTA */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-4">
            <h2 className="font-serif-title text-xl font-bold text-[#35313B]">
              Order Summary ({cart.length} items)
            </h2>

            {/* Thumbnail preview list */}
            <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <ArtImage
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fallbackTitle={item.product.title}
                    className="w-12 h-12 rounded-lg object-cover border border-[#D8C8F0]/60 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#35313B] truncate">{item.product.title}</p>
                    <p className="text-[11px] text-[#77717D]">
                      Qty: {item.quantity} · {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-[#35313B] shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div className="pt-3 border-t border-[#EAE2F5] space-y-2 text-xs text-[#77717D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#35313B]">{formatPrice(subtotalUSD)}</span>
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
                <span>Import VAT / Customs (5%)</span>
                <span className="font-mono text-[#35313B]">{formatPrice(taxUSD)}</span>
              </div>
              <div className="pt-3 border-t border-[#EAE2F5] flex justify-between items-baseline text-base font-bold text-[#35313B]">
                <span>Total Payment</span>
                <span className="text-xl font-mono tabular-nums">{formatPrice(totalUSD)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-[#35313B] hover:bg-[#35313B]/90 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-70"
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Complete Order</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-[#77717D]">
              By confirming your purchase, you agree to ARTORA's international collector terms and 14-day authenticity guarantee.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

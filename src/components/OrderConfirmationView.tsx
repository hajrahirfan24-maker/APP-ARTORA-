import React from 'react';
import {
  CheckCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ArtImage } from './ArtImage';

export const OrderConfirmationView: React.FC = () => {
  const { selectedOrder, navigateTo, formatPrice } = useMarketplace();

  if (!selectedOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[#77717D]">No recent order found.</p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-4 py-2 bg-[#35313B] text-white text-xs rounded-xl"
        >
          Return to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-16 space-y-8">
      {/* Success Hero Card */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#EAE2F5]/60 to-[#FFFDF7] border border-[#D8C8F0] shadow-xs space-y-4">
        <div className="w-16 h-16 rounded-full bg-white border border-[#D8C8F0] flex items-center justify-center mx-auto text-emerald-700 shadow-xs">
          <CheckCircle className="w-8 h-8 fill-emerald-100" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#77717D]">
            Order Successfully Placed
          </span>
          <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#35313B] mt-1">
            Thank you, {selectedOrder.customerName}!
          </h1>
          <p className="text-xs sm:text-sm text-[#77717D] mt-2 max-w-md mx-auto">
            Your payment has been verified. Our master artisans have received your commission and will prepare your authentic pieces.
          </p>
        </div>

        {/* Order Identifier Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D8C8F0] text-xs">
            <span className="text-[#77717D]">Order Number: </span>
            <span className="font-mono font-bold text-[#35313B]">{selectedOrder.orderNumber}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D8C8F0] text-xs">
            <span className="text-[#77717D]">Tracking Number: </span>
            <span className="font-mono font-bold text-[#35313B]">{selectedOrder.trackingNumber}</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigateTo('order-tracking', { order: selectedOrder })}
            className="px-6 py-3 rounded-xl bg-[#35313B] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#35313B]/90 transition-colors cursor-pointer shadow-xs"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Timeline</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="px-5 py-3 rounded-xl bg-white border border-[#D8C8F0] text-[#35313B] text-xs font-semibold hover:bg-[#EAE2F5] transition-colors cursor-pointer"
          >
            Continue Browsing Artworks
          </button>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs space-y-6">
        <h2 className="font-serif-title text-xl font-bold text-[#35313B]">
          Order Breakdown & Delivery Details
        </h2>

        {/* Destination & Carrier Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#EAE2F5] text-xs">
          <div>
            <span className="font-bold uppercase tracking-wider text-[#77717D] block mb-2">
              Delivery Destination
            </span>
            <p className="font-semibold text-[#35313B]">{selectedOrder.shippingAddress.fullName}</p>
            <p className="text-[#77717D]">{selectedOrder.shippingAddress.street1}</p>
            {selectedOrder.shippingAddress.street2 && (
              <p className="text-[#77717D]">{selectedOrder.shippingAddress.street2}</p>
            )}
            <p className="text-[#77717D]">
              {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.stateProvince} {selectedOrder.shippingAddress.postalCode}
            </p>
            <p className="text-[#77717D]">{selectedOrder.shippingAddress.country}</p>
            <p className="text-[#77717D] mt-1">{selectedOrder.shippingAddress.phone}</p>
          </div>

          <div>
            <span className="font-bold uppercase tracking-wider text-[#77717D] block mb-2">
              Logistics & Courier
            </span>
            <p className="font-semibold text-[#35313B]">{selectedOrder.carrier}</p>
            <p className="text-[#77717D] mt-1">
              Estimated Delivery: <strong>{selectedOrder.estimatedDelivery}</strong>
            </p>
            <p className="text-[#77717D] mt-2 flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Climate-isolated art packaging with tamper-evident seal
            </p>
          </div>
        </div>

        {/* Itemized list */}
        <div className="space-y-3">
          <span className="font-bold uppercase tracking-wider text-[#77717D] text-xs block">
            Purchased Creations ({selectedOrder.items.length})
          </span>
          {selectedOrder.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#FFFDF7] border border-[#D8C8F0]/40 text-xs"
            >
              <div className="flex items-center gap-3">
                <ArtImage
                  src={item.product.images[0]}
                  alt={item.product.title}
                  fallbackTitle={item.product.title}
                  className="w-14 h-14 rounded-lg object-cover border border-[#D8C8F0]/40"
                />
                <div>
                  <h4 className="font-semibold text-[#35313B]">{item.product.title}</h4>
                  <p className="text-[11px] text-[#77717D]">
                    Qty: {item.quantity} · {item.variation.framing || item.variation.albumCover || 'Original Artwork'}
                  </p>
                  {item.variation.customNote && (
                    <p className="text-[10px] text-purple-700 italic">
                      Custom Inscription: "{item.variation.customNote}"
                    </p>
                  )}
                </div>
              </div>
              <span className="font-mono font-bold text-[#35313B]">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Financial Summary */}
        <div className="pt-4 border-t border-[#EAE2F5] space-y-1.5 text-xs text-[#77717D] max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono text-[#35313B]">{formatPrice(selectedOrder.subtotal)}</span>
          </div>
          {selectedOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Discount</span>
              <span className="font-mono">-{formatPrice(selectedOrder.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-mono text-[#35313B]">
              {selectedOrder.shippingFee === 0 ? 'FREE' : formatPrice(selectedOrder.shippingFee)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & Duties</span>
            <span className="font-mono text-[#35313B]">{formatPrice(selectedOrder.tax)}</span>
          </div>
          <div className="pt-2 border-t border-[#EAE2F5] flex justify-between text-sm font-bold text-[#35313B]">
            <span>Paid Total</span>
            <span className="font-mono">{formatPrice(selectedOrder.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  ArrowLeft,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MapPin,
  Package,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { OrderStatus } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { selectedOrder, goBack, updateOrderStatus, formatPrice } = useMarketplace();

  if (!selectedOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[#77717D]">No active order selected for tracking.</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-[#35313B] text-white text-xs rounded-xl"
        >
          Return to Orders
        </button>
      </div>
    );
  }

  const statusProgression: OrderStatus[] = [
    'confirmed',
    'artisan_crafting',
    'quality_check',
    'shipped',
    'out_for_delivery',
    'delivered',
  ];

  const currentStatusIndex = statusProgression.indexOf(selectedOrder.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-16 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#77717D] hover:text-[#35313B] transition-colors cursor-pointer mb-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#35313B]">
              Live Order & Transit Tracking
            </h1>
            <p className="text-xs text-[#77717D] mt-0.5">
              Order #{selectedOrder.orderNumber} · Carrier: {selectedOrder.carrier}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#77717D]">Simulate Milestone:</span>
            <select
              value={selectedOrder.status}
              onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}
              className="px-3 py-1.5 rounded-xl border border-[#D8C8F0] bg-white text-xs font-semibold text-[#35313B] cursor-pointer"
            >
              <option value="confirmed">1. Confirmed</option>
              <option value="artisan_crafting">2. Artisan Crafting</option>
              <option value="quality_check">3. Quality Inspection</option>
              <option value="shipped">4. Dispatched</option>
              <option value="out_for_delivery">5. Out for Delivery</option>
              <option value="delivered">6. Delivered Safely</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courier Status Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#EAE2F5] text-xs">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#77717D] block mb-1">
              Tracking Number
            </span>
            <span className="font-mono font-bold text-sm text-[#35313B]">
              {selectedOrder.trackingNumber}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#77717D] block mb-1">
              Estimated Delivery
            </span>
            <span className="font-bold text-sm text-[#35313B]">
              {selectedOrder.estimatedDelivery}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#77717D] block mb-1">
              Current Status
            </span>
            <span className="font-bold text-xs uppercase tracking-wide px-2.5 py-1 rounded-md bg-[#EAE2F5] text-[#35313B]">
              {selectedOrder.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="pt-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#35313B] block mb-4">
            Provenance & Transit Milestones
          </span>

          <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EAE2F5]">
            {selectedOrder.timeline.map((step, idx) => {
              const isPastOrCurrent = idx <= currentStatusIndex;
              return (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Step icon dot */}
                  <div
                    className={`absolute -left-6 top-0 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 bg-white transition-colors ${
                      isPastOrCurrent
                        ? 'border-[#35313B] bg-[#35313B] text-white'
                        : 'border-[#D8C8F0] text-transparent'
                    }`}
                  >
                    {isPastOrCurrent && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4
                        className={`text-xs font-bold ${
                          isPastOrCurrent ? 'text-[#35313B]' : 'text-[#77717D]'
                        }`}
                      >
                        {step.label}
                      </h4>
                      <span className="text-[11px] text-[#77717D] font-mono">{step.timestamp}</span>
                    </div>

                    <p className="text-xs text-[#77717D] mt-0.5 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#77717D]">
                      <MapPin className="w-3 h-3" />
                      <span>{step.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Package Items & Address Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] text-xs space-y-3">
          <h3 className="font-serif-title text-sm font-bold text-[#35313B] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#35313B]" />
            <span>Shipment Contents ({selectedOrder.items.length})</span>
          </h3>
          <div className="space-y-2">
            {selectedOrder.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-[#EAE2F5] last:border-b-0">
                <span className="font-medium text-[#35313B] truncate max-w-[200px]">{item.product.title}</span>
                <span className="font-mono text-[#77717D]">Qty: {item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#D8C8F0] text-xs space-y-3">
          <h3 className="font-serif-title text-sm font-bold text-[#35313B] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#35313B]" />
            <span>Delivery Destination</span>
          </h3>
          <p className="font-semibold text-[#35313B]">{selectedOrder.shippingAddress.fullName}</p>
          <p className="text-[#77717D]">{selectedOrder.shippingAddress.street1}</p>
          <p className="text-[#77717D]">
            {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.country}
          </p>
          <p className="text-[#77717D]">{selectedOrder.shippingAddress.phone}</p>
        </div>
      </div>
    </div>
  );
};

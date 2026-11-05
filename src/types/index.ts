export type CategoryId =
  | 'paintings'
  | 'islamic-calligraphy'
  | 'arabic-calligraphy'
  | 'modern-calligraphy'
  | 'art-albums'
  | 'photo-albums'
  | 'handmade-art'
  | 'canvas-art'
  | 'wall-decor'
  | 'personalized-gifts'
  | 'artistic-stationery'
  | 'creative-accessories'
  | 'decorative-art'
  | 'custom-artwork';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  itemCount: number;
  featuredImage: string;
}

export interface Review {
  id: string;
  author: string;
  country: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  productVariant?: string;
}

export interface ArtisanSeller {
  id: string;
  name: string;
  storeName: string;
  avatar: string;
  bio: string;
  location: string;
  countryCode: string;
  verified: boolean;
  rating: number;
  salesCount: number;
  joinedYear: number;
  responseRate: string;
  specialty: string;
}

export interface ProductVariationOptions {
  framing?: string[];
  dimensions?: string[];
  materials?: string[];
  albumSizes?: string[];
  albumPages?: number[];
  albumCovers?: string[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  categoryId: CategoryId;
  categoryName: string;
  price: number; // Base USD
  compareAtPrice?: number;
  images: string[];
  description: string;
  artisan: ArtisanSeller;
  rating: number;
  reviewCount: number;
  stock: number;
  isBestseller?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isCustomizable?: boolean;
  customizationPrompt?: string;
  variations: ProductVariationOptions;
  materialsText: string;
  dimensionsText: string;
  shippingDays: string;
  weightKg: number;
  tags: string[];
  reviews: Review[];
}

export interface SelectedVariation {
  framing?: string;
  dimensions?: string;
  material?: string;
  albumSize?: string;
  albumPages?: number;
  albumCover?: string;
  customNote?: string;
}

export interface CartItem {
  id: string; // unique item entry id (productId + JSON.stringify(variation))
  productId: string;
  product: Product;
  quantity: number;
  variation: SelectedVariation;
  unitPrice: number;
  addedAt: number;
}

export interface Address {
  id: string;
  isDefault?: boolean;
  fullName: string;
  street1: string;
  street2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  countryCode: string;
  phone: string;
}

export type OrderStatus =
  | 'confirmed'
  | 'artisan_crafting'
  | 'quality_check'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface TrackingEvent {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  location: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: 'card' | 'wallet' | 'wire' | 'cod';
  paymentLast4?: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  timeline: TrackingEvent[];
  giftMessage?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'seller' | 'admin';
  avatar: string;
  ageVerified: boolean;
  addresses: Address[];
  wishlistIds: string[];
  sellerProfile?: ArtisanSeller;
  notificationPrefs: {
    orderUpdates: boolean;
    artisanSpotlights: boolean;
    promotions: boolean;
  };
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rateFromUSD: number;
  name: string;
}

export interface CustomerInquiry {
  id: string;
  productId: string;
  productTitle: string;
  customerName: string;
  customerEmail: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'resolved';
  reply?: string;
  repliedAt?: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  minSpendUSD: number;
  description: string;
  active: boolean;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  UserAccount,
  CurrencyConfig,
  CustomerInquiry,
  PromoCode,
  SelectedVariation,
  OrderStatus,
  Review,
  ArtisanSeller,
} from '../types';
import { PRODUCTS, CATEGORIES, CURRENCIES, INITIAL_ORDERS, PROMO_CODES, ARTISANS } from '../data/mockData';
import { ARTISAN_AVATARS } from '../data/artVisuals';

export type NavigationTab =
  | 'home'
  | 'explore'
  | 'product-detail'
  | 'category-view'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'order-tracking'
  | 'profile'
  | 'wishlist'
  | 'seller-dashboard'
  | 'admin-dashboard'
  | 'artist-profile';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface MarketplaceContextType {
  activeTab: NavigationTab;
  tabHistory: NavigationTab[];
  selectedProduct: Product | null;
  selectedCategory: Category | null;
  selectedArtist: ArtisanSeller | null;
  selectedOrder: Order | null;
  searchQuery: string;
  selectedCurrency: CurrencyConfig;
  cart: CartItem[];
  wishlist: string[];
  user: UserAccount;
  products: Product[];
  orders: Order[];
  appliedPromo: PromoCode | null;
  inquiries: CustomerInquiry[];
  toasts: ToastNotification[];

  // Navigation
  navigateTo: (
    tab: NavigationTab,
    payload?: {
      product?: Product;
      category?: Category;
      artist?: ArtisanSeller;
      order?: Order;
    }
  ) => void;
  goBack: () => void;
  setSearchQuery: (query: string) => void;

  // Cart & Pricing
  addToCart: (product: Product, quantity: number, variation?: SelectedVariation) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  setCurrency: (currencyCode: string) => void;
  formatPrice: (priceInUSD: number) => string;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  placeOrder: (orderPayload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline' | 'trackingNumber' | 'carrier'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Products & Sellers
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  submitReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  submitInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => void;
  replyInquiry: (inquiryId: string, reply: string) => void;

  // User & Roles
  switchRole: (role: 'customer' | 'seller' | 'admin') => void;
  updateUserProfile: (profile: Partial<UserAccount>) => void;
  updateSellerProfile: (profile: Partial<ArtisanSeller>) => void;
  addAddress: (address: Omit<UserAccount['addresses'][0], 'id'>) => void;
  removeToast: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [tabHistory, setTabHistory] = useState<NavigationTab[]>(['home']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(CATEGORIES[0]);
  const [selectedArtist, setSelectedArtist] = useState<ArtisanSeller | null>(ARTISANS[0]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyConfig>(CURRENCIES[0]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Persistent products with unique imagery
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('artora_products_v4');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Persistent cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('artora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('artora_wishlist');
      return saved ? JSON.parse(saved) : ['prod-islamic-01', 'prod-album-01'];
    } catch {
      return ['prod-islamic-01', 'prod-album-01'];
    }
  });

  // Persistent orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('artora_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Customer Inquiries
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([
    {
      id: 'inq-1',
      productId: 'prod-album-01',
      productTitle: 'Heirloom Handbound Art Album in Lilac Linen',
      customerName: 'Sophie Bennett',
      customerEmail: 'sophie.b@gmail.com',
      message: 'Can the gold foil debossing include our family crest if I provide vector artwork?',
      createdAt: '2026-11-04T09:12:00Z',
      status: 'pending',
    },
    {
      id: 'inq-2',
      productId: 'prod-paint-01',
      productTitle: 'Ethereal Dawn Floral Harmony',
      customerName: 'David Lee',
      customerEmail: 'david.lee@outlook.com',
      message: 'Is it possible to request natural white oak framing instead of brass?',
      createdAt: '2026-11-02T16:45:00Z',
      status: 'resolved',
      reply: 'Yes, absolutely! The natural white oak floater frame is available as a dropdown option on checkout.',
      repliedAt: '2026-11-02T18:20:00Z',
    },
  ]);

  // Active User Profile
  const [user, setUser] = useState<UserAccount>({
    id: 'usr-10492',
    name: 'Hajrah Irfan',
    email: 'hajrahirfan24@gmail.com',
    phone: '+971 50 123 4567',
    role: 'customer',
    avatar: ARTISAN_AVATARS.customer,
    ageVerified: true,
    addresses: [
      {
        id: 'addr-01',
        isDefault: true,
        fullName: 'Hajrah Irfan',
        street1: '45 Al-Bahar Avenue, Suite 12',
        city: 'Dubai',
        stateProvince: 'Dubai',
        postalCode: '00000',
        country: 'United Arab Emirates',
        countryCode: 'AE',
        phone: '+971 50 123 4567',
      },
      {
        id: 'addr-02',
        isDefault: false,
        fullName: 'Hajrah Irfan',
        street1: '14 Mayfair Gardens',
        city: 'London',
        stateProvince: 'Greater London',
        postalCode: 'W1K 6TP',
        country: 'United Kingdom',
        countryCode: 'GB',
        phone: '+44 20 7946 0912',
      },
    ],
    wishlistIds: ['prod-islamic-01', 'prod-album-01'],
    sellerProfile: ARTISANS[0],
    notificationPrefs: {
      orderUpdates: true,
      artisanSpotlights: true,
      promotions: false,
    },
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('artora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('artora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('artora_products_v4', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('artora_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo: MarketplaceContextType['navigateTo'] = (tab, payload) => {
    if (payload?.product) setSelectedProduct(payload.product);
    if (payload?.category) setSelectedCategory(payload.category);
    if (payload?.artist) setSelectedArtist(payload.artist);
    if (payload?.order) setSelectedOrder(payload.order);

    setTabHistory((prev) => [...prev, tab]);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop();
      const previousTab = newHistory[newHistory.length - 1];
      setTabHistory(newHistory);
      setActiveTab(previousTab);
    } else {
      setActiveTab('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity: number, variation?: SelectedVariation) => {
    const varKey = variation ? JSON.stringify(variation) : '{}';
    const itemId = `${product.id}-${varKey}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          quantity,
          variation: variation || {},
          unitPrice: product.price,
          addedAt: Date.now(),
        },
      ];
    });

    showToast(`Added "${product.title}" to your shopping bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your saved wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const setCurrency = (currencyCode: string) => {
    const found = CURRENCIES.find((c) => c.code === currencyCode);
    if (found) {
      setSelectedCurrency(found);
      showToast(`Marketplace currency updated to ${found.code} (${found.symbol})`, 'info');
    }
  };

  const formatPrice = (priceInUSD: number) => {
    const converted = priceInUSD * selectedCurrency.rateFromUSD;
    if (selectedCurrency.code === 'JPY') {
      return `${selectedCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${selectedCurrency.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const applyPromo = (code: string) => {
    const found = PROMO_CODES.find(
      (p) => p.code.toUpperCase() === code.trim().toUpperCase() && p.active
    );
    if (!found) {
      return { success: false, message: 'Invalid or expired promotional code.' };
    }
    setAppliedPromo(found);
    showToast(`Promo code "${found.code}" applied! (${found.discountPercent}% off)`, 'success');
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const placeOrder: MarketplaceContextType['placeOrder'] = (orderPayload) => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `ART-${randomSuffix}`;
    const newOrder: Order = {
      ...orderPayload,
      id: `ord-${randomSuffix}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      trackingNumber: `DHL-EXP-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      carrier: 'DHL Express International Worldwide',
      timeline: [
        {
          status: 'confirmed',
          label: 'Order Confirmed',
          description: 'Payment authorized and receipt dispatched.',
          timestamp: 'Just now',
          location: 'Global Hub, Zurich',
          completed: true,
        },
        {
          status: 'artisan_crafting',
          label: 'Artisan Studio Notification',
          description: 'Artisan has been commissioned for your artwork preparation.',
          timestamp: 'Pending artisan check-in',
          location: 'Artisan Studio Atelier',
          completed: false,
        },
        {
          status: 'quality_check',
          label: 'Curator Authenticity & Quality Inspection',
          description: 'Physical inspection and signature of authenticity certificate.',
          timestamp: 'Scheduled',
          location: 'Regional Inspection Bureau',
          completed: false,
        },
        {
          status: 'shipped',
          label: 'Dispatched with Art Courier',
          description: 'Climate-controlled international art transit.',
          timestamp: 'Estimated 3-5 business days',
          location: 'International Hub',
          completed: false,
        },
        {
          status: 'out_for_delivery',
          label: 'Out for Courier Delivery',
          description: 'Direct white-glove delivery to your door.',
          timestamp: 'Estimated arrival',
          location: orderPayload.shippingAddress.city,
          completed: false,
        },
        {
          status: 'delivered',
          label: 'Delivered Safely',
          description: 'Package delivered and signed by customer.',
          timestamp: 'Estimated arrival',
          location: orderPayload.shippingAddress.city,
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setSelectedOrder(newOrder);
    navigateTo('order-confirmation', { order: newOrder });
    showToast(`Order #${newOrder.orderNumber} successfully confirmed!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const updatedTimeline = ord.timeline.map((step) => {
          if (step.status === status) {
            return {
              ...step,
              completed: true,
              timestamp: 'Updated ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
          }
          return step;
        });
        return { ...ord, status, timeline: updatedTimeline };
      })
    );
    showToast(`Order status updated to ${status.replace('_', ' ')}`, 'info');
  };

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => {
    const id = `prod-custom-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id,
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Artwork "${newProduct.title}" added to marketplace catalog!`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Artwork "${updated.title}" updated successfully`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog', 'info');
  };

  const submitReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const newReviews = [newReview, ...p.reviews];
        const avg = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
        return {
          ...p,
          reviews: newReviews,
          reviewCount: newReviews.length,
          rating: Number(avg.toFixed(1)),
        };
      })
    );
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const submitInquiry = (inquiryData: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: CustomerInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setInquiries((prev) => [newInq, ...prev]);
    showToast('Your custom inquiry has been sent to the artisan!', 'success');
  };

  const replyInquiry = (inquiryId: string, reply: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId
          ? { ...inq, status: 'resolved', reply, repliedAt: new Date().toISOString() }
          : inq
      )
    );
    showToast('Response sent to customer', 'success');
  };

  const switchRole = (role: 'customer' | 'seller' | 'admin') => {
    setUser((prev) => ({ ...prev, role }));
    if (role === 'seller') {
      navigateTo('seller-dashboard');
      showToast('Switched to Artisan Seller Portal', 'info');
    } else if (role === 'admin') {
      navigateTo('admin-dashboard');
      showToast('Switched to Administrator Console', 'info');
    } else {
      navigateTo('home');
      showToast('Switched to Customer Shopping Experience', 'info');
    }
  };

  const updateUserProfile = (profileUpdates: Partial<UserAccount>) => {
    setUser((prev) => ({ ...prev, ...profileUpdates }));
    showToast('Profile settings saved successfully', 'success');
  };

  const updateSellerProfile = (sellerUpdates: Partial<ArtisanSeller>) => {
    setUser((prev) => {
      const currentSeller = prev.sellerProfile || ARTISANS[0];
      const updatedSeller: ArtisanSeller = {
        ...currentSeller,
        ...sellerUpdates,
      };
      return {
        ...prev,
        name: sellerUpdates.name || prev.name,
        avatar: sellerUpdates.avatar || prev.avatar,
        sellerProfile: updatedSeller,
      };
    });

    // Also update any listings belonging to this seller
    setProducts((prev) =>
      prev.map((p) => {
        const sellerId = user.sellerProfile?.id || ARTISANS[0].id;
        if (p.artisan.id === sellerId || p.artisan.name === (user.sellerProfile?.name || ARTISANS[0].name)) {
          return {
            ...p,
            artisan: {
              ...p.artisan,
              ...sellerUpdates,
            },
          };
        }
        return p;
      })
    );

    showToast('Artisan atelier profile updated successfully!', 'success');
  };

  const addAddress = (newAddr: Omit<UserAccount['addresses'][0], 'id'>) => {
    const id = `addr-${Date.now()}`;
    setUser((prev) => ({
      ...prev,
      addresses: [...prev.addresses, { ...newAddr, id }],
    }));
    showToast('New shipping address saved', 'success');
  };

  return (
    <MarketplaceContext.Provider
      value={{
        activeTab,
        tabHistory,
        selectedProduct,
        selectedCategory,
        selectedArtist,
        selectedOrder,
        searchQuery,
        selectedCurrency,
        cart,
        wishlist,
        user,
        products,
        orders,
        appliedPromo,
        inquiries,
        toasts,
        navigateTo,
        goBack,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        setCurrency,
        formatPrice,
        applyPromo,
        removePromo,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        submitReview,
        submitInquiry,
        replyInquiry,
        switchRole,
        updateUserProfile,
        updateSellerProfile,
        addAddress,
        removeToast,
        showToast,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};

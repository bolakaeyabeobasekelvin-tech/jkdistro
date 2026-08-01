'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  variantTitle?: string;
  slug: string;
}

export type ShippingMode = 'standard' | 'advanced' | 'priority';

export interface ShippingOption {
  id: ShippingMode;
  name: string;
  duration: string;
  price: number;
  description: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    duration: '3-5 Days',
    price: 15,
    description: 'Reliable, 100% odor-proof vacuum-sealed ground shipping nationwide.',
  },
  {
    id: 'advanced',
    name: 'Advanced Shipping',
    duration: '2 Days',
    price: 25,
    description: 'Expedited air express delivery with priority sorting and stealth handling.',
  },
  {
    id: 'priority',
    name: 'Priority Shipping',
    duration: '24 Hours',
    price: 50,
    description: 'Next-day rush dispatch and overnight delivery for urgent orders.',
  },
];

export type PaymentMethod = 'apple-pay' | 'bitcoin' | 'cash-app' | 'chime' | 'zelle';

export interface PaymentOption {
  id: PaymentMethod;
  name: string;
  iconName: string;
  description: string;
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    iconName: 'Apple',
    description: 'Fast & secure contactless transfer. Details sent by sales team after order receipt.',
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin (BTC)',
    iconName: 'Coins',
    description: 'Anonymous crypto payment with discount eligibility. Wallet address provided upon checkout.',
  },
  {
    id: 'cash-app',
    name: 'Cash App',
    iconName: 'DollarSign',
    description: 'Instant peer-to-peer transfer. $Cashtag tag provided by sales rep after order creation.',
  },
  {
    id: 'chime',
    name: 'Chime',
    iconName: 'CreditCard',
    description: 'Quick bank transfer via Chime Pay Anyone. Payment link sent via SMS/Email.',
  },
  {
    id: 'zelle',
    name: 'Zelle',
    iconName: 'Zap',
    description: 'Direct bank transfer with zero fees. Recipient email/phone issued by sales team.',
  },
];

export const MIN_ORDER_AMOUNT = 150;

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  minOrderAmount: number;
  isMinOrderMet: boolean;
  remainingForMinOrder: number;
  shippingMethod: ShippingMode;
  setShippingMethod: (method: ShippingMode) => void;
  shippingCost: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('jkd_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<ShippingMode>('standard');

  // Save to localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem('jkd_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qty = newItem.quantity || 1;
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === newItem.id && i.variantTitle === newItem.variantTitle);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { ...newItem, quantity: qty }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const minOrderAmount = MIN_ORDER_AMOUNT;
  const isMinOrderMet = subtotal >= MIN_ORDER_AMOUNT;
  const remainingForMinOrder = Math.max(0, MIN_ORDER_AMOUNT - subtotal);

  const selectedShippingOption = SHIPPING_OPTIONS.find((s) => s.id === shippingMethod) || SHIPPING_OPTIONS[0];
  const shippingCost = selectedShippingOption.price;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        minOrderAmount,
        isMinOrderMet,
        remainingForMinOrder,
        shippingMethod,
        setShippingMethod,
        shippingCost,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

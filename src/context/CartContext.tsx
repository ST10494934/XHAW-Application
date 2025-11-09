// src/context/CartContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItemType } from '../types';

type CartContextType = {
  cart: CartItemType[];
  addToCart: (item: Omit<CartItemType, 'qty'>, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  count: number; // total quantity
  setQty: (id: string, qty: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  // Load cart on mount
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('cartItems');
        if (json) setCart(JSON.parse(json));
      } catch (e) {
        console.warn('Failed to load cart', e);
      }
    })();
  }, []);

  // Persist cart
  useEffect(() => {
    AsyncStorage.setItem('cartItems', JSON.stringify(cart)).catch(() => {});
  }, [cart]);

  const addToCart = (item: Omit<CartItemType, 'qty'>, qty = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(ci => ci.id === item.id);
      if (idx >= 0) {
        // increment qty
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const setQty = (id: string, qty: number) => {
    setCart(prev => {
      const copy = prev.map(i => (i.id === id ? { ...i, qty } : i)).filter(i => i.qty > 0);
      return copy;
    });
  };

  const clearCart = () => setCart([]);

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, subtotal, count, setQty }}>
      {children}
    </CartContext.Provider>
  );
};

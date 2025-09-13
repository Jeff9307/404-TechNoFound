'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
}

interface CartContextType {
  cart: Product[];
  loading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  // Podríamos añadir removeFromCart, updateQuantity, etc.
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setCart([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
      setCart([]); // Limpiar carrito en caso de error
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: number, quantity: number) => {
    if (!isAuthenticated || !token) {
      alert("Por favor, inicia sesión para añadir productos al carrito.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (res.ok) {
        // Refrescar el carrito para mostrar el nuevo item
        await fetchCart();
        alert("Producto añadido al carrito");
      } else {
        throw new Error("No se pudo añadir el producto");
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      alert("Error al añadir el producto al carrito.");
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

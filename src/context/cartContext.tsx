import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { itemCart } from '../types/mobileProductDetails';

// Define el tipo del contexto
interface CartContextType {
  cart: itemCart[];
  addToCart: (product: itemCart) => void;
  removeFromCart: (id: string) => void;
  getTotal: () => number;
}

// Crear el contexto con un valor predeterminado
const CartContext = createContext<CartContextType | undefined>(undefined);

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<itemCart[]>([]);

  // Cargar el carrito desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // Función para agregar al carrito
  const addToCart = (product: itemCart) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Función para eliminar del carrito
  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Función para calcular el total
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

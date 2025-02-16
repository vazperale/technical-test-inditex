// CartContext.tsx (sin exportaciones adicionales)
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { itemCart } from '../types/mobileProductDetails';
import { addToCart, removeFromCart, getTotal } from '../utils/cartUtils';  // Importa las funciones del archivo util

// Define el tipo del contexto
interface CartContextType {
  cart: itemCart[];
  addToCart: (product: itemCart) => void;
  removeFromCart: (id: string, color: string, storage: string) => void;
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
  const handleAddToCart = (product: itemCart) => {
    const updatedCart = addToCart(cart, product);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Función para eliminar del carrito
  const handleRemoveFromCart = (id: string, color: string, storage: string) => {
    const updatedCart = removeFromCart(cart, id, color, storage);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Función para calcular el total
  const handleGetTotal = () => {
    return getTotal(cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart: handleAddToCart, removeFromCart: handleRemoveFromCart, getTotal: handleGetTotal }}>
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

// cartUtils.ts

import { itemCart } from '../types/mobileProductDetails';

// Función para agregar al carrito
export const addToCart = (cart: itemCart[], product: itemCart): itemCart[] => {
  return [...cart, product];
};

// Función para eliminar del carrito
export const removeFromCart = (cart: itemCart[], id: string, color: string, storage: string): itemCart[] => {
  return cart.filter((item) => !(item.id === id && item.color.name === color && item.storage === storage));
};

// Función para calcular el total
export const getTotal = (cart: itemCart[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

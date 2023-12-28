import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  const agregarAlCarrito = (product) => {
    const newItem = { ...product, key: uuidv4() };
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  const eliminarDelCarrito = (key) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };

  const limpiarCarrito = () => {
    setCartItems([]);
  };

  const calcularCarrito = () => {
    return cartItems.reduce((acumulador, item) => acumulador + item.price, 0);
  };

  useEffect(() => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
  }, [cartItems, userId]);

  return (
    <CartContext.Provider value={{ userId, cartItems, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito, calcularCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

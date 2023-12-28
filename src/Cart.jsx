import React from 'react';
import { useCart } from './CartContext';
import { v4 as uuidv4 } from 'uuid';

export const Cart = () => {
  const { cartItems, eliminarDelCarrito, limpiarCarrito } = useCart();
  console.log(cartItems)

  return (
    <div>
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            
            <li key={item.key}>
              {item.title} ${item.price} - <button onClick={() => eliminarDelCarrito(item.key)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <div className="button-container2">
      <button onClick={limpiarCarrito}>Vaciar Carrito</button>
      </div>
    </div>
  );
};


import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartIndicator = () => {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  return (
    <div className="relative flex items-center space-x-1">
      <span className="text-white text-base">장바구니</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIndicator;
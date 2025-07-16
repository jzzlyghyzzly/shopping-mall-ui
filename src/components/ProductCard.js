import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col border border-gray-200">
      {/* 상품 이미지 */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/300x160/FF0000/FFFFFF?text=Image+Error`;
        }}
      />
      <div className="p-3 flex-grow flex flex-col justify-between">
        {/* 브랜드 */}
        <p className="text-gray-800 font-bold text-sm mb-1">{product.brand}</p>
        {/* 상품 이름/설명 */}
        <h3 className="text-gray-600 text-sm mb-2 leading-tight">{product.name}</h3>
        {/* 상품 가격 */}
        <p className="text-gray-900 font-semibold text-base mb-3">{product.price.toLocaleString()}원</p>
        {/* 담기 버튼 */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gray-800 text-white text-sm py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          담기
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
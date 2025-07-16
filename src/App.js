import React from 'react';
import { CartProvider } from './context/CartContext';
import products from './data/products';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 font-sans antialiased">
        <Header />
        <main className="container mx-auto py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-left">신발 상품 목록</h2>
          <p className="font-bold text-gray-600 text-left mb-6">현재 {products.length}개의 상품이 있습니다.</p>
          <ProductList products={products} />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
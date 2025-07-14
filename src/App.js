import React, { useState, createContext, useContext } from 'react';
// App.css는 Tailwind CSS를 주로 사용하므로 임포트하지 않습니다.

// -----------------------------------------------------------------------------
// 1. Mock 상품 데이터
// Figma 디자인 시안에 맞춰 임시 상품 데이터를 생성합니다.
// -----------------------------------------------------------------------------
const mockProducts = [
  {
    id: 1,
    brand: '브랜드A',
    name: '편안하고 착용감이 좋은 신발',
    price: 35000,
    imageUrl: 'https://placehold.co/300x300/F0F0F0/333333?text=Shoe+1', // 이미지 1
  },
  {
    id: 2,
    brand: '브랜드A',
    name: '힙한 컬러가 매력적인 신발',
    price: 25000,
    imageUrl: 'https://placehold.co/300x300/D0D0D0/333333?text=Shoe+2', // 이미지 2
  },
  {
    id: 3,
    brand: '브랜드B',
    name: '편안하고 착용감이 좋은 신발',
    price: 35000,
    imageUrl: 'https://placehold.co/300x300/C0C0C0/333333?text=Shoe+3', // 이미지 3
  },
  {
    id: 4,
    brand: '브랜드B',
    name: '힙한 컬러가 매력적인 신발',
    price: 35000,
    imageUrl: 'https://placehold.co/300x300/B0B0B0/333333?text=Shoe+4', // 이미지 4
  },
  {
    id: 5,
    brand: '브랜드C',
    name: '편안하고 착용감이 좋은 신발',
    price: 35000,
    imageUrl: 'https://placehold.co/300x300/A0A0A0/333333?text=Shoe+5', // 이미지 5
  },
  {
    id: 6,
    brand: '브랜드C',
    name: '힙한 컬러가 매력적인 신발',
    price: 35000,
    imageUrl: 'https://placehold.co/300x300/909090/333333?text=Shoe+6', // 이미지 6
  },
];

// -----------------------------------------------------------------------------
// 2. CartContext: 장바구니 상태 관리를 위한 Context API (기본 기능만 포함)
// -----------------------------------------------------------------------------
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// 3. ProductCard 컴포넌트: 개별 상품을 표시하는 카드 UI
// Figma 시안의 디자인에 맞춰 스타일을 조정했습니다.
// -----------------------------------------------------------------------------
const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col border border-gray-200">
      {/* 상품 이미지 */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover" // 이미지 높이 조정
        onError={(e) => {
          e.target.onerror = null; // 무한 루프 방지
          e.target.src = `https://placehold.co/300x160/FF0000/FFFFFF?text=Image+Error`; // 대체 이미지
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

// -----------------------------------------------------------------------------
// 4. ProductList 컴포넌트: 상품 목록을 2열 그리드 형태로 표시
// -----------------------------------------------------------------------------
const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 max-w-4xl mx-auto"> {/* 2열 그리드, 최대 너비 조정 */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// -----------------------------------------------------------------------------
// 5. CartIndicator 컴포넌트: 헤더에 장바구니 총 수량 표시
// -----------------------------------------------------------------------------
const CartIndicator = () => {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  return (
    <div className="relative">
      {/* 장바구니 아이콘 (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-white"
      >
        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.75 3.75 0 003.694 2.46l2.559.006c.426 0 .75.336.75.75s-.324.75-.75.75h-1.5a.75.75 0 000 1.5H15a.75.75 0 000-1.5h-.75a.75.75 0 000-1.5H9.75A3.75 3.75 0 016 15.75m12.75-7.5v-.75a.75.75 0 00-.75-.75H12a.75.75 0 00-.75.75v.75m0 0h.008v.008H12v-.008zm0 2.25h.008v.008H12v-.008zm0 2.25h.008v.008H12v-.008zm0 2.25h.008v.008H12v-.008z" />
      </svg>

      {/* 장바구니 수량 표시 */}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// 6. Header 컴포넌트: 웹사이트 상단 헤더
// -----------------------------------------------------------------------------
const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Shop</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">홈</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">상품</a></li>
            <li><CartIndicator /></li> {/* 장바구니 아이콘 및 수량 */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

// -----------------------------------------------------------------------------
// 7. App 컴포넌트: 메인 애플리케이션 컴포넌트
// -----------------------------------------------------------------------------
function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 font-sans antialiased">
        <Header /> {/* 헤더 컴포넌트 */}
        <main className="container mx-auto py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">신발 상품 목록</h2>
          <p className="text-gray-600 text-center mb-6">현재 {mockProducts.length}개의 상품이 있습니다.</p>
          <ProductList products={mockProducts} /> {/* 상품 목록 컴포넌트 */}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;

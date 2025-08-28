import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CardProvider } from './context/CardContext';
import GlobalStyle from './styles/GlobalStyles';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import OrderCompleteScreen from './screens/OrderCompleteScreen';
import CardListScreen from './screens/CardListScreen';
import AddCardScreen from './screens/AddCardScreen';
import PaymentDetailScreen from './screens/PaymentDetailScreen'; // my-mall-app 연동: PaymentDetailScreen 임포트

function App() {
  return (
    <Router>
      <GlobalStyle />
      <CartProvider>
        <CardProvider>
          <Routes>
            <Route path="/" element={<ProductListScreen />} />
            <Route path="/product/:id" element={<ProductDetailScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/order-complete" element={<OrderCompleteScreen />} />
            <Route path="/payment/cards" element={<CardListScreen />} />
            <Route path="/payment/add-card" element={<AddCardScreen />} />
            {/* my-mall-app 연동: 결제 품목 확인 페이지 라우트 추가 */}
            <Route path="/payment/items" element={<PaymentDetailScreen />} />
          </Routes>
        </CardProvider>
      </CartProvider>
    </Router>
  );
}

export default App;


// import React from 'react';
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './context/CartContext';
// import { CardProvider } from './context/CardContext';
// import GlobalStyle from './styles/GlobalStyles';
// import ProductListScreen from './screens/ProductListScreen';
// import ProductDetailScreen from './screens/ProductDetailScreen';
// import CartScreen from './screens/CartScreen';
// import OrderCompleteScreen from './screens/OrderCompleteScreen';
// import CardListScreen from './screens/CardListScreen';
// import AddCardScreen from './screens/AddCardScreen';
// import PaymentDetailScreen from './screens/PaymentDetailScreen';

// function App() {
//   return (
//     <Router>
//       <GlobalStyle />
//       <CartProvider>
//         <CardProvider>
//           <Routes>
//             <Route path="/" element={<ProductListScreen />} />
//             <Route path="/product/:id" element={<ProductDetailScreen />} />
//             <Route path="/cart" element={<CartScreen />} />
//             <Route path="/order-complete" element={<OrderCompleteScreen />} />
//             <Route path="/payment/cards" element={<CardListScreen />} />
//             <Route path="/payment/add-card" element={<AddCardScreen />} />
//             <Route path="/payment/items" element={<PaymentDetailScreen />} />
//           </Routes>
//         </CardProvider>
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;
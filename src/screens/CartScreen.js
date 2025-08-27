import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { calculateProductTotal, calculateShippingFee } from '../utils/cartUtils';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

// -- UI 컴포넌트 스타일 --
const Container = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
`;

const HeaderBar = styled.div`
  width: 100%;
  height: 69px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  top: 0;
  z-index: 10;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
`;

const TitleSection = styled.div`
  width: 100%;
  height: 154px;
  display: flex;
  margin-left : 36px;
  flex-direction: column;
  justify-content: center;
  top: 101px;
  left: 22px;
  gap: 7px;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const ItemCountText = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const ItemList = styled.div`
  width: 100%;
  top: 400px;
  display: absolute;
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  margin-top: 50px;
`;

const CartScreen = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, getTotalItems } = useContext(CartContext);

  // 뒤로가기 버튼 클릭 시 상품 목록 페이지로 이동
  const handleBackClick = () => {
    navigate('/');
  };
  
  const handleCheckoutClick = () => {
    if (getTotalItems() > 0) {
      navigate('/payment/cards'); 
    } else {
      alert('장바구니가 비어있습니다.');
    }
  };

  return (
    <Container>
      <HeaderBar>
        <BackButton onClick={handleBackClick}>&lt;</BackButton>
        <div style={{ flexGrow: 1 }} />
      </HeaderBar>
      <TitleSection>
        <PageTitle>장바구니</PageTitle>
        <ItemCountText>{`현재 ${getTotalItems()}개의 상품이 담겨있습니다.`}</ItemCountText>
      </TitleSection>
      <ItemList>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartItem 
              key={item.id} 
              product={item} 
              onQuantityChange={updateQuantity}
            />
          ))
        ) : (
          <EmptyCartMessage>장바구니가 비어있습니다.</EmptyCartMessage>
        )}
      </ItemList>
      {getTotalItems() > 0 && <CartSummary onCheckoutClick={handleCheckoutClick} />}
    </Container>
  );
};

export default CartScreen;

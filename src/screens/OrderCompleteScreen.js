import React, { useContext } from 'react'; // my-mall-app 연동: useContext 추가
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // my-mall-app 연동: CartContext 불러오기

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
`;

const HeaderBar = styled.div`
  width: 100%;
  height: 69px;
  background-color: #000000;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Message = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
`;

const SubMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

const TotalAmount = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  height: 58px;
  background-color: #f7d23d; /* 시안에 맞춰 버튼 색상 변경 */
  color: #333;
  border-radius: 48px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

const OrderCompleteScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, grandTotal } = location.state || { totalItems: 0, grandTotal: 0 };
  const { cartItems, clearCart } = useContext(CartContext); // my-mall-app 연동: cartItems와 clearCart 함수 가져오기

  const handleGoToPaymentDetail = () => {
    // my-mall-app 연동: 결제 품목 확인 페이지로 이동
    navigate('/payment/items', { state: { cartItems, grandTotal, totalItems } });
    clearCart(); // 결제 완료 후 장바구니 비우기
  };

  return (
    <Container>
      <HeaderBar />
      <Message>결제 완료!</Message>
      <SubMessage>총 {totalItems}개의 상품을 구매하셨습니다.</SubMessage>
      <TotalAmount>{grandTotal.toLocaleString()}원</TotalAmount>
      
      <Button onClick={handleGoToPaymentDetail}>결제 품목 확인</Button>
    </Container>
  );
};

export default OrderCompleteScreen;

import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

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

const HomeButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  font-weight: bold;
`;

const TitleSection = styled.div`
  width: 100%;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ItemName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
`;

const ItemPrice = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const ItemQuantity = styled.span`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`;

const PaymentSummary = styled.div`
  width: 100%;
  padding: 20px 22px;
  margin-top: 20px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  background-color: #fff;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SummaryLabel = styled.span`
  color: #555;
  font-size: 16px;
`;

const SummaryValue = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const PaymentDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, grandTotal, totalItems } = location.state || { cartItems: [], grandTotal: 0, totalItems: 0 };
  const { clearCart } = useContext(CartContext);

  const handleGoHome = () => {
    clearCart();
    navigate('/');
  };

  return (
    <Container>
      <HeaderBar>
        <HomeButton onClick={handleGoHome}>홈</HomeButton>
        <div style={{ flexGrow: 1 }} />
      </HeaderBar>
      <TitleSection>
        <PageTitle>구매 상품</PageTitle>
        <ItemCountText>총 {totalItems}개의 상품을 구매하셨습니다.</ItemCountText>
      </TitleSection>
      <ItemList>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <ItemCard key={item.id}>
              <ItemImage src={item.imageUrl} alt={item.name} />
              <ItemDetails>
                <ItemName>{item.brand}</ItemName>
                <ItemPrice>{item.name}</ItemPrice>
                <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
                <ItemQuantity>수량: {item.quantity}</ItemQuantity>
              </ItemDetails>
            </ItemCard>
          ))
        ) : (
          <p>구매한 상품이 없습니다.</p>
        )}
      </ItemList>
      <PaymentSummary>
        <SummaryRow>
          <SummaryLabel>총 금액</SummaryLabel>
          <SummaryValue>{grandTotal.toLocaleString()}원</SummaryValue>
        </SummaryRow>
      </PaymentSummary>
    </Container>
  );
};

export default PaymentDetailScreen;

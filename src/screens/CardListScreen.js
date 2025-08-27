import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CardContext } from '../context/CardContext';
import { CartContext } from '../context/CartContext'; // my-mall-app 연동: CartContext 불러오기
import { calculateProductTotal, calculateShippingFee } from '../utils/cartUtils'; // my-mall-app 연동: 장바구니 유틸 함수 불러오기
import CardPreview from '../components/CardPreview';

// -- UI 컴포넌트 스타일 --
const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 520px;
  margin: 0 auto;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const RegisteredCardContainer = styled.div`
  width: 250px;
  height: 150px;
  background-color: #333;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  color: #fff;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardChip = styled.div`
  width: 40px;
  height: 25px;
  background-color: #f7d23d;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const CardNumberDisplay = styled.div`
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const CardInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const CardOwnerName = styled.span`
  text-transform: uppercase;
`;

const CardExpiryDate = styled.span`
  font-size: 12px;
`;

const PayButton = styled.button`
  width: 260px;
  height: 30px;
  background-color: #f7d23d;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  margin-top: 20px;
  margin-bottom: 40px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const AddCardPlaceholder = styled.div`
  width: 208px;
  height: 123px;
  background-color: #f5f5f5;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 14px;
  cursor: pointer;
  border: 1px dashed #ccc;
  margin-top: 20px;
`;

const PlusIcon = styled.div`
  font-size: 40px;
  line-height: 1;
  margin-bottom: 5px;
`;
// -- // UI 컴포넌트 스타일 --

function CardListScreen() {
  const navigate = useNavigate();
  const { registeredCards } = useContext(CardContext);
  const { cartItems, getTotalItems } = useContext(CartContext); // my-mall-app 연동: CartContext 불러오기
  const productTotal = calculateProductTotal(cartItems); // my-mall-app 연동: 총 금액 계산
  const shippingFee = calculateShippingFee(productTotal);
  const grandTotal = productTotal + shippingFee;

  const handleAddCardClick = () => {
    navigate('/payment/add-card');
  };

  const handlePayClick = () => {
    // my-mall-app 연동: 경고창 대신 결제 완료 페이지로 이동
    navigate('/order-complete', {
      state: {
        totalItems: getTotalItems(),
        grandTotal: grandTotal,
      },
    });
  };

  const handleClose = () => {
    alert('화면 닫기');
    navigate('/cart');
  };

  return (
    <Container>
      <Header>
        <Title>보유카드</Title>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </Header>

      {Array.isArray(registeredCards) && registeredCards.map(card => (
        <React.Fragment key={card.id}>
          <RegisteredCardContainer>
            <CardChip />
            <CardNumberDisplay>{card.number}</CardNumberDisplay>
            <CardInfoRow>
              <CardOwnerName>{card.owner}</CardOwnerName>
              <CardExpiryDate>{card.expiry}</CardExpiryDate>
            </CardInfoRow>
          </RegisteredCardContainer>
          <PayButton onClick={handlePayClick}>이 카드로 결제하기</PayButton>
        </React.Fragment>
      ))}

      <AddCardPlaceholder onClick={handleAddCardClick}>
        <PlusIcon>+</PlusIcon>
        {Array.isArray(registeredCards) && registeredCards.length === 0 ? '새로운 카드를 등록해주세요.' : '다른 카드 추가'}
      </AddCardPlaceholder>
    </Container>
  );
}

export default CardListScreen;

import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import { calculateProductTotal, calculateShippingFee } from '../utils/cartUtils';

const SummaryContainer = styled.div`
  width: 100%;
  // position: relative;
  bottom: 0;
  /* my-mall-app 연동: 화면에 꽉 차도록 max-width 속성 제거 */
  background-color: #fff;
  padding: 20px 22px 40px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 10;
`;

const PriceRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Label = styled.span`
  color: #555;
`;

const Value = styled.span`
  font-weight: ${props => props.isTotal ? 'bold' : 'normal'};
  font-size: ${props => props.isTotal ? '20px' : '16px'};\
`;

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: #e0e0e0;
  margin: 15px 0;
`;

const CheckoutButton = styled.button`
  width: 100%;
  height: 58px;
  background-color: #333;
  color: #fff;
  border-radius: 48px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

const CartSummary = ({ onCheckoutClick }) => {
  const { cartItems } = useContext(CartContext);
  const productTotal = calculateProductTotal(cartItems);
  const shippingFee = calculateShippingFee(productTotal);
  const grandTotal = productTotal + shippingFee;

  return (
    <SummaryContainer>
      <PriceRow>
        <Label>상품 금액</Label>
        <Value>{productTotal.toLocaleString()}원</Value>
      </PriceRow>
      <PriceRow>
        <Label>배송비</Label>
        <Value>{shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}</Value>
      </PriceRow>
      <Divider />
      <PriceRow>
        <Label>총 금액</Label>
        <Value isTotal>{grandTotal.toLocaleString()}원</Value>
      </PriceRow>
      <CheckoutButton onClick={onCheckoutClick}>결제하기</CheckoutButton>
    </SummaryContainer>
  );
};

export default CartSummary;

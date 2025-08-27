import React from 'react';
import styled from 'styled-components';
import { formatCardNumber } from '../utils/cardUtils';

const CardContainer = styled.div`
  width: 250px; /* 기존 208px에서 250px로 크기 키움 */
  height: 150px; /* 기존 123px에서 150px로 크기 키움 (비율 유지) */
  background-color: #333;
  border-radius: 10px; /* 모서리 둥글기 증가 */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px; /* 패딩 증가 */
  color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 강화 */
  margin-bottom: 20px;
`;

const CardChip = styled.div`
  width: 50px; /* 크기 증가 */
  height: 30px; /* 크기 증가 */
  background-color: #f7d23d;
  border-radius: 5px;
  margin-bottom: 15px; /* 간격 증가 */
`;

const CardNumberDisplay = styled.div`
  font-size: 18px; /* 글자 크기 증가 */
  letter-spacing: 2px;
  margin-bottom: 15px; /* 간격 증가 */
`;

const CardInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px; /* 글자 크기 증가 */
`;

const CardOwnerName = styled.span`
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 60%;
`;

const CardExpiryDate = styled.span`
  font-size: 14px; /* 글자 크기 증가 */
`;

function CardPreview({ cardNumber, ownerName, expiryDate, displayedCardNumber }) {
  const finalCardNumber = displayedCardNumber || '•••• •••• •••• ••••';
  const displayOwnerName = ownerName || 'NAME';
  const displayExpiryDate = expiryDate || 'MM/YY';

  return (
    <CardContainer>
      <CardChip />
      <CardNumberDisplay>{finalCardNumber}</CardNumberDisplay>
      <CardInfoRow>
        <CardOwnerName>{displayOwnerName}</CardOwnerName>
        <CardExpiryDate>{displayExpiryDate}</CardExpiryDate>
      </CardInfoRow>
    </CardContainer>
  );
}

export default CardPreview;

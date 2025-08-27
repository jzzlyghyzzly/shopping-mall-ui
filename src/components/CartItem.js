import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  width: 100%;
  height: 185px;
  padding: 10px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
`;

const ProductInCartSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 392.51px;
`;

const ProductImageInCart = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 5px;
`;

const Price = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  margin: 0 5px;
`;

const Quantity = styled.span`
  font-size: 16px;
  width: 20px;
  text-align: center;
`;

const CartItem = ({ product, onQuantityChange }) => {
  const handleDecrease = () => {
    onQuantityChange(product.id, product.quantity - 1);
  };
  
  const handleIncrease = () => {
    onQuantityChange(product.id, product.quantity + 1);
  };

  return (
    <ItemContainer>
      <ProductInCartSection>
        <ProductImageInCart src={product.image || product.imageUrl} alt={product.name} />
        <ProductDetails>
          <BrandName>{product.name}</BrandName>
          <Price>{product.price.toLocaleString()}원</Price>
        </ProductDetails>
      </ProductInCartSection>
      <QuantityControls>
        <QuantityButton onClick={handleDecrease}>-</QuantityButton>
        <Quantity>{product.quantity}</Quantity>
        <QuantityButton onClick={handleIncrease}>+</QuantityButton>
      </QuantityControls>
    </ItemContainer>
  );
};

export default CartItem;
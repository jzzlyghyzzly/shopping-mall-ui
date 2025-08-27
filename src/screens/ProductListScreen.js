import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import products from '../data/products.js';

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
  justify-content: flex-end;
  padding: 0 20px;
//   position: fixed;
  top: 0;
  z-index: 10;
`;

const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  width: 20px;
  height: 24px;
  padding: 0;
`;

const CartIcon = styled.div`
  width: 20px;
  height: 24px;
  background-color: #fff; /* 흰색으로 표시 */
`;

const CartCount = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  width: 19px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10px;
  right: -10px;
  font-weight: bold;
`;

const TitleSection = styled.div`
  width: 168px;
  height: 74px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 101px;
  left: 23px;
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 148px;
  padding: 0 23px;
`;

const ProductCardContainer = styled.div`
  width: 100%;
  height: 267px;
  border-radius: 15px;
  border: 1px solid #ddd;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  cursor: pointer; /*클릭 가능한 요소임을 표시*/
`;

const ProductImage = styled.img`
  width: 100%;
  height: 115px;
  object-fit: cover;
`;

const ProductDetailsFrame = styled.div`
  width: 100%;
  height: 95px;
  padding: 10px 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 7px;
`;

const BrandName = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #555;
  margin: 0;
`;

const ProductName = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin: 0;
`;

const AddToCartButton = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid ${props => props.isAdded ? '#888' : '#ddd'};
  background-color: ${props => props.isAdded ? '#e0e0e0' : '#000'};
  padding: 0;
  font-size: 12px;
//   position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
  color: ${props => props.isAdded ? '#333' : '#fff'};
  transition: background-color 0.2s, color 0.2s;
`;

const ProductListScreen = () => {
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useContext(CartContext);

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const ProductCard = ({ product }) => {
    const [buttonText, setButtonText] = useState('담기');
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
      e.stopPropagation(); // 카드 클릭 이벤트가 발생하지 않도록 버블링 방지
      addToCart(product);
      setButtonText('담음!');
      setIsAdded(true);
      setTimeout(() => {
        setButtonText('담기');
        setIsAdded(false);
      }, 2000);
    };

    const handleCardClick = () => {
      navigate(`/product/${product.id}`); // 상품 상세 페이지로 이동
    };
  
    return (
      <ProductCardContainer onClick={handleCardClick}>
        <ProductImage src={product.imageUrl} alt={product.name} />
        <ProductDetailsFrame>
          <BrandName>{product.brand}</BrandName>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
          <AddToCartButton onClick={handleAddToCart} isAdded={isAdded}>
            {buttonText}
          </AddToCartButton>
        </ProductDetailsFrame>
      </ProductCardContainer>
    );
  };
  
  return (
    <Container>
      <HeaderBar>
        <div style={{ flexGrow: 1 }} />
        <CartButton onClick={handleGoToCart}>
          <CartIcon />
          <CartCount>{getTotalItems()}</CartCount>
        </CartButton>
      </HeaderBar>
      <TitleSection>
        <PageTitle>신발 상품 목록</PageTitle>
        <ItemCountText>현재 {products.length}개의 상품이 있습니다.</ItemCountText>
      </TitleSection>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </Container>
  );
};

export default ProductListScreen;
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import products from '../data/products';

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

const ProductImage = styled.img`
  width: 90%; /* 화면에 꽉 차지 않도록 너비 조정 */
  max-width: 400px; /* 이미지 최대 너비 설정 */
  height: auto;
  object-fit: cover;
  border-radius: 15px; /* 모서리 둥글게 */
  display: block;
  margin: 20px auto; /* 중앙 정렬 및 상단 여백 추가 */
`;

const ProductDetails = styled.div`
  padding: 20px;
`;

const BrandName = styled.p`
  font-size: 24px; /* 글자 크기 더 크게 */
  font-weight: bold;
  color: #555;
  margin: 0 0 5px;
`;

const ProductName = styled.p`
  font-size: 18px; /* 글자 크기 키우기 */
  color: #333;
  margin: 0 0 10px;
`;

const ProductPrice = styled.p`
  font-size: 20px; /* 글자 크기 키우기 */
  font-weight: bold;
  color: #000;
  margin: 0 0 20px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 120px;
  height: 40px;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 10px;
`;

const Quantity = styled.span`
  font-size: 18px;
  padding: 0 10px;
`;

const AddToCartButton = styled.button`
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

const RelatedProductsSection = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  margin-top: 40px;
`;

const RelatedTitle = styled.h3`
  font-size: 24px; /* 글자 크기 더 크게 */
  margin-bottom: 5px;
  font-weight: bold;
`;

const RelatedSubText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px; /* 단락 간격 넓히기 */
`;

const RelatedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const RelatedProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RelatedProductImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
`;

const RelatedProductName = styled.p`
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
`;

// -- ProductDetailScreen 컴포넌트 --
const ProductDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, getTotalItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);

    if (foundProduct) {
      const related = products.filter(p => p.brand === foundProduct.brand && p.id !== foundProduct.id);
      setRelatedProducts(related.slice(0, 3));
    }
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert(`${product.name} ${quantity}개가 장바구니에 추가되었습니다.`);
    navigate('/cart');
  };

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }
  
  // 이미지 URL 텍스트 변경
  const cleanedImageUrl = product.detailImageUrl.replace(/\?text=.+/, `?text=${product.id}`);

  return (
    <Container>
      <HeaderBar>
        <BackButton onClick={handleBackClick}>&lt;</BackButton>
        <CartButton onClick={handleGoToCart}>
          <CartIcon />
          <CartCount>{getTotalItems()}</CartCount>
        </CartButton>
      </HeaderBar>
      <ProductImage src={cleanedImageUrl} alt={product.name} />
      <ProductDetails>
        <BrandName>{product.brand}</BrandName>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
        
        <QuantityControl>
          <QuantityButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</QuantityButton>
          <Quantity>{quantity}</Quantity>
          <QuantityButton onClick={() => setQuantity(quantity + 1)}>+</QuantityButton>
        </QuantityControl>

        <AddToCartButton onClick={handleAddToCart}>
          장바구니 담기
        </AddToCartButton>
      </ProductDetails>

      {relatedProducts.length > 0 && (
        <RelatedProductsSection>
          <RelatedTitle>관련 상품</RelatedTitle>
          <RelatedSubText>{product.brand}의 다른 신발은 어떠신가요?</RelatedSubText>
          <RelatedProductsGrid>
            {relatedProducts.map(relProduct => (
              <RelatedProductCard key={relProduct.id} onClick={() => navigate(`/product/${relProduct.id}`)}>
                <RelatedProductImage src={relProduct.imageUrl.replace(/\?text=.+/, `?text=${relProduct.id}`)} alt={relProduct.name} />
                <RelatedProductName>{relProduct.name}</RelatedProductName>
              </RelatedProductCard>
            ))}
          </RelatedProductsGrid>
        </RelatedProductsSection>
      )}
    </Container>
  );
};

export default ProductDetailScreen;

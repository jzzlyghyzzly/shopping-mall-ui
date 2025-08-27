import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CardPreview from '../components/CardPreview';
import {
  formatCardNumber,
  maskCardNumber,
  formatExpiryDate,
  validateExpiryDate,
} from '../utils/cardUtils';
import { CardContext } from '../context/CardContext';

// --- UI 컴포넌트 스타일 ---
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
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const InputGroup = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #f7d23d;
  }
`;

const SmallInput = styled(Input)`
  width: 100%;
  ${props => props.width && `width: ${props.width}px;`}
`;

const ExpiryDateInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  ${SmallInput} {
    width: 137px;
  }
`;

const CVCInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${SmallInput} {
    width: 84px;
    margin-right: 10px;
  }
`;

const QuestionMarkButton = styled.button`
  width: 27px;
  height: 27px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #888;
  cursor: pointer;
  flex-shrink: 0;
`;

const PasswordInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 174px;
  max-width: 174px;
`;

const PasswordInputBox = styled.input`
  width: 43px;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 7px;
  text-align: center;
  font-size: 24px;
  margin-right: 5px;
  &:focus {
    outline: none;
    border-color: #f7d23d;
  }
`;

const MaskedDot = styled.div`
  width: 7px;
  height: 7px;
  background-color: #333;
  border-radius: 50%;
  margin: 0 5px;
`;

const CharCount = styled.span`
  font-size: 12px;
  color: #888;
  text-align: right;
  width: 100%;
  max-width: 318px;
  margin-top: -15px;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  width: 317px;
  height: 40px;
  background-color: ${props => (props.disabled ? '#ccc' : '#f7d23d')};
  color: ${props => (props.disabled ? '#999' : '#333')};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-top: 30px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-width: 300px;
`;

const ModalButton = styled.button`
  background-color: #f7d23d;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
`;
// --- // UI 컴포넌트 스타일 ---

function AddCardScreen() {
  const navigate = useNavigate();
  const { addCard } = useContext(CardContext); 

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [cvc, setCvc] = useState('');
  const [password, setPassword] = useState(['', '']);

  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);
  const [isOwnerNameValid, setIsOwnerNameValid] = useState(false);
  const [isCVCValid, setIsCVCValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const isFormValid = isCardNumberValid && isExpiryDateValid && isOwnerNameValid && isCVCValid && isPasswordValid;

  useEffect(() => {
    const cardNum = cardNumber.replace(/\s/g, '');
    const expiry = expiryDate.replace(/\s|\//g, '');
    const owner = ownerName.trim();
    const cvcVal = cvc.replace(/\s/g, '');
    const pw1 = password[0];
    const pw2 = password[1];

    setIsCardNumberValid(cardNum.length === 16);
    setIsExpiryDateValid(validateExpiryDate(expiry));
    setIsOwnerNameValid(owner.length > 0);
    setIsCVCValid(cvcVal.length === 3);
    setIsPasswordValid(pw1.length === 1 && pw2.length === 1);
  }, [cardNumber, expiryDate, ownerName, cvc, password]);

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      setCardNumber(value);
    }
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2), 10);
      if (month > 12) {
        setModalMessage('만료월은 12를 초과할 수 없습니다.');
        return;
      }
    }
    
    setExpiryDate(formatExpiryDate(value));
  };

  const handleOwnerNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setOwnerName(value);
    }
  };

  const handleCVCChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvc(value);
    }
  };

  const handlePasswordChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length > 1) return;

    const newPassword = [...password];
    newPassword[index] = value;
    setPassword(newPassword);

    const isPwValid = newPassword.every(val => val.length === 1);
    setIsPasswordValid(isPwValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      addCard({
        cardNumber: cardNumber.replace(/\s/g, ''),
        expiryDate: expiryDate.replace(/\s|\//g, ''),
        ownerName,
        cvc: cvc.replace(/\s/g, ''),
        password: password.join(''),
      });
      setModalMessage('카드 등록이 완료되었습니다.');
    } else {
      setModalMessage('모든 필수 정보를 올바르게 입력해주세요.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    setModalMessage('');
    if (isFormValid) {
      navigate('/payment/cards');
    }
  };

  const handleCVCQuestionMarkClick = () => {
    setModalMessage('보안 코드는 카드 뒷면 서명란에 있는 3자리(또는 아메리칸 익스프레스 카드의 경우 앞면 4자리) 숫자입니다.');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>&lt;</BackButton>
        <Title>카드 추가</Title>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </Header>

      <CardPreview
        cardNumber={formatCardNumber(cardNumber)}
        ownerName={ownerName}
        expiryDate={expiryDate}
        displayedCardNumber={cardNumber.replace(/\s/g, '').length === 16 ? maskCardNumber(cardNumber.replace(/\s/g, '')) : formatCardNumber(cardNumber.replace(/\s/g, ''))}
      />

      <InputGroup style={{ marginTop: '40px' }}>
        <Label>카드 번호</Label>
        <Input
          type="text"
          placeholder="카드 번호를 입력해주세요."
          value={formatCardNumber(cardNumber)}
          onChange={handleCardNumberChange}
          maxLength="19"
        />
      </InputGroup>

      <InputGroup>
        <Label>만료일</Label>
        <ExpiryDateInputContainer>
          <SmallInput
            type="text"
            placeholder="MM / YY"
            value={expiryDate}
            onChange={handleExpiryDateChange}
          />
        </ExpiryDateInputContainer>
      </InputGroup>

      <InputGroup>
        <Label>카드 소유자 이름</Label>
        <Input
          type="text"
          placeholder="카드에 표시된 이름과 동일하게 입력하세요."
          value={ownerName}
          onChange={handleOwnerNameChange}
          maxLength="30"
        />
        <CharCount>({ownerName.length}/30)</CharCount>
      </InputGroup>

      <InputGroup>
        <Label>보안 코드(CVC/CVV)</Label>
        <CVCInputContainer>
          <SmallInput
            type="password"
            placeholder="•••"
            value={cvc}
            onChange={handleCVCChange}
            maxLength="3"
          />
          <QuestionMarkButton onClick={handleCVCQuestionMarkClick}>?</QuestionMarkButton>
        </CVCInputContainer>
      </InputGroup>

      <InputGroup>
        <Label>카드 비밀번호</Label>
        <PasswordInputContainer>
          <PasswordInputBox
            type="password"
            maxLength="1"
            value={password[0]}
            onChange={(e) => handlePasswordChange(0, e)}
          />
          <PasswordInputBox
            type="password"
            maxLength="1"
            value={password[1]}
            onChange={(e) => handlePasswordChange(1, e)}
          />
          <MaskedDot />
          <MaskedDot />
        </PasswordInputContainer>
      </InputGroup>

      <SubmitButton onClick={handleSubmit} disabled={!isFormValid}>
        작성 완료
      </SubmitButton>

      {modalMessage && (
        <ModalOverlay onClick={() => setModalMessage('')}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <ModalButton onClick={handleClose}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default AddCardScreen;

// 카드 번호 포맷팅 (xxxx xxxx xxxx xxxx)
export const formatCardNumber = (value) => {
  if (!value) return '';
  value = value.replace(/\s?/g, ''); // 공백 제거
  let formatted = '';
  for (let i = 0; i < value.length; i++) {
    formatted += value[i];
    if ((i + 1) % 4 === 0 && i !== value.length - 1) {
      formatted += ' ';
    }
  }
  return formatted;
};

// 카드 번호 마스킹 (뒤 8자리: xxxx xxxx •••• ••••)
export const maskCardNumber = (cardNumber) => {
  if (!cardNumber || cardNumber.length < 16) return formatCardNumber(cardNumber); // 16자리 미만이면 그냥 포맷팅만
  const cleaned = cardNumber.replace(/\s/g, ''); // 공백 제거
  if (cleaned.length !== 16) return formatCardNumber(cleaned); // 16자리가 아니면 포맷팅만

  const first8 = cleaned.substring(0, 8);
  const maskedLast8 = '••••••••'; // 8자리 마스킹

  return `${first8.substring(0, 4)} ${first8.substring(4, 8)} ${maskedLast8.substring(0, 4)} ${maskedLast8.substring(4, 8)}`;
};

// 만료일 포맷팅 (MM / YY)
export const formatExpiryDate = (value) => {
  if (!value) return '';
  value = value.replace(/\D/g, ''); // 숫자만 남김
  if (value.length > 2) {
    return `${value.slice(0, 2)} / ${value.slice(2, 4)}`;
  }
  return value;
};

// 만료일 유효성 검사 (MMYY 4자리 기준)
export const validateExpiryDate = (value) => {
  if (!value || value.length < 4) return false; // 4자리 (MMYY) 모두 입력되어야 검사
  const month = parseInt(value.slice(0, 2), 10);
  const year = parseInt(value.slice(2, 4), 10); // 'YY' 형식

  if (month < 1 || month > 12) return false;

  const currentYear = new Date().getFullYear() % 100; // 현재 연도의 뒤 두 자리
  const currentMonth = new Date().getMonth() + 1; // 현재 월 (0부터 시작하므로 +1)

  // 입력된 연도가 현재 연도보다 작으면 유효하지 않음
  if (year < currentYear) return false;
  // 입력된 연도가 현재 연도와 같지만, 입력된 월이 현재 월보다 작으면 유효하지 않음
  if (year === currentYear && month < currentMonth) return false;

  return true;
};
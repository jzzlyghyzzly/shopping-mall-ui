import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-smoothing: grayscale;
    background-color: #f0f0f0; // 전체 배경색
    display: flex;
    justify-content: center; /* #root를 중앙으로 정렬 */
    align-items: flex-start; // 상단 정렬
    min-height: 100vh;
  }

  #root {
    width: 100%; // 기본적으로 100% 폭 사용
    max-width: 375px; // 모바일 뷰포트 기준 최대 폭
    min-height: 100vh;
    background-color: #ffffff; // 앱 내부 배경색
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden; // 내용이 넘칠 경우 스크롤 숨김

    /* 반응형 디자인을 위한 미디어 쿼리 */
    @media (min-width: 768px) {
      max-width: 600px;
    }
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;

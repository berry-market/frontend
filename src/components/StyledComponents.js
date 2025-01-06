import styled, { createGlobalStyle } from "styled-components";

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`

  :root { 
    --gray-light:#F4F4F4;
    --gray-color:#D9D9D9;
    --gray-dark:#9D9D9D;
    --blue-color:#0022FF;
    --red-color: #FF0000;
    --orange-color: #FFBB00;
    --background-color: #ffffff;
    --text-color: #222222;
    --font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }

  @font-face {
    font-family: 'Cafe24Ssurround';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  @media (max-width: 480px) {
    html {
      font-size: 95%;
    }
  }

  @media (min-width: 481px) and (max-width: 767px) {
    html {
      font-size: 87.5%;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    html {
      font-size: 100%;
    }
  }

  @media (min-width: 1025px) {
    html {
      font-size: 112.5%;
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, span, p, div, button, input {
    word-break: keep-all;
    white-space: pre-wrap;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    text-decoration: none;
    cursor: pointer;
  }

  .error_container {
    height: 1rem;
    width: 100%;
    margin-top: 0.1rem;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
  }

  .error_message {
    font-size: 0.6rem;
    color: var(--notice-color);
  }

`;

const Container = styled.div`
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

export { GlobalStyle, Container };

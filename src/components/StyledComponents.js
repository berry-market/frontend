import styled, { createGlobalStyle } from "styled-components";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const GlobalStyle = createGlobalStyle`

  :root { 
    --main-light: #F4F4F4;
    --main-color: #222222;
    --main-dark: #9D9D9D;
    --gray-light: #F4F4F4;
    --gray-color: #D9D9D9;
    --gray-dark: #9D9D9D;
    --blue-color: #0022FF;
    --red-color: #FF0000;
    --orange-color: #FFBB00;
    --line-color: #D9D9D9;
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
  padding: 1rem 2rem;
`;

const Input = styled.input`
  padding: 0.5rem 0.8rem;
  width: 100%;
  border: 1px solid var(--line-color);
  color: var(--text-color);
  background-color: var(--background-color);
  transition: border-color 0.3s;
  font-size: 0.7rem;

  &:focus {
    background-color: var(--main-light);
    border: 1px solid var(--main-color);
    outline: none;
  }

  &::placeholder {
    color: var(--gray-dark);
  }

  &[type="date"] {
    font-family: var(--font-family);
    padding: 0.4rem;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Button = styled.button`
  background-color: var(--main-color);
  color: var(--background-color);
  width: 100%;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.5rem;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: var(--gray-color);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.2rem;
  font-size: 0.6em;
  color: var(--red-color);
  letter-spacing: -1px;
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

const Modal = styled.div`
  background: var(--background-color);
  color: var(--text-color);
  padding: 2rem;
  border-radius: 0.5rem;
  width: 25rem;
  margin: 2rem auto;
  transition: all 0.3s ease-in-out;
`;

const CustomDropdown = styled(Dropdown)`
  .Dropdown-control {
    background-color: var(--background-color);
    border: 1px solid var(--line-color);
    padding: 0.5rem 1.5rem 0.5rem 0.5rem;
    cursor: pointer;
    width: 100%;
    font-size: 0.7rem;
    color: var(--text-color);
    &:hover {
      border-color: var(--blue-color);
    }
  }

  & .Dropdown-menu {
    margin-top: 0.2rem;
    background-color: var(--background-color);
    border: 1px solid var(--line-color);
    z-index: 10;
  }

  & .Dropdown-option {
    font-size: 0.7rem;
    cursor: pointer;
    color: var(--text-color);
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--gray-light);
    }

    &.is-selected {
      background-color: var(--blue-color);
      color: var(--background-color);
    }
  }

  & .Dropdown-arrow {
    border-color: var(--text-color) transparent transparent transparent;
  }
`;

export {
  GlobalStyle,
  Container,
  Input,
  ErrorMessage,
  Button,
  ModalOverlay,
  Modal,
  CustomDropdown,
};

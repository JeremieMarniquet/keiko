import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Pokemon;
    src: url('/fonts/Pokemon_GB.ttf');
  }
  body {
    font-family: Pokemon, sans-serif;
  }
`;

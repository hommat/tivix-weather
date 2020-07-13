import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing:border-box;
  }

  html {
    font-family: 'Roboto', sans-serif;
  }

  body{
    padding:1em;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyle;

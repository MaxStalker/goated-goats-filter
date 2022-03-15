import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./Components";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </StrictMode>,
  rootElement
);

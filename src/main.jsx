import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { GlobalStyle } from "./Components";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
  rootElement
);

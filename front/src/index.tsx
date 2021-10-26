import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, DAppProvider } from "@usedapp/core";

const config = {
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Ropsten]:
      "https://ropsten.infura.io/v3/02dc1b201ea0402eb4d789fb23b5ce6a",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

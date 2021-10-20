import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, DAppProvider } from "@usedapp/core";

// const config = {
//   readOnlyChainId: 0x4e454152,
//   readOnlyUrls: {
//     // [ChainId.Mainnet]:
//     //   "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
//     0x4e454152: "https://mainnet.aurora.dev",
//   },
// };

const config = {
  readOnlyChainId: 0x4e454152,
  supportedChains: [0x4e454152],
  multicallAddresses: {
    0x4e454152: "0xCe129333458f037867C81DFbD70E4D57A3b1c5eb",
  },
  readOnlyUrls: {
    0x4e454152: "https://mainnet.aurora.dev",
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

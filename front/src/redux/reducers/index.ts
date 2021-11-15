import { combineReducers } from "redux";
import { mintReducer } from "./minReducer";
import { swapReducer } from "./swapReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const swapConfig = {
  key: "swap",
  storage: storage,
  whitelist: ["token1", "token2"],
  blacklist: ["token1_value", "token2_value", "info"],
};

const mintConfig = {
  key: "mint",
  storage: storage,
  whitelist: ["token"],
};

export const allReducers = combineReducers({
  swap: persistReducer(swapConfig, swapReducer),
  mint: persistReducer(mintConfig, mintReducer),
});

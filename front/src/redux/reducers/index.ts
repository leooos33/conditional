import { combineReducers } from "redux";
import { mintReducer } from "./minReducer";
import { swapReducer } from "./swapReducer";

export const allReducers = combineReducers({
  swap: swapReducer,
  mint: mintReducer,
});

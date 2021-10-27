import { combineReducers } from "redux";
import { swapReducer } from "./swapReducer";

export const allReducers = combineReducers({
  swap: swapReducer,
});

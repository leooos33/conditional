/* eslint-disable no-underscore-dangle */
import { allReducers } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "swap",
  storage: storage,
  whitelist: ["swap"],
};
const pReducer = persistReducer(persistConfig, allReducers);

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  pReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

const persistor = persistStore(store);
export { persistor, store };

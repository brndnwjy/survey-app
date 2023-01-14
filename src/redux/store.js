import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const persistConfig = {
  key: "data",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

export default store;
export { persistor };

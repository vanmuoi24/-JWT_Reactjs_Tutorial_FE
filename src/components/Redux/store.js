import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

import { persistStore } from "redux-persist";
import rootReducer from "./reducers/data";

const resetDataMiddleware = (store) => (next) => (action) => {
  if (window.location.pathname === "/login" && action.type !== "RESET_DATA") {
    store.dispatch({ type: "RESET_DATA" });
  }
  return next(action);
};
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, resetDataMiddleware))
);

const persistor = persistStore(store);

export { store, persistor };

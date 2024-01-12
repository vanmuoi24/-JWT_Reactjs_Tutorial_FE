import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rotreducer from "./rotreducer";

const persistConfig = {
  key: "root",
  storage,
  // Thêm các cấu hình khác của bạn nếu cần
};

const rootReducer = combineReducers({
  acount: persistReducer(persistConfig, rotreducer),
  // Các reducer khác nếu có
});

export default rootReducer;

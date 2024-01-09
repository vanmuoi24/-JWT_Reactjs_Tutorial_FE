import { combineReducers } from "redux";
import rotreducer from "./rotreducer";
const rootReducer = combineReducers({
  acount: rotreducer,
});

export default rootReducer;

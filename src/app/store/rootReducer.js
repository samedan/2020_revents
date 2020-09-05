import { combineReducers } from "redux";
import testReducer from "./../../features/sandbox/testReducer";
import eventReducer from "./../../features/events/eventReducer";
import modalReducer from "../common/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";

// import modalReducer from "./../../common/modals/modalReducer";

const rootReducer = combineReducers({
  test: testReducer,
  eventsState: eventReducer,
  modals: modalReducer,
  auth: authReducer,
});

export default rootReducer;

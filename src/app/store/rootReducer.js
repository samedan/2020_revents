import { combineReducers } from "redux";
import testReducer from "./../../features/sandbox/testReducer";
import eventReducer from "./../../features/events/eventReducer";
import modalReducer from "../common/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../async/asyncReducer";

// import modalReducer from "./../../common/modals/modalReducer";

const rootReducer = combineReducers({
  test: testReducer,
  eventsState: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer
});

export default rootReducer;

import { createStore, applyMiddleware } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

import rootReducer from "./rootReducer";

export function configureStore() {
  // return createStore(rootReducer, devToolsEnhancer());
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import bookingReducer from "./bookingRedux.js";

// define reducers
const reducer = bookingReducer;

// create store
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

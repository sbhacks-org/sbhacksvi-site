import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers";

let initialState = window.__PRELOADED_STATE__ || undefined;

delete window.__PRELOADED_STATE__;

let middleware = [thunk];

if(process.env.NODE_ENV !== "production") {
	middleware = [...middleware, logger]
}

module.exports = createStore(reducers, initialState, applyMiddleware(...middleware));

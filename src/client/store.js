import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers";

let initialState = window.__PRELOADED_STATE__ || undefined;

delete window.__PRELOADED_STATE__;

module.exports = createStore(reducers, initialState, applyMiddleware(thunk, logger));

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Apply from "./components/Apply";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
				<Route path="/apply" component={Apply} />
				<Route path="/profile" component={Profile} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

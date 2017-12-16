import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import Apply from "./components/Apply";
import Header from "./components/Header";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import Signup from "./components/Signup";

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Header />
			<div id="registration">
				<BrowserRouter>
					<Switch>
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<Route path="/apply" component={Apply} />
						<Route exact path="/profile" component={Profile} />
						<Route path="/profile/reset-password" component={ResetPassword} />
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	</Provider>,
	document.getElementById("root")
);

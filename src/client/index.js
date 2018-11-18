import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import Apply from "./components/Apply";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Login from "./components/Login";
import ProfileEdit from "./components/ProfileEdit";
import ResetPassword from "./components/ResetPassword";
import Signup from "./components/Signup";

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Header />
			<div id="registration">
				<BrowserRouter>
					<Switch>
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/apply" component={Apply} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path = "/edit" component = {ProfileEdit} />
						<Route exact path="/profile/reset-password/:token?" component={ResetPassword} />
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	</Provider>,
	document.getElementById("root")
);

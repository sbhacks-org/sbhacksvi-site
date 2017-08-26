import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Apply from "./components/Apply";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />
			<Route path="/apply" component={Apply} />
			<Route path="/profile" component={Profile} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Application from "./components/Application";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />
			<Route path="/apply" component={Application} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);

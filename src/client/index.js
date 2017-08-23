import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);

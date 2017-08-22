import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Signup from "./components/Signup";

ReactDOM.render(
	<BrowserRouter>
		<Route path="/signup" component={Signup} />
	</BrowserRouter>,
	document.getElementById("root")
);

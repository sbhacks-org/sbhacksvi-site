import React from "react";
import { Link } from "react-router-dom";

const HasNotAppliedView = ({ info }) => {
	return (
		<div>
			<h1>Hello {info.first_name},</h1>
			<h2>You have not yet applied. Click <Link to="/apply">here</Link> to start your application.</h2>
		</div>
	);
};

export default HasNotAppliedView;

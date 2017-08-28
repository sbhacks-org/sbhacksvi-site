import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

import { authSuccess } from "../../actions";
import { createHandleSubmit } from "../auth-form-helper";

import SignupForm from "./SignupForm";

const mapStateToProps = (state, ownProps) => {
	const { isAuthenticated } = state.user;
	return {
		isAuthenticated
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleSubmit: createHandleSubmit(dispatch, "/signup", [
			{ name: "email", label: "Email" },
			{ name: "password", label: "Password" },
			{ name: "last_name", label: "Last name" },
			{ name: "first_name", label: "First name" }
		])
	};
}

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			errors: {}
		};

		this.handleSubmit = this.props.handleSubmit.bind(this);
	}
	render() {
		const { loading, errors } = this.state;
		const { isAuthenticated, location } = this.props

		if(isAuthenticated) return <Redirect to={ location.state ? location.state.referrer : "/profile"} />;

		return (
			<div>
				<h1>Sign Up</h1>
				<SignupForm
					handleSubmit={this.handleSubmit}
					loading={loading}
					errors={errors}
				/>
				<Link to="/login"><Button color="teal" fluid size="large">I already have an account and want to log in.</Button></Link>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

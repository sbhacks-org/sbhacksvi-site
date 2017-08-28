import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

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
		handleSubmit: createHandleSubmit(dispatch, "/signup")
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
			<SignupForm
				handleSubmit={this.handleSubmit}
				loading={loading}
				errors={errors}
			/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

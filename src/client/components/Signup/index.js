import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { authSuccess } from "../../actions";
import SignupForm from "./SignupForm";
import { createHandleSubmit } from "../auth-form-helper";

const mapStateToProps = (state, ownProps) => {
	const { isAuthenticated } = state.user;
	return {
		isAuthenticated
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		...bindActionCreators({ authSuccess }, dispatch),
		handleSubmit: createHandleSubmit(dispatch, "/signup")
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { authSuccess } from "../../actions";
import LoginForm from "./LoginForm";
import { createHandleSubmit } from "../auth-form-helper";

const mapStateToProps = (state, ownProps) => {
	const { isAuthenticated, info, application } = state.user;
	return {
		isAuthenticated,
		info,
		application
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		...bindActionCreators({ authSuccess }, dispatch),
		handleSubmit: createHandleSubmit(dispatch, "/login")
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

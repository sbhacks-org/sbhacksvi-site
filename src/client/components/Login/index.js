import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import { authSuccess } from "../../actions";
import { createHandleSubmit } from "../auth-form-helper";
import LoginForm from "./LoginForm";
import Banner from "./Banner";

const mapStateToProps = (state, ownProps) => {
	const { isAuthenticated } = state.user;
	return {
		isAuthenticated
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleSubmit: createHandleSubmit(dispatch, "/login")
	};
}

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			errors: {}
		}

		this.handleSubmit = this.props.handleSubmit.bind(this);
	}


	onDismiss() {
		this.setState({ errors: {} })
	}


	render() {
		const { isAuthenticated, location } = this.props;
		const { errors, loading } = this.state;

		if(isAuthenticated) return <Redirect to={ location.state ? location.state.referrer : "/profile" } />;


		return (
			<div>
				<Banner onDismiss={this.onDismiss} errors={errors} />
				<h1>Log In</h1>
				<LoginForm
					handleSubmit={this.handleSubmit}
					loading={loading}
				/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

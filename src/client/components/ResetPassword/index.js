import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Banner from "../Banner";
import ResetPasswordForm from "./ResetPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.user;
	return {
		isAuthenticated
	};
};

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			errors: {},
			message: "",
			passwordChanged: false
		}
		this.sendResetRequest = this.sendResetRequest.bind(this);
	}

	startXHR() {
		this.setState({ loading: true });
	}

	finishXHR(response) {
		this.setState({ errors: response.errors || {}, loading: false, message: response.message });
	}


	sendResetRequest(email, successCB) {
		const xhttp = new XMLHttpRequest();

		this.startXHR();

		xhttp.open("POST", "/profile/reset-password");

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			if(response.success) successCB();
			this.finishXHR(response);
		});

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send(JSON.stringify({ email }));
	}

	sendChangeRequest(token, password) {
		const xhttp = new XMLHttpRequest();

		this.startXHR();

		xhttp.open("POST", `/profile/reset-password/${token}`);

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			if(response.success) {
				this.setState({
					passwordChanged: true,
					errors: response.errors || {},
					loading: false,
					message: response.message
				});
			} else {
				this.finishXHR(response);
			}
		});

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send(JSON.stringify({ password }));
	}

	render() {
		const { loading, email, errors } = this.state;
		const { isAuthenticated } = this.props;

		if(isAuthenticated) return <Redirect to="/profile"/>;

		if(this.state.passwordChanged) {
			return (
				<Redirect to={{
					pathname: "/login",
					state: { message: this.state.message }
				}} />
			);
		}

		if(this.props.match.params["token"]) {
			let sendChangeRequest = (password) => {
				this.sendChangeRequest(this.props.match.params["token"], password);
			};

			return (
				<div>
					<Banner message={this.state.message} onDismiss={() => this.setState({ message: "" })}/>
					<ChangePasswordForm
						onSubmit={sendChangeRequest}
						errors={this.state.errors}
						loading={this.state.loading}
						passwordChanged={this.state.passwordChanged}
					/>
				</div>
			);
		}

		return (
			<div>
				<Banner message={this.state.message} onDismiss={() => this.setState({ message: "" })}/>
				<ResetPasswordForm
					onSubmit={this.sendResetRequest}
					errors={this.state.errors}
					loading={this.state.loading}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps)(ResetPassword);

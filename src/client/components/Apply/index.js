import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Banner from "../Banner";
import { sendApplicationXHR } from "../applicationHelper";
import { submitSuccess } from "../../actions";
import ApplyForm from "./ApplyForm";

const mapStateToProps = (state) => {
	const { isAuthenticated, applicationFields } = state.user;
	return {
		isAuthenticated,
		applicationFields
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ submitSuccess }, dispatch);
};

class Apply extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			errors: {},
			message: ""
		}
		this.submitApplication = this.submitApplication.bind(this);
	}

	startApply() {
		this.setState({ loading: true });
	}

	finishApply(response) {
		this.setState({ errors: response.errors || {}, loading: false, message: response.message });
		if(response.success) this.props.submitSuccess(response.application);
	}


	submitApplication(fields) {
		const xhttp = new XMLHttpRequest();

		this.startApply();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			this.finishApply(response);
		});

		sendApplicationXHR.call(xhttp, fields, "/apply");
	}

	render() {
		const { isAuthenticated, applicationFields } = this.props;
		
		if(!isAuthenticated) {
			console.log("routing to signup");
			return <Redirect to={{
							pathname: "/signup",
							state: { referrer: location.pathname }
						}}
					/>;
		}

		if(applicationFields) {
			return <Redirect to="/dashboard" />;
		}

		if(process.env["apps_released"] !== "true") { window.location.href = "/login" };
		
		return (
			<div>
				<Banner message={this.state.message} onDismiss={() => this.setState({ message: "" })}/>
				<h1>SB Hacks V Application</h1>
				<ApplyForm
					submitApplication={this.submitApplication}
					loading={this.state.loading}
					errors={this.state.errors}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Apply);

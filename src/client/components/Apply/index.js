import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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

function sendApplyXHR(fields) {
	this.open("POST", "/apply");

	var formData = new FormData();
	
	Object.keys(fields).forEach((field_name) => {
		fields[field_name] ? formData.append(field_name, fields[field_name]) : null;
	});

	this.send(formData);
}

class Apply extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			errors: {}
		}
		this.submitApplication = this.submitApplication.bind(this);
	}

	startUpdate() {
		this.setState({ loading: true });
	}

	finishUpdate(response, fields) {
		this.setState({ errors: response.errors || {}, loading: false });
		if(response.success) this.props.submitSuccess(fields);
	}


	submitApplication(fields) {
		console.log("Starting submit");
		const xhttp = new XMLHttpRequest();

		this.startUpdate();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			this.finishUpdate(response, fields);
		});

		sendApplyXHR.call(xhttp, fields);
	}

	render() {
		const { isAuthenticated, applicationFields } = this.props;
		
		if(!isAuthenticated) {
			return <Redirect to={{
							pathname: "/login",
							state: { referrer: location.pathname }
						}}
					/>;
		}

		if(applicationFields) {
			return <Redirect to="/profile" />;
		}

		return (
			<ApplyForm
				submitApplication={this.submitApplication}
				loading={this.state.loading}
				errors={this.state.errors}
			/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Apply);

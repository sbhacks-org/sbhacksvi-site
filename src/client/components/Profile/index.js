import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { bindActionCreators } from "redux";

import ProfileForm from "./ProfileForm";
import Banner from "./presenters/Banner";
import { populateWithApplicationFields } from "./profile-helpers";
import { updateSuccess } from "../../actions";

const mapStateToProps = (state) => {
	const { isAuthenticated, applicationFields, info } = state.user;
	return {
		isAuthenticated,
		applicationFields,
		info
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ updateSuccess }, dispatch);
}

function sendUpdateXHR(fields, originalApplication) {
	this.open("POST", "/profile/update");

	var formData = new FormData();
	
	Object.keys(fields).forEach((field_name) => {
		fields[field_name] !== originalApplication[field_name] ? formData.append(field_name, fields[field_name]) : null
	});

	this.send(formData)
}

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
			loading: false,
			message: ""
		}

		this.updateApplication = this.updateApplication.bind(this);
	}

	startUpdate() {
		this.setState({ loading: true });
	}

	finishUpdate(response, fields) {
		if(response.success) this.props.updateSuccess(fields);
		this.setState({ errors: response.errors || {}, loading: false, message: response.message });
	}

	
	updateApplication(fields) {
		const xhttp = new XMLHttpRequest();
		const { applicationFields: originalApplication } = this.props;

		this.startUpdate();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			this.finishUpdate(response, fields);
		});

		sendUpdateXHR.call(xhttp, fields, originalApplication);
	}

	render() {
		const { errors, loading } = this.state;
		const { isAuthenticated, applicationFields, info } = this.props;

		if(!isAuthenticated) {
			return <Redirect to={{
							pathname: "/login",
							state: { referrer: location.pathname }
						}}
					/>;
		}

		if(!applicationFields) {
			return (
				<div>You have not yet applied. Click <Link to="/apply">here</Link> to apply</div>
			);
		}

		return (
			<div>
				<Banner message={this.state.message} onDismiss={() => this.setState({ message: "" })}/>
				<a href={applicationFields.resume_url}>View resume here</a>
				<ProfileForm
					originalApplication={applicationFields}
					errors={errors}
					loading={loading}
					updateApplication={this.updateApplication}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

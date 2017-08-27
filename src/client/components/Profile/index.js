import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


import ProfileForm from "./ProfileForm";
import Banner from "./presenters/Banner";
import { populateWithApplicationFields } from "./profile-helpers";

const mapStateToProps = (state) => {
	const { isAuthenticated, application, info } = state.user;
	return {
		isAuthenticated,
		application,
		info
	}
}

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
			originalApplication: populateWithApplicationFields(props.application),
			loading: false,
			message: ""
		}

		this.submitApplication = this.submitApplication.bind(this);
	}

	submitApplication(fields) {
		const xhttp = new XMLHttpRequest();
		const { originalApplication } = this.state;

		this.setState({ loading: true });

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			this.setState({ errors: response.errors || {}, loading: false, message: response.message });
		});

		xhttp.open("POST", "/application/update");

		var formData = new FormData();
		
		Object.keys(fields).forEach((field_name) => {
			fields[field_name] !== originalApplication[field_name] ? formData.append(field_name, fields[field_name]) : null
		});

		xhttp.send(formData)
	}

	render() {
		const { originalApplication, errors, loading } = this.state;
		const { isAuthenticated, application, info } = this.props;

		if(!isAuthenticated) {
			return <Redirect to={{
							pathname: "/login",
							state: { referrer: location.pathname }
						}}
					/>;
		}

		if(!application) {
			return (
				<div>You have not yet applied</div>
			);
		}

		return (
			<div>
				<Banner message={this.state.message} onDismiss={() => this.setState({ message: "" })}/>
				<ProfileForm
					originalApplication={originalApplication}
					errors={errors}
					loading={loading}
					submitApplication={this.submitApplication}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Profile);

import React from "react";
import { connect } from "react-redux";

import ProfileForm from "./ProfileForm";
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
			loading: false
		}

		this.submitApplication = this.submitApplication.bind(this);
	}

	submitApplication(fields) {
		const xhttp = new XMLHttpRequest();

		this.setState({ loading: true });

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			if(response.success) return;
			this.setState({ errors: response.errors, loading: false });
		});

		xhttp.open("POST", "/application");

		var formData = new FormData();
		
		Object.keys(fields).forEach((field_name) => {
			// sending null is important; although a bit hacky in itself
			fields[field_name] ? formData.append(field_name, fields[field_name] || null) : null
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
			<ProfileForm
				originalApplication={originalApplication}
				errors={errors}
				loading={loading}
				submitApplication={this.submitApplication}
			/>
		);
	}
}

export default connect(mapStateToProps)(Profile);

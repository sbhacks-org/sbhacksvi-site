import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Grid, Button } from "semantic-ui-react";

import ProfileForm from "./ProfileForm";

import HasNotAppliedView from "./presenters/HasNotAppliedView";
import ApplicationResultView from "./presenters/ApplicationResultView";

import { sendApplicationXHR } from "../applicationHelper";
import { updateSuccess, rsvp } from "../../actions";

const mapStateToProps = (state) => {
	const { isAuthenticated, applicationFields, info } = state.user;
	return {
		isAuthenticated,
		applicationFields,
		info
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ updateSuccess, rsvp }, dispatch);
}

class ProfileEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
			loading: false,
			message: null
		}

		this.updateApplication = this.updateApplication.bind(this);
	}

	startUpdate() {
		this.setState({ loading: true });
	}

	finishUpdate(response) {
		this.setState({ errors: response.errors || {}, loading: false, message: response.message });
		if(response.success) this.props.updateSuccess(response.application);
	}

	
	updateApplication(fields) {
		const xhttp = new XMLHttpRequest();

		this.startUpdate();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			this.finishUpdate(response);
		});

		sendApplicationXHR.call(xhttp, fields, "/profile/edit");
	}

	render() {
		const { errors, loading, message } = this.state;
		const { isAuthenticated, applicationFields, info } = this.props;

		if(!isAuthenticated || !applicationFields || process.env["apps_released"] !== "true") {
			return <Redirect to="/login" />;
		}

		if (message) {
			return <Redirect to={{
							pathname: "/dashboard",
							state: { message }
						}}
					/>;
		}

		return (
			<div>
				<Grid>
					<Grid.Column>
						<ProfileForm
							originalApplication={applicationFields}
							errors={errors}
							loading={loading}
							updateApplication={this.updateApplication}
						/>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);

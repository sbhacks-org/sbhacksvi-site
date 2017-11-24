import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Grid, Button } from "semantic-ui-react";

import ProfileForm from "./ProfileForm";

import Banner from "../Banner";
import HasNotAppliedView from "./presenters/HasNotAppliedView";

import { sendApplicationXHR } from "../applicationHelper";
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

		sendApplicationXHR.call(xhttp, fields, "/profile/update");
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
				<HasNotAppliedView
					info={info}
				/>
			);
		}

		return (
			<div>
				<Banner message={this.state.message} onDismiss={() => this.setState({ message: "" })}/>
				<h1>Application Status: <strong>Submitted</strong></h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Button, Container, Divider, Segment } from "semantic-ui-react";

import Banner from "../Banner";
import AddInfo from "./AddInfo";
import Status from "./Status";

const mapStateToProps = (state) => {
	const { isAuthenticated, applicationFields, info } = state.user;
	return {
		isAuthenticated,
		applicationFields,
		info
	}
}

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
			showMessage: true
		}
	}

	render() {
		const { isAuthenticated, applicationFields, info, location } = this.props;
		const { showMessage } = this.state;

		const banner_msg = location ? (location.state ? location.state.message : null) : null;

		if(!isAuthenticated) {
			return <Redirect to={{
							pathname: "/login",
							state: { referrer: location.pathname }
						}}
					/>;
		}
		return (
			<div className = "dash">
				{ showMessage ? <Banner message={banner_msg} onDismiss={() => this.setState({ showMessage: false })}/> : null }
				<div className = "status">
					<Container textAlign='center'>
						<h1>Your Status:</h1>
					</Container>
					<Status application={applicationFields}/>
				</div>
				<Divider />
				<h1 className = "hello">Hello {info.first_name},</h1>
				<AddInfo
					info = {info}
					application={applicationFields}
				/>
			</div>
		);

	}
}

export default connect(mapStateToProps)(Dashboard);

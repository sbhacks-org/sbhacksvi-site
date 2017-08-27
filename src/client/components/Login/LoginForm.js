import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Segment } from "semantic-ui-react";

import Banner from "./Banner";

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: {
				email: "",
				password: ""
			},
			loading: false,
			errors: {}
		}

		this.handleSubmit = this.props.handleSubmit.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss() {
		this.setState({ errors: {} })
	}

	render() {
		const { fields, errors, showMessage, loading, redirect_url } = this.state;
		const { email, password } = fields;
		const { location: { state }, isAuthenticated } = this.props;

		if(isAuthenticated) {
			return <Redirect to={ state ? state.referrer : "/dashboard"} />;
		}
		return (
			<div>
				<Banner onDismiss={this.onDismiss} errors={errors} />
				<Form size="large" action="/login" method="POST" onSubmit={this.handleSubmit}>
					<Segment>
						<Form.Field>
							<label>Email</label>
							<Form.Input
								disabled={loading}
								fluid
								icon="at"
								iconPosition="left"
								placeholder="Email Address"
								name="email"
								type="email"
								value={email}
								onChange={(el) => this.setState({
									fields: Object.assign({}, fields, { email: el.target.value })
								})}
				            />
						</Form.Field>
						<Form.Field>
							<label>Password</label>
							<Form.Input
								disabled={loading}
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								name="password"
								type="password"
								value={password}
								onChange={(el) => this.setState({
									fields: Object.assign({}, fields, { password: el.target.value })
								})}
				            />
						</Form.Field>
						<Button loading={loading} color='blue' fluid size='large'>Login</Button>
					</Segment>
				</Form>
			</div>
		);
	}
}

export default Login;

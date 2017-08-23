import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Segment } from "semantic-ui-react";

import { createHandleSubmit } from "../../form-helper";
import Banner from "./Banner";

class Signup extends React.Component {
	constructor() {
		super();

		this.state = {
			fields: {
				email: "",
				password: ""
			},
			loading: false,
			errors: {},
			isAuthenticated: window.__IS_AUTHENTICATED__
		}

		this.handleSubmit = createHandleSubmit("/login").bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss() {
		this.setState({ errors: {} })
	}

	render() {
		const { isAuthenticated, fields, errors, showMessage, loading } = this.state;
		const { email, password } = fields;
		if(isAuthenticated) {
			return <Redirect to="/dashboard" />;
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

export default Signup;

import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Segment, Label } from "semantic-ui-react";

import LoginButton from "./LoginButton";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		}

		this.handleSubmit = (evt) => {
			evt.preventDefault();
			this.props.handleSubmit(this.state);
		};
	}

	render() {
		const { email, password }  = this.state;
		const { loading, errors } = this.props;
		
		return (
			<div>
				<Form size="large" action="/login" method="POST" onSubmit={this.handleSubmit} loading={loading}>
					<Form.Field required>
						<label>Email</label>
						<Input
							fluid
							icon="envelope outline"
							iconPosition="left"
							placeholder="Email Address"
							name="email"
							type="email"
							value={email}
							onChange={(el) => this.setState({ email: el.target.value })}
			            />
			            { Boolean(errors.email) ? <Label basic color='red' pointing>{errors.email}</Label> : null }
					</Form.Field>
					<Form.Field required>
						<label>Password</label>
						<Input
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							name="password"
							type="password"
							value={password}
							onChange={(el) => this.setState({ password: el.target.value })}
			            />
			            { Boolean(errors.password) ? <Label basic color='red' pointing>{errors.password}</Label> : null }
					</Form.Field>
					<LoginButton {...this.state} />
				</Form>
			</div>
		);
	}
}

export default LoginForm;

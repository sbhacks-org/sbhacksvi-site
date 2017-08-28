import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Segment } from "semantic-ui-react";


class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		}

		this.handleSubmit = this.props.handleSubmit.bind(this);
	}

	render() {
		const { email, password }  = this.state;
		const { loading } = this.props;
		
		return (
			<div>
				<Form size="large" action="/login" method="POST" onSubmit={(evt) => this.handleSubmit(evt, this.state)} loading={loading}>
					<Segment>
						<Form.Field>
							<label>Email</label>
							<Form.Input
								fluid
								icon="at"
								iconPosition="left"
								placeholder="Email Address"
								name="email"
								type="email"
								value={email}
								onChange={(el) => this.setState({ email: el.target.value })}
				            />
						</Form.Field>
						<Form.Field>
							<label>Password</label>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								name="password"
								type="password"
								value={password}
								onChange={(el) => this.setState({ password: el.target.value })}
				            />
						</Form.Field>
						<Button color='blue' fluid size='large'>Login</Button>
					</Segment>
				</Form>
			</div>
		);
	}
}

export default LoginForm;

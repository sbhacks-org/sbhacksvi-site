import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Segment, Label } from "semantic-ui-react";

class SignupForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			first_name: "",
			last_name: "",
			email: "",
			password: ""
		}
		this.handleSubmit = (evt) => {
			evt.preventDefault();
			this.props.handleSubmit(this.state);
		}
	}

	updateField(field_name, field_value) {
		this.setState({ [field_name]: field_value });
	}

	render() {
		const { loading, errors } = this.props;

		return (
			<Form size="large" onSubmit={this.handleSubmit} loading={loading}>
				<Segment stacked>
					<Form.Group widths="equal">
						<Form.Field error={Boolean(errors.first_name)}>
							<label>First Name</label>
							<Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="First Name"
								name="first_name"
								type="text"
								value={this.state.first_name}
								onChange={(el) => this.updateField("first_name", el.target.value) }
				            />
				            { Boolean(errors.first_name) ? <Label basic color='red' pointing>{errors.first_name}</Label> : null }
						</Form.Field>
						<Form.Field error={Boolean(errors.last_name)}>
							<label>Last Name</label>
							<Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="Last Name"
								name="last_name"
								type="text"
								value={this.state.last_name}
								onChange={(el) => this.updateField("last_name", el.target.value)}
				            />
				           	{ Boolean(errors.last_name) ? <Label basic color='red' pointing>{errors.last_name}</Label> : null }
						</Form.Field>
					</Form.Group>
					<Form.Field error={Boolean(errors.email)}> 
						<label>Email</label>
						<Input
							fluid
							icon="at"
							iconPosition="left"
							placeholder="Email Address"
							name="email"
							type="email"
							value={this.state.email}
							onChange={(el) => this.updateField("email", el.target.value)}
			            />
			            { Boolean(errors.email) ? <Label basic color='red' pointing>{errors.email}</Label> : null }
					</Form.Field>
					<Form.Field	error={Boolean(errors.password)}>
						<label>Password</label>
						<Input
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							name="password"
							type="password"
							value={this.state.password}
							onChange={(el) => this.updateField("password", el.target.value)}
			            />
			            { Boolean(errors.password) ? <Label basic color='red' pointing>{errors.password}</Label> : null }
					</Form.Field>
					<Button color='blue' fluid size='large'>Signup</Button>
				</Segment>
			</Form>
		);
	}
}

export default SignupForm;

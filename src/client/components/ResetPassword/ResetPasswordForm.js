import React from "react";
import { Form, Input, Button, Label } from "semantic-ui-react";
import ResetPasswordButton from "./ResetPasswordButton";

class ResetPasswordForm extends React.Component {
	constructor() {
		super();

		this.state = {
			email: ""
		}

		this.handleSubmit = (evt) => {
			evt.preventDefault();
			this.props.onSubmit(this.state.email, () => this.setState({ email: "" }));
		};
	}

	render() {
		const { onSubmit, loading, errors } = this.props;

		return (
			<Form size="large" action="/reset-password" method="POST" onSubmit={this.handleSubmit} loading={loading}>
				<Form.Field required>
					<label>Email</label>
					<Input
						fluid
						icon="at"
						iconPosition="left"
						placeholder="Email Address"
						name="email"
						type="email"
						value={this.state.email}
						onChange={(el) => this.setState({ email: el.target.value })}
		            />
		            { Boolean(errors.email) ? <Label basic color='red' pointing>{errors.email}</Label> : null }
				</Form.Field>
				<ResetPasswordButton email={this.state.email}/>
			</Form>
		);
	}
};

export default ResetPasswordForm;

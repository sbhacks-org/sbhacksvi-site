import React from "react";
import { Form, Input, Button, Label } from "semantic-ui-react";
import ChangePasswordButton from "./ChangePasswordButton";

class ChangePasswordForm extends React.Component {
	constructor() {
		super();

		this.state = {
			password: ""
		}

		this.handleSubmit = (evt) => {
			evt.preventDefault();
			this.props.onSubmit(this.state.password);
		};
	}

	render() {
		const { onSubmit, loading, errors } = this.props;

		return (
			<Form size="large" onSubmit={this.handleSubmit} loading={loading}>
				<Form.Field required>
					<label>Password</label>
					<Input
						fluid
						icon="at"
						iconPosition="left"
						placeholder="New Password"
						name="password"
						type="password"
						value={this.state.password}
						onChange={(el) => this.setState({ password: el.target.value })}
		            />
		            { Boolean(errors.password) ? <Label basic color='red' pointing>{errors.password}</Label> : null }
				</Form.Field>
				<ChangePasswordButton password={this.state.password}/>
			</Form>
		);
	}
};

export default ChangePasswordForm;

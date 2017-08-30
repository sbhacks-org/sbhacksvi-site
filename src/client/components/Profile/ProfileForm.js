import React from "react";
import { Form, Input, Dropdown, Icon } from "semantic-ui-react";

import FileInput from "./presenters/FileInput";
import UpdateApplicationButton from "./presenters/UpdateApplicationButton";

import * as opts from "../../constants/opts";

class ProfileForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = props.originalApplication;
		this.updateApplication = (evt) => {
			evt.preventDefault();
			props.updateApplication(this.state);
		};
	}

	updateField(field_name, field_value) {
		this.setState({ [field_name]: field_value });
	}

	componentWillReceiveProps(nextProps) {
		if(Object.keys(nextProps.errors) == 0) {
			this.setState({ ...nextProps.originalApplication, resume: undefined });
		}
	}

	render() {
		const { errors, originalApplication, loading } = this.props;
		
		return (
			<Form id="login-form" onSubmit={this.updateApplication} loading={loading}>
				<Form.Group>
				    <Form.Field width={6} error={Boolean(errors["school_id"])}>
				      <label>School</label>
				      <Dropdown
				      	placeholder="What school do you currently attend?"
				      	selection
				      	search
				      	options={opts.school}
				      	onChange={(evt, { value }) => this.updateField("school_id", value)}
				      	value={this.state.school_id}
				      />
				    </Form.Field>


				    <Form.Field width={5}>
				      <label>Level of study</label>
				      <Dropdown
				      	placeholder="What is your level of study?"
				      	selection
				      	options={opts.level_of_study}
						onChange={(evt, { value }) => this.updateField("level_of_study", value)}
						value={this.state.level_of_study}
				      />
				    </Form.Field>

				    <Form.Field width={5}>
				      <label>Graduation Year</label>
				      <Dropdown
				      	placeholder="year"
				      	selection
				      	options={opts.graduation_year}
				      	onChange={(evt, { value }) => this.updateField("graduation_year", value)}
				      	value={this.state.graduation_year}
				      />
				    </Form.Field>
				</Form.Group>

			    <Form.Group widths="equal">
				    <Form.Field>
				    	<label>Github</label>
				    	<Input
				    		fluid
				    		icon="at"
				    		iconPosition="left"
				    		placeholder="github username"
				    		onChange={(evt, { value }) => this.updateField("github", value)}
				    		value={this.state.github}
				    	/>
				    </Form.Field>

				    <Form.Field>
				    	<label>Linkedin</label>
				    	<Input
				    		fluid
				    		icon="at"
				    		iconPosition="left"
				    		placeholder="linkedin username"
				    		onChange={(evt, { value }) => this.updateField("linkedin", value)}
				    		value={this.state.linkedin}
				    	/>
				    </Form.Field>

				    <Form.Field>
				    	<label>Major</label>
				    	<Input
				    		fluid
				    		placeholder="e.g. Computer Science"
				    		onChange={(evt, { value }) => this.updateField("major", value)}
				    		value={this.state.major}
				    	/>
				    </Form.Field>
				</Form.Group>

			    <Form.Group>
				    <Form.Field width={9}>
				      <label>Gender</label>
				      <Dropdown
				      	placeholder="gender"
				      	selection
				      	options={opts.gender}
				      	onChange={(evt, { value }) => this.updateField("gender", value)}
				      	value={this.state.gender}
				      />
				    </Form.Field>

				    <Form.Field width={7}>
				    	<label>Phone Number</label>
				    	<Input
				    		fluid
				    		placeholder="Don't worry we won't call you unless it's an emergency"
				    		onChange={(evt, { value }) => this.updateField("phone_number", value)}
				    		value={this.state.phone_number}
				    	/>
				    </Form.Field>
				</Form.Group>
				<Form.Group widths="equal">
				    <Form.Field>
				      <label>Shirt Size</label>
				      <Dropdown
				      	placeholder="These are unisex sizes"
				      	selection
				      	options={opts.shirt_size}
				      	onChange={(evt, { value }) => this.updateField("shirt_size", value)}
				      	value={this.state.shirt_size}
				      />
				    </Form.Field>

				    <Form.Field>
				      <label>Transportation</label>
				      <Dropdown
				      	placeholder="Transportation"
				      	selection
				      	options={opts.transportation}
				      	onChange={(evt, { value }) => this.updateField("transportation", value)}
				      	value={this.state.transportation}
				      />
				    </Form.Field>
				</Form.Group>

				<Form.Field>
					<label>Upload Resume (PDF Only)</label>
					<FileInput
						type="file"
						onChange={(evt) => this.updateField("resume", evt.target.files[0])}
						accept="application/pdf"
					/>
					
				</Form.Field>

				<UpdateApplicationButton
					originalApplication={originalApplication}
					fields={this.state}
				/>

			</Form>
		);
	}
}

export default ProfileForm;

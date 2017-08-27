import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Dropdown, Icon } from "semantic-ui-react";

import FileInput from "./FileInput";
import UpdateApplicationButton from "./UpdateApplicationButton";

const school_opts = [
	{ key: "UC Santa Barbara", value: 6, text: "UC Santa Barbara" }
]

class ProfileForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = props.originalApplication;
		this.submitApplication = () => props.submitApplication(this.state.fields);
	}

	updateField(field_name, field_value) {
		this.setState({ [field_name]: field_value });
	}

	render() {
		const { errors, originalApplication, loading } = this.props;
		
		return (
			<Form id="login-form" onSubmit={this.submitApplication} loading={loading}>
				<Form.Group>
				    <Form.Field width={6} error={Boolean(errors["school"])}>
				      <label>School</label>
				      <Dropdown
				      	placeholder="What school do you currently attend?"
				      	selection
				      	search
				      	options={school_opts}
				      	onChange={(evt, { value }) => this.updateField("school", value)}
				      	value={this.state.school_id}
				      />
				    </Form.Field>


				    <Form.Field width={5}>
				      <label>Level of study</label>
				      <Dropdown
				      	placeholder="What is your level of study?"
				      	selection
				      	options={[
				      		{ key: "High School", value: "High School", text: "High School" },
				      		{ key: "Undergraduate", value: "Undergraduate", text: "Undergraduate" },
				      		{ key: "Graduate", value: "Graduate", text: "Graduate" }
				      	]}
						onChange={(evt, { value }) => this.updateField("level_of_study", value)}
						value={this.state.level_of_study}
				      />
				    </Form.Field>

				    <Form.Field width={5}>
				      <label>Graduation Year</label>
				      <Dropdown
				      	placeholder="year"
				      	selection
				      	options={[
				      		{ key: "2017", value: "2017", text: "2016" },
							{ key: "2018", value: "2018", text: "2018" },
							{ key: "2019", value: "2019", text: "2019" },
							{ key: "2020", value: "2020", text: "2020" },
				      		{ key: "2021", value: "2021", text: "2021" }
				      	]}
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
				      	options={[
				      		{ key: "Male", value: "Male", text: "Male" },
				      		{ key: "Female", value: "Female", text: "Female" },
				      		{ key: "Other", value: "Other", text: "Other" }
				      	]}
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
				      	options={[
				      		{ key: "S", value: "S", text: "Small" },
				      		{ key: "M", value: "M", text: "Medium" },
				      		{ key: "L", value: "L", text: "Large" },
				      		{ key: "XL", value: "XL", text: "X-Large" }
				      	]}
				      	onChange={(evt, { value }) => this.updateField("shirt_size", value)}
				      	value={this.state.shirt_size}
				      />
				    </Form.Field>

				    <Form.Field>
				      <label>Transportation</label>
				      <Dropdown
				      	placeholder="Transportation"
				      	selection
				      	options={[
				      		{ key: "1", value: "1", text: "I can provide my own means of transportation" },
				      		{ key: "2", value: "2", text: "I would prefer to be provided bussing in California" },
				      		{ key: "3", value: "3", text: "I require travel reimbursement (This may or may not be something we can provide)" },
				      	]}
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

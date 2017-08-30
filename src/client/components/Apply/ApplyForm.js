import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Dropdown, Icon, Label, Message } from "semantic-ui-react";

import FileInput from "./FileInput";
import ApplyButton from "./ApplyButton";

import * as opts from "../../constants/opts";

class ApplyForm extends React.Component {
	constructor() {
		super();

		this.state = {
			school_id: "",
			level_of_study: "",
			graduation_year: "",
			github: "",
			linkedin: "",
			major: "",
			gender: "",
			phone_number: "",
			shirt_size: "",
			transportation: "",
			resume: ""
		}
		this.submitApplication = (evt) => {
			evt.preventDefault();
			this.props.submitApplication(this.state);
		};
	}

	updateField(field_name, field_value) {
		this.setState({	[field_name]: field_value });
	}

	render() {
		const { loading, errors } = this.props;

		return (
			<Form id="login-form" onSubmit={this.submitApplication} loading={loading}>
				<Form.Group>
				    <Form.Field width={6} error={Boolean(errors["school_id"])} required>
				      <label>What school do you currently attend?</label>
				      <Dropdown
				      	placeholder="Choose a school"
				      	selection
				      	search
				      	options={opts.school}
				      	onChange={(evt, { value }) => this.updateField("school_id", value)}
				      	allowAdditions
				      	additionPosition="bottom"
				      />
				      { Boolean(errors.school_id) ? <Label basic color='red' pointing>{errors.school_id}</Label> : null }
				    </Form.Field>

				    <Form.Field width={5} required>
				      <label>Which degree are you pursuing?</label>
				      <Dropdown
				      	placeholder="e.g. Bachelor's (Undergraduate)"
				      	selection
				      	options={opts.level_of_study}
						onChange={(evt, { value }) => this.updateField("level_of_study", value)}
				      />
				      { Boolean(errors.level_of_study) ? <Label basic color='red' pointing>{errors.level_of_study}</Label> : null }
				    </Form.Field>

				    <Form.Field width={5} required>
				      <label>When do you graduate?</label>
				      <Dropdown
				      	placeholder="Choose your graduation year"
				      	selection
				      	options={opts.graduation_year}
				      	onChange={(evt, { value }) => this.updateField("graduation_year", value)}
				      />
				      { Boolean(errors.graduation_year) ? <Label basic color='red' pointing>{errors.graduation_year}</Label> : null }
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
				    	/>
				    	{ Boolean(errors.github) ? <Label basic color='red' pointing>{errors.github}</Label> : null }
				    </Form.Field>

				    <Form.Field>
				    	<label>Linkedin</label>
				    	<Input
				    		fluid
				    		icon="at"
				    		iconPosition="left"
				    		placeholder="linkedin username"
				    		onChange={(evt, { value }) => this.updateField("linkedin", value)}
				    	/>
				    	{ Boolean(errors.linkedin) ? <Label basic color='red' pointing>{errors.linkedin}</Label> : null }
				    </Form.Field>

				    <Form.Field required>
				    	<label>What's your major?</label>
				    	<Dropdown
				    		fluid
				    		placeholder="Choose a major."
				    		selection
				    		search
				    		options={opts.major}
				    		onChange={(evt, { value }) => this.updateField("major", value)}
				    	/>
				    	{ Boolean(errors.major) ? <Label basic color='red' pointing>{errors.major}</Label> : null }
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
				      />
				      { Boolean(errors.gender) ? <Label basic color='red' pointing>{errors.gender}</Label> : null }
				    </Form.Field>

				    <Form.Field width={7}>
				    	<label>Phone Number</label>
				    	<Input
				    		fluid
				    		placeholder="Don't worry we won't call you unless it's an emergency"
				    		onChange={(evt, { value }) => this.updateField("phone_number", value)}
				    	/>
				    	{ Boolean(errors.phone_number) ? <Label basic color='red' pointing>{errors.phone_number}</Label> : null }
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
				      />
				      { Boolean(errors.shirt_size) ? <Label basic color='red' pointing>{errors.shirt_size}</Label> : null }
				    </Form.Field>

				    <Form.Field>
				      <label>Transportation</label>
				      <Dropdown
				      	placeholder="Transportation"
				      	selection
				      	options={opts.transportation}
				      	onChange={(evt, { value }) => this.updateField("transportation", value)}
				      />
				    </Form.Field>
				    { Boolean(errors.transportation) ? <Label basic color='red' pointing>{errors.transportation}</Label> : null }
				</Form.Group>

				<FileInput onChange={(evt) => this.updateField("resume", evt.target.files[0])} />

			    <ApplyButton {...this.state} />

			</Form>
		);
	}
}

export default ApplyForm;

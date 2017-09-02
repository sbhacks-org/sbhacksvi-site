import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Dropdown, Icon, Label, Message } from "semantic-ui-react";

import FileInput from "./FileInput";
import ApplyButton from "./ApplyButton";

import * as Fields from "../Fields";
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

	handleAddition(school_name) {
		opts.school.push({ text: school_name, value: school_name })
	}


	render() {
		const { loading, errors } = this.props;

		return (
			<Form id="login-form" onSubmit={this.submitApplication} loading={loading}>
				<Form.Group>
				    <Fields.School
				    	error={errors["school_id"]}
				    	opts={opts.school}
				    	onChange={(evt, { value }) => this.updateField("school_id", value)}
				    	value={this.state.school_id}
				    	onAddItem={(evt, { value }) => this.handleAddition(value)}
				    />

				    <Fields.LevelOfStudy
				    	error={errors["level_of_study"]}
				    	opts={opts.level_of_study}
				    	onChange={(evt, { value }) => this.updateField("level_of_study", value)}
				    />

				    <Fields.GraduationYear
				    	error={errors["graduation_year"]}
				    	opts={opts.graduation_year}
				    	onChange={(evt, { value }) => this.updateField("graduation_year", value)}
				    />
				</Form.Group>

			    <Form.Group widths="equal">
				    <Fields.Github
				    	error={errors["github"]}
				    	onChange={(evt, { value }) => this.updateField("github", value)}
				    />

				    <Fields.Linkedin
				    	error={errors["linkedin"]}
				    	onChange={(evt, { value }) => this.updateField("linkedin", value)}
				    />

				    <Fields.Major
				    	error={errors["major"]}
				    	opts={opts.major}
				    	onChange={(evt, { value }) => this.updateField("major", value)}
				    />
				</Form.Group>

			    <Form.Group>
				    <Fields.Gender
				    	error={errors["gender"]}
				    	opts={opts.gender}
				    	onChange={(evt, { value }) => this.updateField("gender", value)}
				    />

				    <Fields.PhoneNumber
				    	error={errors["phone_number"]}
				    	onChange={(evt, { value }) => this.updateField("phone_number", value)}
				    />
				</Form.Group>
				<Form.Group widths="equal">
				    <Fields.ShirtSize
				    	error={errors["shirt_size"]}
				    	opts={opts.shirt_size}
				    	onChange={(evt, { value }) => this.updateField("shirt_size", value)}
				    />

				    <Fields.Transportation
				    	error={errors["transportation"]}
				    	opts={opts.transportation}
				    	onChange={(evt, { value }) => this.updateField("transportation", value)}
				    />
				</Form.Group>

				<FileInput onChange={(evt) => this.updateField("resume", evt.target.files[0])} />

			    <ApplyButton {...this.state} />

			</Form>
		);
	}
}

export default ApplyForm;

import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Dropdown, Icon, Label, Message, Checkbox } from "semantic-ui-react";

import ApplyButton from "./ApplyButton";

import * as Fields from "../Fields";
import * as opts from "../../constants/opts";

import { fetchSchoolList, addToSchoolList } from "../../actions";

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
			dietary_restrictions: [],
			essay_answer: "",
			essay_answer_2: "",
			resume: "",
			mlh: false,
			share_mlh: false
		}
		this.submitApplication = (evt) => {
			evt.preventDefault();
			this.props.submitApplication(this.state);
		};

		this.updateSchool = (evt, { value }) => {
			let found = false;

			this.props.school_opts.forEach(opt => opt.value === value ? found = true : null);

			if(found === false) {
				this.props.addToSchoolList(value);
			}
			
			this.updateField("school_id", value);
		}
		this.updateLevelOfStudy = (evt, { value }) => this.updateField("level_of_study", value);
		this.updateGraduationYear = (evt, { value }) => this.updateField("graduation_year", value);
		this.updateGithub = (evt, { value }) => this.updateField("github", value);
		this.updateLinkedin = (evt, { value }) => this.updateField("linkedin", value);
		this.updateMajor = (evt, { value }) => this.updateField("major", value);
		this.updateGender = (evt, { value }) => this.updateField("gender", value);
		this.updatePhoneNumber = (evt, { value }) => this.updateField("phone_number", value);
		this.updateShirtSize = (evt, { value }) => this.updateField("shirt_size", value);
		this.updateTransportation = (evt, { value }) => this.updateField("transportation", value);
		this.updateDietaryRestrictions = (evt, { value }) => this.updateField("dietary_restrictions", value);
		this.updateAdditionalDetails = (evt, { value }) => this.updateField("essay_answer", value);
		this.updateAdditionalDetails2 = (evt, { value }) => this.updateField("essay_answer_2", value);
		this.updateResume = (status) => this.updateField("resume", status);
		this.updateMlh = (evt) => this.updateField("mlh", !this.state.mlh);
		this.updateShareMlh = (evt) => this.updateField("share_mlh", !this.state.share_mlh);
	}

	updateField(field_name, field_value) {
		this.setState({	[field_name]: field_value });
	}

	componentDidMount() {
		this.props.fetchSchoolList();
	}

	render() {
		const { loading, errors, school_opts } = this.props;

		return (
			<Form id="login-form" onSubmit={this.submitApplication} loading={loading}>
				<Form.Group>
				    <Fields.School
				    	error={errors["school_id"]}
				    	options={school_opts}
				    	onChange={this.updateSchool}
				    	value={this.state.school_id}
				    />
 					<Fields.LevelOfStudy
				    	error={errors["level_of_study"]}
				    	options={opts.level_of_study}
				    	onChange={this.updateLevelOfStudy}
				    	value={this.state.level_of_study}
				    />

				    <Fields.GraduationYear
				    	error={errors["graduation_year"]}
				    	options={opts.graduation_year}
				    	onChange={this.updateGraduationYear}
				    	value={this.state.graduation_year}
				    />
				</Form.Group>

			    <Form.Group widths="equal">
				    <Fields.Github
				    	error={errors["github"]}
				    	onChange={this.updateGithub}
				    	value={this.state.github}
				    />

				    <Fields.Linkedin
				    	error={errors["linkedin"]}
				    	onChange={this.updateLinkedin}
				    	value={this.state.linkedin}
				    />

				    <Fields.Major
				    	error={errors["major"]}
				    	initialOpts={opts.major}
				    	onChange={this.updateMajor}
				    	value={this.state.major}
				    />
				</Form.Group>

			    <Form.Group>
				    <Fields.Gender
				    	error={errors["gender"]}
				    	opts={opts.gender}
				    	onChange={this.updateGender}
				    	value={this.state.gender}
				    />

				    <Fields.PhoneNumber
				    	error={errors["phone_number"]}
				    	onChange={this.updatePhoneNumber}
				    	value={this.state.phone_number}
				    />
				</Form.Group>
				<Form.Group widths="equal">
				    <Fields.ShirtSize
				    	error={errors["shirt_size"]}
				    	opts={opts.shirt_size}
				    	onChange={this.updateShirtSize}
				    	value={this.state.shirt_size}
				    />

				    <Fields.DietaryRestrictions
				    	error={errors["dietary_restrictions"]}
				    	opts={opts.dietary_restrictions}
				    	onChange={this.updateDietaryRestrictions}
				    	value={this.state.dietary_restrictions}
				    />

				</Form.Group>

				<Form.Group widths="equal">
					<Fields.Transportation
				    	error={errors["transportation"]}
				    	opts={opts.transportation}
				    	onChange={this.updateTransportation}
				    	value={this.state.transportation}
				    />
				</Form.Group>

				<Form.TextArea
					label='What is a project/experience that you are proud of? (Optional, up to 1000 characters)'
					placeholder='Tell us more about you...'
					onChange={this.updateAdditionalDetails}
					value={this.state.essay_answer}
					maxLength={1000}
					rows={5}
				/>

				<Form.TextArea
					label='If you had infinite money and time, what would you create? Why? (Optional, up to 1000 characters)'
					placeholder='Tell us more about you...'
					onChange={this.updateAdditionalDetails2}
					value={this.state.essay_answer_2}
					maxLength={1000}
					rows={5}
				/>

				<Fields.FileInput
					error={errors["resume"]}
					labelName="Upload Resume (PDF Only, 4 MB max)"
					onUpload={this.updateResume}
					required
				/>

				<Checkbox
					label={
						<label>
							<i>I agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a></i>
						</label>
					}
					checked={this.state.mlh}
					onChange={this.updateMlh}
				/>

				<Checkbox
					label={
						<label>
							<i>I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the MLH Privacy Policy. I further I agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy.</i>
						</label>
					}
					checked={this.state.share_mlh}
					onChange={this.updateShareMlh}
				/>

			    <ApplyButton {...this.state} />

			</Form>
		);
	}
}

const mapStateToProps = (state) => {
	const { school_opts } = state.application;
	return { school_opts };
}

export default connect(mapStateToProps, { fetchSchoolList, addToSchoolList })(ApplyForm);

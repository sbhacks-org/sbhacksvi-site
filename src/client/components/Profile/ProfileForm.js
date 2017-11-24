import React from "react";
import { connect } from "react-redux";
import { Form, Input, Dropdown, Icon } from "semantic-ui-react";

import UpdateApplicationButton from "./presenters/UpdateApplicationButton";

import * as Fields from "../Fields";
import * as opts from "../../constants/opts";

import { fetchSchoolList, addToSchoolList } from "../../actions";

class ProfileForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = props.originalApplication;
		this.updateApplication = (evt) => {
			evt.preventDefault();
			props.updateApplication(this.state);
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
	}

	updateField(field_name, field_value) {
		this.setState({ [field_name]: field_value });
	}

	componentWillReceiveProps(nextProps) {
		if(Object.keys(nextProps.errors).length === 0
			&& nextProps.originalApplication !== this.props.originalApplication) {
			this.setState({ ...nextProps.originalApplication });
			this.props.fetchSchoolList();
		}
	}

	componentDidMount() {
		this.props.fetchSchoolList();
	}

	render() {
		const { errors, originalApplication, loading, school_opts } = this.props;
		
		return (
			<Form id="login-form" onSubmit={this.updateApplication} loading={loading}>
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

				<Fields.FileInput 
					error={errors["resume"]}
					labelName="Update Resume (PDF Only, 4 MB max)"
					applicationSubmitted
				/>

				<UpdateApplicationButton
					originalApplication={originalApplication}
					fields={this.state}
				/>

			</Form>
		);
	}
}

const mapStateToProps = (state) => {
	const { school_opts } = state.application;
	return { school_opts };
}


export default connect(mapStateToProps, { fetchSchoolList, addToSchoolList })(ProfileForm);

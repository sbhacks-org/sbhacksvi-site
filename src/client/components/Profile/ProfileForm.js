import React from "react";
import { connect } from "react-redux";
import { Form, Input, Dropdown, Icon } from "semantic-ui-react";

import UpdateApplicationButton from "./presenters/UpdateApplicationButton";

import * as Fields from "../Fields";
import * as opts from "../../constants/opts";

import { fetchSchoolList, addToSchoolList } from "../../actions";

function addCurrentMajorToList(currentMajor) {
	let found = false;

	opts.major.forEach(major => major.value === currentMajor ? found = true : null);

	if(found === false) {
		opts.major.push({ text: currentMajor, value: currentMajor, text: currentMajor });
	}
};

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
		if(Object.keys(nextProps.errors).length === 0
			&& nextProps.originalApplication !== this.props.originalApplication) {
			this.setState({ ...nextProps.originalApplication, resume: undefined });
		}
	}

	componentDidMount() {
		addCurrentMajorToList(this.state.major);
		this.props.fetchSchoolList();
	}

	render() {
		const { errors, originalApplication, loading, school_opts, addToSchoolList } = this.props;
		
		return (
			<Form id="login-form" onSubmit={this.updateApplication} loading={loading}>
				<Form.Group>
				    <Fields.School
				    	error={errors["school_id"]}
				    	options={school_opts}
				    	onChange={(evt, { value }) => this.updateField("school_id", value)}
				    	value={this.state.school_id}
				    	onAddItem={(evt, { value }) => addToSchoolList(value)}
				    />


				    <Fields.LevelOfStudy
				    	error={errors["level_of_study"]}
				    	options={opts.level_of_study}
				    	onChange={(evt, { value }) => this.updateField("level_of_study", value)}
				    	value={this.state.level_of_study}
				    />

				    <Fields.GraduationYear
				    	error={errors["graduation_year"]}
				    	options={opts.graduation_year}
				    	onChange={(evt, { value }) => this.updateField("graduation_year", value)}
				    	value={this.state.graduation_year}
				    />
				</Form.Group>

			    <Form.Group widths="equal">
				    <Fields.Github
				    	error={errors["github"]}
				    	onChange={(evt, { value }) => this.updateField("github", value)}
				    	value={this.state.github}
				    />

				    <Fields.Linkedin
				    	error={errors["linkedin"]}
				    	onChange={(evt, { value }) => this.updateField("linkedin", value)}
				    	value={this.state.linkedin}
				    />

				    <Fields.Major
				    	error={errors["major"]}
				    	opts={opts.major}
				    	onChange={(evt, { value }) => this.updateField("major", value)}
				    	value={this.state.major}
				    	onAddItem={(evt, { value }) => opts.major.push({ text: value, key: value, value })}
				    />
				</Form.Group>

			    <Form.Group>
				    <Fields.Gender
				    	error={errors["gender"]}
				    	opts={opts.gender}
				    	onChange={(evt, { value }) => this.updateField("gender", value)}
				    	value={this.state.gender}
				    />

				    <Fields.PhoneNumber
				    	error={errors["phone_number"]}
				    	onChange={(evt, { value }) => this.updateField("phone_number", value)}
				    	value={this.state.phone_number}
				    />
				</Form.Group>
				<Form.Group widths="equal">
				    <Fields.ShirtSize
				    	error={errors["shirt_size"]}
				    	opts={opts.shirt_size}
				    	onChange={(evt, { value }) => this.updateField("shirt_size", value)}
				    	value={this.state.shirt_size}
				    />

				    <Fields.Transportation
				    	error={errors["transportation"]}
				    	opts={opts.transportation}
				    	onChange={(evt, { value }) => this.updateField("transportation", value)}
				    	value={this.state.transportation}
				    />
				</Form.Group>

				<Fields.FileInput 
					error={errors["resume"]}
					labelName="Update Resume (PDF Only, 4 MB max)"
					onChange={(evt) => this.updateField("resume", evt.target.files[0])}
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

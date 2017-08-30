import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const LevelOfStudy = ({ error, onChange, opts, defaultValue }) => {
	return (
		<Form.Field width={5} required error={Boolean(error)}>
			<label>Which degree are you pursuing?</label>
			<Dropdown
				placeholder="e.g. Bachelor's (Undergraduate)"
				selection
				options={opts}
				onChange={onChange}
				defaultValue={defaultValue}
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
}

export default LevelOfStudy;

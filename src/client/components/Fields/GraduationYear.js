import React from "react";
import { Form, Dropdown } from "semantic-ui-react";

const GraduationYear = ({ error, onChange, opts, defaultValue }) => {
	return (
		<Form.Field width={5} error={Boolean(error)} required>
			<label>When do you graduate?</label>
			<Dropdown
				placeholder="Choose your graduation year"
				selection
				options={opts}
				onChange={onChange}
				defaultValue={defaultValue}
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
};

export default GraduationYear;

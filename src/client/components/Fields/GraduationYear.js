import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const GraduationYear = ({ error, onChange, options, value }) => {
	return (
		<Form.Field width={5} error={Boolean(error)} required>
			<label>When do you graduate?</label>
			<Dropdown
				placeholder="Choose your graduation year"
				selection
				options={options}
				onChange={onChange}
				value={value}
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
};

export default GraduationYear;

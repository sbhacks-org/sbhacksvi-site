import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const Gender = ({ onChange, error, opts, value }) => {
	return (
		<Form.Field width={4} error={Boolean(error)}>
			<label>Gender</label>
			<Dropdown
				fluid
				placeholder="gender"
				selection
				options={opts}
				onChange={onChange}
				value={value}
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
};

export default Gender;

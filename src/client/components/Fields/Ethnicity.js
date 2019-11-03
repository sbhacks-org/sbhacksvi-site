import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const Ethnicity = ({ onChange, error, opts, value }) => {
	return (
		<Form.Field width={12} error={Boolean(error)}>
			<label>Ethnicity</label>
			<Dropdown
				placeholder="ethnicity"
				multiple
				selection
				options={opts}
				onChange={onChange}
				value={value}
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
};

export default Ethnicity;

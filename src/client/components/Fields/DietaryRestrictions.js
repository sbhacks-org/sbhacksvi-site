import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const DietaryRestrictions = ({ onChange, error, opts, value }) => {
	return (
		<Form.Field width={7} error={Boolean(error)}>
			<label>Please inform us of any dietary restrictions</label>
			<Dropdown
				placeholder="This will help us with ordering food for the event."
				selection
				options={opts}
				onChange={onChange}
				value={value}
				multiple
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
};

export default DietaryRestrictions;

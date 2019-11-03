import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";


const DietaryRestrictions = ({ onChange, error, opts, value, onAddItem }) => {
	return (
		<Form.Field width={7} error={Boolean(error)}>
			<label>Please inform us of any dietary restrictions</label>
			<Dropdown
				fluid
				placeholder="This will help us with ordering food for the event"
				selection
				options={opts}
				onChange={onChange}
				value={value}
				onAddItem={onAddItem}
				multiple
				search
				allowAdditions
				additionLabel="Other: "
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
};

export default DietaryRestrictions;

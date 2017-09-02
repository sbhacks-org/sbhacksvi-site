import React from "react";
import { Form, Dropdown } from "semantic-ui-react";

const School = ({ error, opts, onChange, value, onAddItem }) => {
	return (
		<Form.Field width={6} error={Boolean(error)} required>
			<label>What school do you currently attend?</label>
			<Dropdown
				placeholder="Choose a school"
				selection
				search
				options={opts}
				onChange={onChange}
				allowAdditions
				additionPosition="bottom"
				onAddItem={onAddItem}
				value={value}
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
}
	
export default School;

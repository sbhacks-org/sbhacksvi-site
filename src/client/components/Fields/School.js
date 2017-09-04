import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const School = ({ error, options, onChange, value }) => {
	return (
		<Form.Field width={6} error={Boolean(error)} required>
			<label>What school do you currently attend?</label>
			<Dropdown
				fluid
				basic
				placeholder="Choose a school"
				selection
				search
				options={options}
				onChange={onChange}
				value={value}
				allowAdditions
				additionPosition="bottom"
				additionLabel="Other: "
				noResultsMessage="Loading school list...."
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
}
	
export default School;

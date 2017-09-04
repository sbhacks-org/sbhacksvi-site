
import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const Transportation = ({ error, opts, onChange, value }) => {
	return (
		<Form.Field error={Boolean(error)} required>
			<label>Transportation</label>
			<Dropdown
				placeholder="Do you require any special accommodations for getting to the event?"
				selection
				options={opts}
				onChange={onChange}
				value={value}
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>		
	);
}

export default Transportation;
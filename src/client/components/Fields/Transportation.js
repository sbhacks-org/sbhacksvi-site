import React from "react";
import { Form, Dropdown } from "semantic-ui-react";

const Transportation = ({ error, opts, onChange, defaultValue }) => {
	return (
		<Form.Field error={Boolean(error)}>
			<label>Transportation</label>
			<Dropdown
				placeholder="Transportation"
				selection
				options={opts}
				onChange={onChange}
				defaultValue={defaultValue}
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>		
	);
}

export default Transportation;
import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const ShirtSize = ({ error, onChange, opts, value }) => {
	return (
		<Form.Field width={3} error={Boolean(error)} required>
			<label>Shirt Size</label>
			<Dropdown
				fluid
				placeholder="Unisex sizes"
				selection
				options={opts}
				onChange={onChange}
				value={value}
			/>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
}

export default ShirtSize;

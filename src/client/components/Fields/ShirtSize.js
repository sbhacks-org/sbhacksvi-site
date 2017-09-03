import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const ShirtSize = ({ error, onChange, opts, value }) => {
	return (
		<Form.Field error={Boolean(error)}>
			<label>Shirt Size</label>
			<Dropdown
				placeholder="These are unisex sizes"
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

import React from "react";
import { Form, Input, Label } from "semantic-ui-react";

const Github = ({ error, onChange, value }) => {
	return (
		<Form.Field error={Boolean(error)}>
			<label>Github</label>
			<Input
	    		fluid
				icon="at"
				iconPosition="left"
				placeholder="github username"
				onChange={onChange}
				value={value}
	    	/>		
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
}

export default Github;

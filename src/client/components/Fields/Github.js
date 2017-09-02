import React from "react";
import { Form, Input } from "semantic-ui-react";

const Github = ({ error, onChange, defaultValue }) => {
	return (
		<Form.Field error={Boolean(error)}>
			<label>Github</label>
			<Input
	    		fluid
				icon="at"
				iconPosition="left"
				placeholder="github username"
				onChange={onChange}
				defaultValue={defaultValue}
	    	/>		
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
}

export default Github;

import React from "react";
import { Form, Input, Label } from "semantic-ui-react";

const Linkedin = ({ error, onChange, defaultValue }) => {
	return (
		<Form.Field error={Boolean(error)}>
	    	<label>Linkedin</label>
	    	<Input
	    		fluid
	    		icon="at"
	    		iconPosition="left"
	    		placeholder="linkedin username"
	    		onChange={onChange}
	    		defaultValue={defaultValue}
	    	/>
	    	{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
	    </Form.Field>
	);
};

export default Linkedin;

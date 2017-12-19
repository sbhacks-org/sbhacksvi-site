import React from "react";
import { Form, Input, Label } from "semantic-ui-react";

const Linkedin = ({ error, onChange, value }) => {
	return (
		<Form.Field error={Boolean(error)}>
	    	<label>Linkedin</label>
	    	<Input
	    		fluid
	    		icon="at"
	    		iconPosition="left"
	    		placeholder="linkedin username"
	    		name="linkedin"
	    		onChange={onChange}
	    		value={value}
	    	/>
	    	{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
	    </Form.Field>
	);
};

export default Linkedin;

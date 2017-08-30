import React from "react";
import { Form, Input } from "semantic-ui-react";

const PhoneNumber = ({ error, onChange, defaultValue }) => {
	return (
		<Form.Field width={7} error={Boolean(error)}>
	    	<label>Phone Number</label>
	    	<Input
	    		fluid
	    		placeholder="Don't worry we won't call you unless it's an emergency"
	    		onChange={onChange}
	    		defaultValue={defaultValue}
	    	/>
	    	{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
	    </Form.Field>
	);
};

export default PhoneNumber;
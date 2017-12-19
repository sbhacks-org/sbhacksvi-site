import React from "react";
import { Form, Input, Label } from "semantic-ui-react";

const PhoneNumber = ({ error, onChange, value }) => {
	return (
		<Form.Field width={7} error={Boolean(error)}>
	    	<label>Phone Number</label>
	    	<Input
	    		fluid
	    		placeholder="Don't worry we won't call you unless it's an emergency"
	    		name="phone_number"
	    		onChange={onChange}
	    		value={value}
	    	/>
	    	{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
	    </Form.Field>
	);
};

export default PhoneNumber;
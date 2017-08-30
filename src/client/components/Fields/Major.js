import React from "react";
import { Form, Dropdown } from "semantic-ui-react";

const Major = ({ error, onChange, opts, defaultValue }) => {
	return (
		<Form.Field error={Boolean(error)} required>
	    	<label>What's your major?</label>
	    	<Dropdown
	    		fluid
	    		placeholder="Choose a major."
	    		selection
	    		search
	    		options={opts}
	    		onChange={onChange}
	    		defaultValue={defaultValue}
	    	/>
	    	{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
	    </Form.Field>
	);
}

export default Major;

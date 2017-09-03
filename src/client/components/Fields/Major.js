import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

const Major = ({ error, onChange, opts, value }) => {
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
	    		value={value}
	    		allowAdditions
	    		additionPosition="bottom"
	    		additionLabel="Other: "
	    	/>
	    	{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
	    </Form.Field>
	);
}

export default Major;

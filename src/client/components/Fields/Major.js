import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";
import { getListForAdditionDropdown } from "../additionDropdownHelper";

class Major extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.error === this.props.error && nextProps.value === this.props.value) {
			return false;
		}
		return true;
	}
	render() {
		const { error, onChange, initialOpts, value } = this.props;
		return (
			<Form.Field error={Boolean(error)} required>
		    	<label>What's your major?</label>
		    	<Dropdown
		    		fluid
		    		placeholder="Choose a major."
		    		selection
		    		search
		    		options={getListForAdditionDropdown(initialOpts, value)}
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

}

export default Major;

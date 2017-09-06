import React from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";

class School extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		let should = false;
		Object.keys(this.props).map(key => nextProps[key] !== this.props[key] ? should = true : null);
		return should;
	}
 
	render() {
		const { error, options, onChange, value } = this.props;
		return (
			<Form.Field width={6} error={Boolean(error)} required>
				<label>Which school do you currently attend?</label>
				<Dropdown
					fluid
					basic
					placeholder="Start typing to search for the school!"
					selection
					search
					options={options}
					onChange={onChange}
					value={value}
					allowAdditions
					additionPosition="bottom"
					additionLabel="Other: "
					noResultsMessage="Loading school list...."
				/>
				{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
			</Form.Field>
		);
	}
} 
	
export default School;

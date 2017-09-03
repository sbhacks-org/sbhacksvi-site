import React from "react";
import { Form } from "semantic-ui-react";

const FileInput = ({ errors, onChange, labelName }) => {
	return (
		<Form.Field error={Boolean(errors)}>
			<label>{labelName}</label>
			<div className="ui input">
				<input
					type="file"
					onChange={onChange}
					accept="application/pdf"
				/>
			</div>
			{ Boolean(errors) ? <Label basic color='red' pointing>{errors}</Label> : null }
		</Form.Field>
	);
}

export default FileInput;

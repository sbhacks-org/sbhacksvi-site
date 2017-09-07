import React from "react";
import { Form, Label } from "semantic-ui-react";

const FileInput = ({ error, onChange, labelName, required = false }) => {
	return (
		<Form.Field error={Boolean(error)} required={required}>
			<label>{labelName}</label>
			<div className="ui input">
				<input
					type="file"
					onChange={onChange}
					accept="application/pdf"
				/>
			</div>
			{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
		</Form.Field>
	);
}

export default FileInput;

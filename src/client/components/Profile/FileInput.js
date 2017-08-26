import React from "react";

const FileInput = (props) => {
	return (
		<div className="ui input">
			<input
				{...props}
			/>
		</div>
	);
}

export default FileInput;

import { authSuccess } from "../actions";

function getMissingFieldErrors(fields, required_fields) {
	const missingFieldErrors = {};

	required_fields.forEach((required_field) => {
		if(fields[required_field.name] === "") {
			missingFieldErrors[required_field.name] = (required_field.label || required_field.name) + " can't be blank";
		}
	});
	return missingFieldErrors;
}

function sendXHR(xhr_endpoint, fields) {
	this.open("POST", xhr_endpoint);
	this.setRequestHeader("Content-Type", "application/json");
	this.send(JSON.stringify(fields));
}

function startSubmit() {
	this.setState({ loading: true });
}

export function createHandleSubmit(dispatch, xhr_endpoint, required_fields) {
	return function(fields) {

		let missingFieldErrors = getMissingFieldErrors(fields, required_fields);
		if(Object.keys(missingFieldErrors).length > 0) return this.setState({ errors: missingFieldErrors });

		startSubmit.call(this);

		let xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			if(response.isAuthenticated) {
				let { info, applicationFields } = response;
				dispatch(authSuccess(info, applicationFields));
			} else {
				this.setState({ ...response, loading: false });
			}			
		});

		sendXHR.call(xhttp, xhr_endpoint, fields);
	};
};



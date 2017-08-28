import * as actionTypes from "../actionTypes";
import { authSuccess } from "../actions";

function addMissingFieldsErrors(fields) {
	const { password, email } = fields;
	const missingFieldErrors = {};

	if(!password) missingFieldErrors["password"] = "password can't be blank";
	if(!email) missingFieldErrors["email"] = "email can't be blank";

	this.setState({ errors: missingFieldErrors });
}

function sendXHR(xhr_endpoint, fields) {
	this.open("POST", xhr_endpoint);
	this.setRequestHeader("Content-Type", "application/json");
	this.send(JSON.stringify(fields));
}

function startSubmit() {
	this.setState({ loading: true });
}

export function createHandleSubmit(dispatch, xhr_endpoint) {
	return function(evt, fields) {
		evt.preventDefault();

		const { password, email } = fields;

		if(!password || !email) return addMissingFieldsErrors.call(this, fields);

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



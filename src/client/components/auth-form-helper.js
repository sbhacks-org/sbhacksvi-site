import * as actionTypes from "../actionTypes";
import { authSuccess } from "../actions";

function addMissingFieldsErrors() {
	const { password, email } = this.state.fields;
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

export function createHandleSubmit(dispatch, xhr_endpoint) {
	return function(evt) {
		evt.preventDefault();

		const { fields, fields: { password, email } } = this.state;
		const { history } = this.props;

		if(!password || !email) return addMissingFieldsErrors.call(this);

		this.setState({ loading: true });

		let xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			console.log(response);
			if(response.isAuthenticated) {
				let { info, application } = response;
				dispatch(authSuccess(info, application));
			} else {
				this.setState(Object.assign(response, { loading: false }));
			}			
		});

		sendXHR.call(xhttp, xhr_endpoint, fields);
	};
};



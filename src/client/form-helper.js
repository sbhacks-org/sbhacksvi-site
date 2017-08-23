function addMissingFieldsErrors() {
	const { password, email } = this.state.fields;
	const missingFieldErrors = {};

	if(!password) missingFieldErrors["password"] = "password can't be blank";
	if(!email) missingFieldErrors["email"] = "email can't be blank";

	this.setState({ errors: missingFieldErrors });
}

export function createHandleSubmit(xhr_endpoint) {

	return function(evt) {
		evt.preventDefault();

		const { password, email } = this.state.fields;
		const { history } = this.props;

		if(!password || !email) return addMissingFieldsErrors.call(this);

		this.setState({ loading: true });

		let xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			console.log(response);
			this.setState(Object.assign(response, { loading: false }));
		});

		xhttp.open("POST", xhr_endpoint);
		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send(JSON.stringify(this.state.fields));
	}
}

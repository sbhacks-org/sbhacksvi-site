import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Segment } from "semantic-ui-react";

class Signup extends React.Component {
	constructor() {
		super();

		this.state = {
			f_name: "",
			l_name: "",
			email: "",
			password: ""
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(evt) {
		evt.preventDefault();

		const { history } = this.props;

		let xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let message = JSON.parse(xhttp.responseText);
			history.push("/dashboard", { message });
		});

		xhttp.open("POST", "signup");
		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send(JSON.stringify(this.state));
	}

	render() {
		return (
			<Form size="large" action="/signup" method="POST" onSubmit={this.handleSubmit}>
				<Segment stacked>
					<Form.Field>
						<label>First Name</label>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="First Name"
							name="f_name"
							type="text"
							value={this.state.f_name}
							onChange={(el) => this.setState({ f_name: el.target.value })}
			            />
					</Form.Field>
					<Form.Field>
						<label>Email</label>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="Last Name"
							name="l_name"
							type="text"
							value={this.state.l_name}
							onChange={(el) => this.setState({ l_name: el.target.value })}
			            />
					</Form.Field>
					<Form.Field>
						<label>Email</label>
						<Form.Input
							fluid
							icon="at"
							iconPosition="left"
							placeholder="Email Address"
							name="email"
							type="email"
							value={this.state.email}
							onChange={(el) => this.setState({ email: el.target.value })}
			            />
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<Form.Input
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							name="password"
							type="password"
							value={this.state.password}
							onChange={(el) => this.setState({ password: el.target.value })}
			            />
					</Form.Field>
					<Button color='teal' fluid size='large'>Signup</Button>
				</Segment>
			</Form>
		);
	}
}

export default Signup;

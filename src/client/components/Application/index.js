import React from "react";
import { Redirect } from "react-router-dom";

import { Form, Input, Button, Dropdown, Icon } from "semantic-ui-react";

class Application extends React.Component {
	constructor() {
		super();

		this.state = {
			isAuthenticated: window.__IS_AUTHENTICATED__
		}
	}

	render() {
		const { isAuthenticated } = this.state;

		if(!isAuthenticated) {
			return <Redirect to="/login" state={{}} />;
		}

		return (
			<Form id="login-form" action="/application" method="POST" enctype="multipart/form-data">

				<Form.Group>
				    <Form.Field width={6}>
				      <label>School</label>
				      <Dropdown
				      	placeholder="What school do you currently attend?"
				      	selection
				      	search
				      	options={[
				      		{ key: "UC Santa Barbara", value: "UC Santa Barbara", text: "UC Santa Barbara" }
				      	]}
				      />
				    </Form.Field>


				    <Form.Field width={5}>
				      <label>Level of study</label>
				      <Dropdown
				      	placeholder="What is your level of study?"
				      	selection
				      	options={[
				      		{ key: "High School", value: "High School", text: "High School" },
				      		{ key: "Undergraduate", value: "Undergraduate", text: "Undergraduate" },
				      		{ key: "Graduate", value: "Graduate", text: "Graduate" }
				      	]}
				      />
				    </Form.Field>

				    <Form.Field width={5}>
				      <label>Graduation Year</label>
				      <Dropdown
				      	placeholder="year"
				      	selection
				      	options={[
				      		{ key: "2021", value: "2021", text: "2021" },
				      		{ key: "2020", value: "2020", text: "2020" },
				      		{ key: "2019", value: "2019", text: "2019" },
				      		{ key: "2018", value: "2018", text: "2018" },
				      		{ key: "2017", value: "2017", text: "2016" }
				      	]}
				      />
				    </Form.Field>
				</Form.Group>

			    <Form.Group widths="equal">
				    <Form.Field>
				    	<label>Github</label>
				    	<Input
				    		fluid
				    		placeholder="@github_username"
				    	/>
				    </Form.Field>

				    <Form.Field>
				    	<label>Linkedin</label>
				    	<Input
				    		fluid
				    		placeholder="@linkedin_username"
				    	/>
				    </Form.Field>

				    <Form.Field>
				    	<label>Major</label>
				    	<Input
				    		fluid
				    		placeholder="e.g. Computer Science"
				    	/>
				    </Form.Field>
				</Form.Group>

			    <Form.Group>
				    <Form.Field width={9}>
				      <label>Gender</label>
				      <Dropdown
				      	placeholder="gender"
				      	selection
				      	options={[
				      		{ key: "Male", value: "Male", text: "Male" },
				      		{ key: "Female", value: "Female", text: "Female" },
				      		{ key: "Other", value: "Other", text: "Other" }
				      	]}
				      />
				    </Form.Field>

				    <Form.Field width={7}>
				    	<label>Phone Number</label>
				    	<Input
				    		fluid
				    		placeholder="Don't worry we won't call you unless it's an emergency"
				    	/>
				    </Form.Field>
				</Form.Group>
				<Form.Group widths="equal">
				    <Form.Field>
				      <label>Shirt Size</label>
				      <Dropdown
				      	placeholder="gender"
				      	selection
				      	options={[
				      		{ key: "S", value: "S", text: "Small" },
				      		{ key: "M", value: "M", text: "Medium" },
				      		{ key: "L", value: "L", text: "Large" },
				      		{ key: "XL", value: "XL", text: "X-Large" }
				      	]}
				      />
				    </Form.Field>

				    <Form.Field>
				      <label>Transportation</label>
				      <Dropdown
				      	placeholder="Transportation"
				      	selection
				      	options={[
				      		{ key: "1", value: "1", text: "I can provide my own means of transportation" },
				      		{ key: "2", value: "2", text: "I would prefer to be provided bussing in California" },
				      		{ key: "3", value: "3", text: "I require travel reimbursement (This may or may not be something we can provide)" },
				      	]}
				      />
				    </Form.Field>
				</Form.Group>

				<Form.Field>
					<label>Upload Resume</label>

					<Input type="file"/>
				</Form.Field>

			    <Button fluid color="blue">Submit</Button>

			</Form>
		);
	}
}

export default Application;

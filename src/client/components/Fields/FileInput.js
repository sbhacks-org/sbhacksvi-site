import React from "react";
import { Form, Label, Button } from "semantic-ui-react";
import { connect } from "react-redux";

class FileInput extends React.Component {
	constructor() {
		super();

		this.state = {
			loading: false,
			status: "",
			fileName: ""
		};
	};

	getSignedS3Url = () => {
		return new Promise((res, rej) => {
			let xhttp = new XMLHttpRequest();
			xhttp.open("GET", "/apply/sign-s3");

			xhttp.addEventListener("load", () => {
				if(xhttp.status == 200) {
					return res(xhttp.responseText);
				} else {
					return rej(JSON.parse(xhttp.responseText));
				}
			});
			xhttp.send();
		})
	};

	uploadFinish = (status) => {
		this.setState({
			status,
			loading: false
		}, () => { if(this.props.onUpload) this.props.onUpload(this.state.status) });
	};

	uploadToS3 = (evt) => {
		let resume = evt.target.files[0];
		if(resume != null) {
			if(resume.type != "application/pdf") {
				return window.alert("File must be a PDF");
			}
			if(resume.size > 4 * 1024 * 1024) {
				return window.alert("File size must be less than 4mb.");
			}

			this.setState({
				loading: true,
				fileName: resume.name,
				status: ""
			});

			this.getSignedS3Url()
			.then((url) => {
				let xhttp = new XMLHttpRequest();
				xhttp.open("PUT", url);
				xhttp.addEventListener("load", () => {
					if(xhttp.status == 200) {
						this.uploadFinish("success");
					} else {
						this.uploadFinish("failure");
					}
				});
				xhttp.send(resume);
			})
			.catch((err) => {
				this.uploadFinish("failure");
			});
		}
	};

	render() {
		const { error, labelName, required = false, user_id } = this.props;
		return (
			<Form.Field error={Boolean(error)} required={required}>
				<label>{labelName}</label>
				<div className="ui input">
					<label id="uploader" htmlFor="resume" className={"ui icon button " + this.state.status}>
						{
							this.state.loading ?
							<div className="ui active inline loader mini" /> 
							: <i className={"icon " + (this.state.status == "success" ? "checkmark" : "file")}></i>
			        	}
			        	<span>
			        	{
			        		this.state.status == "failure" ?
			        		"Something went wrong, please try again."
				        	: (this.state.fileName ? this.state.fileName.substr(0, 50) + "..." : "Choose File")
			        	}
			        	
			        	</span>
			        </label>
					<input
						type="file"
						id="resume"
						onChange={this.uploadToS3}
						accept="application/pdf"
						style={{ display: "none" }}
					/>
					
					<a
						target="_blank"
						href={`https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${user_id}.pdf`}
						className={(!this.props.applicationSubmitted && this.state.status !== "success") || !user_id ? "disabled" : "test"}
					>
						<Button
							className="teal"
							type="button"
						>
						View Resume
						</Button>
					</a>
					
				</div>
				{ Boolean(error) ? <Label basic color='red' pointing>{error}</Label> : null }
			</Form.Field>
		);
	}
}

const mapStateToProps = (state) => {
	const { id } = state.user.info;

	return {
		user_id: id
	}
};

export default connect(mapStateToProps)(FileInput);

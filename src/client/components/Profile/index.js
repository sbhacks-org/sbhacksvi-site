import { connect } from "react-redux";

import ProfileForm from "./ProfileForm";

const mapStateToProps = (state) => {
	const { isAuthenticated, application, info } = state.user;
	return {
		isAuthenticated,
		application,
		info
	}
}

export default connect(mapStateToProps)(ProfileForm);

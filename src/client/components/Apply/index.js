import { connect } from "react-redux";

import ApplyForm from "./ApplyForm";
const mapStateToProps = (state) => {
	const { isAuthenticated } = state.user;
	return {
		isAuthenticated
	};
};

export default connect(mapStateToProps)(ApplyForm);

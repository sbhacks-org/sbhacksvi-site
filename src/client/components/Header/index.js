import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../actions";
import { Button } from "semantic-ui-react";

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.user;

	return {
		isAuthenticated
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ logout }, dispatch);
};

const Header = ({ logout, isAuthenticated }) => {
	return (
		<div id="header">
			<a id="logo" href="/">
				<img src="/images/logo.png" />
			</a>
			{isAuthenticated ?
				<a id="logout-btn" onClick={logout}>
					<Button color="teal" size="large">Logout</Button>
				</a>
			: null}
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
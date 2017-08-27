module.exports.authSuccessUserState = (user, application) => {
	let user_info = {
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email
	};

	return {
		isAuthenticated: true,
		application: application,
		info: user_info
	};
};
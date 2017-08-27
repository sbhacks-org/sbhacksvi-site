import * as actionTypes from "../actionTypes";

export const authSuccess = (info, application) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		info,
		application
	};
};

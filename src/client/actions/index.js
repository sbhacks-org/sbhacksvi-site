import * as actionTypes from "../actionTypes";

export const authSuccess = (info, applicationFields) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		info,
		applicationFields
	};
};

export const updateSuccess = (applicationFields) => {
	return {
		type: actionTypes.UPDATE_SUCCESS,
		applicationFields
	}
};

export const submitSuccess = updateSuccess;

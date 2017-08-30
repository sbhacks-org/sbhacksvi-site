import * as actionTypes from "../constants/actionTypes";

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

export const logout = () => {
	return function(dispatch) {
		var xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			dispatch({
				type: actionTypes.LOG_OUT_SUCCESS
			});
		});

		xhttp.open("POST", "/logout");
		xhttp.send();
	};
};

export const submitSuccess = updateSuccess;

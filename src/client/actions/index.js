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

export const fetchSchoolList = () => {
	return function(dispatch, getState) {
		const { school_opts } = getState().application;

		if(school_opts.length > 0) {
			return;
		}
		var xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			dispatch({
				type: actionTypes.FETCH_SCHOOL_LIST_SUCCESS,
				payload: response.map((school) => ({ key: school.name, id: school.id, text: school.name }))
			})
		});
		xhttp.open("GET", "/api/schools");
		xhttp.send();
	}
};

export const addToSchoolList = (school) => {
	return {
		type: actionTypes.ADD_TO_SCHOOL_LIST,
		payload: school
	};
}

export const submitSuccess = updateSuccess;

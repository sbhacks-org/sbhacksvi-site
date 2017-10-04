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
	};
};

export const submitSuccess = (applicationFields) => {
	return {
		type: actionTypes.APPLY_SUCCESS,
		applicationFields
	};
};

export const logout = () => {
	return function(dispatch) {
		var xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			dispatch({
				type: actionTypes.LOG_OUT_SUCCESS
			});
		});

		xhttp.open("DELETE", "/logout");
		xhttp.send();
	};
};

export const fetchSchoolList = () => {
	return function(dispatch, getState) {
		let state = getState();

		const { application: { school_opts }, user: { applicationFields } } = state;

		if(school_opts.length > 0 && !applicationFields) return;

		let include_school_id = applicationFields ? applicationFields.school_id : undefined;

		var xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			dispatch({
				type: actionTypes.FETCH_SCHOOL_LIST_SUCCESS,
				payload: response.map((school) => (
					{ key: school.name, value: school.id, text: school.name }
				))
			});
		});
		xhttp.open("GET", "/api/schools?include=" + include_school_id);
		xhttp.send();
	};
};

export const addToSchoolList = (school) => {
	return {
		type: actionTypes.ADD_TO_SCHOOL_LIST,
		payload: school
	};
};

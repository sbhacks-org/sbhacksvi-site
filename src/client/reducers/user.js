import * as actionTypes from "../actionTypes";

const initialState = {
	isAuthenticated: false,
	application: null,
};

const userReducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.AUTH_SUCCESS:
			return { ...state, isAuthenticated: true, application: action.application, info: action.info };
		default:
			return state;
	}
};


module.exports = userReducer;

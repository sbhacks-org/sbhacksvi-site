import * as actionTypes from "../constants/actionTypes";

const initialState = {
	school_opts: []
};

const applicationReducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.FETCH_SCHOOL_LIST_SUCCESS:
			return { ...state, school_opts: action.payload }
		default:
			return state;
	}
};

export default applicationReducer;

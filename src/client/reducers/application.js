import * as actionTypes from "../constants/actionTypes";

const initialState = {
	school_opts: []
};

const applicationReducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.FETCH_SCHOOL_LIST_SUCCESS:
			return { ...state, school_opts: action.payload };
		case actionTypes.ADD_TO_SCHOOL_LIST: {
			let added_opt = { text: action.payload, value: action.payload, key: action.payload }
			return { ...state, school_opts: [...state.school_opts, added_opt]};
		}
		default:
			return state;
	}
};

export default applicationReducer;

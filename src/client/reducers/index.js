import { combineReducers} from "redux";

import user from "./user";
import application from "./application";

module.exports = combineReducers({
	user,
	application
});
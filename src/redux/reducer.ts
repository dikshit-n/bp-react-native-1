// combine all the reducers

import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices";

const reducer = combineReducers({
	auth: authReducer
});

export { reducer };

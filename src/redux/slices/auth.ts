// state management required for authentication

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOGIN_DATA } from "src/api";

export interface AUTH_STATE {
	isAuthenticated: boolean;
	data: LOGIN_DATA | null;
}

const initialState: AUTH_STATE = {
	isAuthenticated: false,
	data: null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		initialize: (_state: AUTH_STATE, action: PayloadAction<LOGIN_DATA>) => ({
			..._state,
			data: action.payload,
			isAuthenticated: true
		}),
		login: (_state: AUTH_STATE, action: PayloadAction<LOGIN_DATA>) => ({
			..._state,
			data: action.payload,
			isAuthenticated: true
		}),
		logout: (_state: AUTH_STATE, _action: PayloadAction<void>) => ({
			...initialState,
			isAuthenticated: false,
			data: null
		}),
		updateAuthState: (
			_state: AUTH_STATE,
			action: PayloadAction<Partial<AUTH_STATE>>
		) => ({
			..._state,
			...action.payload
		}),
		resetState: (_state: AUTH_STATE) => initialState
	}
});

export const { reducer: authReducer, actions: authActions } = authSlice;

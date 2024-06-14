// redux setup and some global reusabe utilities related to redux based on redux toolkit documentation
// along with these utilities some custom made redux utilities, actions, reducers aer exported
import { configureStore } from "@reduxjs/toolkit";
import {
	TypedUseSelectorHook,
	useSelector as useReduxSelector,
	useDispatch as useReduxDispatch
} from "react-redux";
import ENV from "react-native-config";
import { reducer } from "./reducer";
import { actions } from "./actions";

export const store = configureStore({
	reducer,
	devTools: ENV.REDUX_DEV_TOOLS === "true",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }) // to ignore "A non-serializable value was detected in an action" error
});

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

// reset all the individual states to its initial values
export const resetRedux = () => {
	Object.keys(actions).forEach((action) => {
		store.dispatch(actions[action].resetState());
	});
};

export * from "./actions";
export * from "./reducer";

// actions binding utility hook for redux

import { actions as reduxActions, useDispatch } from "src/redux";
import { bindActionCreators } from "@reduxjs/toolkit";

export function useActions() {
	type actionsType = typeof reduxActions;
	const reduxActionsCopy: any = { ...reduxActions };
	const dispatch = useDispatch();
	// #rbac-setup
	const actions: any = {};
	Object.keys(reduxActions).forEach((el: any) => {
		actions[el] = bindActionCreators(reduxActionsCopy[el], dispatch);
	});

	return actions as actionsType;
}

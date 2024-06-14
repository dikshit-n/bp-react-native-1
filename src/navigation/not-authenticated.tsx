// screens to be displayed if the user is not authenticated
// refer - https://reactnavigation.org/docs/auth-flow/#how-it-will-work
import React from "react";
import { Login } from "src/screens";
import { SCREENS } from "src/types";

export const notAuthenticatedScreens: SCREENS["screens"] = [
	{
		name: "Login",
		component: <Login />,
		options: {
			headerShown: false
		}
	}
];

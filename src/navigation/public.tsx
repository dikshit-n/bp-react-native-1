// screens to be displayed irrespective of authentication

import React from "react";
import { CustomText } from "src/reusasble-components";
import { SCREENS } from "src/types";

// refer - https://reactnavigation.org/docs/auth-flow/#removing-shared-screens-when-auth-state-changes
export const publicScreens: SCREENS["screens"] = [
	{
		name: "Example public screen",
		component: <CustomText>Dummy screen</CustomText>,
		options: {
			headerShown: false
		}
	}
];

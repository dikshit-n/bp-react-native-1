// screens to be displayed if the user is authenticated
// refer - https://reactnavigation.org/docs/auth-flow/#how-it-will-work
import React from "react";
import { Home } from "src/screens";
import { SCREENS } from "src/types";

export const authenticatedScreens: SCREENS["screens"] = [
	// home screen - view posts
	{
		name: "Home",
		options: {
			// tabbar navigation icon usage
			// tabBarIcon: BottomTabIcon({
			//     focused: <Icon name='home' size={16} color="#1934c1" />,
			//     notFocused: <Icon name='home' size={16} color="#768b96" />
			// }),
			headerShown: false
		},
		component: <Home />
	}
];

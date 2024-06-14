import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "src/custom-hooks";
import { NAVIGATION_SCREENS, ROOT_PARAM_LIST, SCREENS } from "src/types";
import { getScreens } from "src/utils";
import { authenticatedScreens } from "./authenticated";
import { notAuthenticatedScreens } from "./not-authenticated";
import { publicScreens } from "./public";

const Stack = createStackNavigator<ROOT_PARAM_LIST>();

export const Navigation: React.FC = () => {
	const { isAuthenticated } = useAuth();

	const screens: SCREENS["screens"] = [
		...(isAuthenticated
			? ([
					{
						name: "Authenticated Screens",
						nestedScreens: authenticatedScreens,
						options: {
							headerShown: false
						}
					}
			  ] as SCREENS["screens"])
			: notAuthenticatedScreens),
		...publicScreens
	] as NAVIGATION_SCREENS;

	const navigationComponent = getScreens({
		type: "stack",
		screens
	});

	return (
		<>
			{navigationComponent}
			<Stack.Group
				navigationKey={isAuthenticated ? "authenticated" : "not-authenticated"}
			>
				{publicScreens
					.filter((screen) => screen.redirectOnAuthChange)
					.map((screen, index) => (
						<Stack.Screen {...(screen as any)} key={index} />
					))}
			</Stack.Group>
		</>
	);
};

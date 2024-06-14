import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
	NAVIGATION_SCREEN,
	NAVIGATION_SCREENS,
	ROOT_PARAM_LIST,
	SCREENS
} from "src/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { withProps } from "src/utils";

const Stack = createStackNavigator<ROOT_PARAM_LIST>();
const BottomTab = createBottomTabNavigator<ROOT_PARAM_LIST>();

export const getScreens = (screensObject: SCREENS) => {
	const { type = "stack", screens } = screensObject;
	return getScreensNested(type, screens);
};

export const getScreensNested = (
	type: NAVIGATION_SCREEN["type"] = "stack",
	screens: NAVIGATION_SCREENS
) => {
	// prepare the screen components
	const screenComponents = screens.map((screen) => {
		const { component, nestedScreens, type: screenType, ...rest } = screen;
		if (nestedScreens && nestedScreens.length > 0) {
			return {
				...rest,
				component: getScreensNested(screenType || "stack", nestedScreens)
			};
		}
		return { ...rest, component };
	});
	// wrap the screen components to the navigater based on its type
	if (type === "stack") {
		return (
			<Stack.Navigator>
				{screenComponents.map(({ redirectOnAuthChange, ...screen }, index) => {
					const { component: Component, ...screenProps } = screen;
					return (
						<Stack.Screen key={index} {...(screenProps as any)}>
							{(props) => withProps(props, Component)}
						</Stack.Screen>
					);
				})}
			</Stack.Navigator>
		);
	}
	if (type === "bottomTab") {
		return (
			<BottomTab.Navigator>
				{screenComponents.map(({ redirectOnAuthChange, ...screen }, index) => {
					const { component: Component, ...screenProps } = screen;
					return (
						<BottomTab.Screen key={index} {...(screenProps as any)}>
							{(props) => withProps(props, Component)}
						</BottomTab.Screen>
					);
				})}
			</BottomTab.Navigator>
		);
	}
	return <></>;
};

// utility hook to manipulate navigation options like header component, screen title etc

import { useEffect } from "react";
import { useNavigation } from "src/custom-hooks";
import { StackNavigationOptions } from "@react-navigation/stack";
import { isObject } from "src/utils";

export type USE_NAVIGATION_OPTIONS = StackNavigationOptions;

// could be used to control globally some predefined settings for the header
export const useNavigationOptions = (props?: USE_NAVIGATION_OPTIONS) => {
	const navigation = useNavigation();

	const getDefaultOptions = () => {
		const defaultOptions: any = {};
		if (Object.hasOwn(props || {}, "headerStyle")) {
			defaultOptions.headerStyle = isObject(props?.headerStyle)
				? {
						backgroundColor: "#045BCB",
						...(props?.headerStyle as object)
				  }
				: props?.headerStyle;
		} else {
			defaultOptions.headerStyle = {
				backgroundColor: "#045BCB"
			};
		}
		if (Object.hasOwn(props || {}, "headerTitleStyle")) {
			defaultOptions.headerTitleStyle = isObject(props?.headerTitleStyle)
				? {
						color: "#FFFFFF",
						...(props?.headerTitleStyle as object)
				  }
				: props?.headerTitleStyle;
		} else {
			defaultOptions.headerTitleStyle = {
				color: "#FFFFFF"
			};
		}
		if (Object.hasOwn(props || {}, "headerBackTitleStyle")) {
			defaultOptions.headerBackTitleStyle = isObject(
				props?.headerBackTitleStyle
			)
				? {
						color: "#FFFFFF",
						...(props?.headerBackTitleStyle as object)
				  }
				: props?.headerBackTitleStyle;
		} else {
			defaultOptions.headerBackTitleStyle = {
				color: "#FFFFFF"
			};
		}
		return defaultOptions;
	};

	const options: USE_NAVIGATION_OPTIONS = {
		headerTintColor: "#FFFFFF",
		...props,
		...getDefaultOptions()
	};

	useEffect(() => {
		navigation.setOptions(options);
	}, [options]);
};

// customize the screen layout
// specific to this application

import React from "react";
import {
	SafeAreaView,
	SafeAreaViewProps
} from "react-native-safe-area-context";
import { useNavigationOptions } from "src/custom-hooks";
import { StatusBar, StyleSheet } from "react-native";

export const ScreenWrapper: React.WithNavigationFC<SafeAreaViewProps> = (
	props
) => {
	useNavigationOptions();
	return (
		<SafeAreaView
			{...props}
			style={[styles.container, props.style].flat(1)}
			edges={props.edges || { top: "off" }}
		>
			<StatusBar barStyle="light-content" />
			{props.children}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		minHeight: "100%",
		maxHeight: "100%"
	}
});

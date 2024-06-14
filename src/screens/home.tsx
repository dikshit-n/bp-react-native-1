import React from "react";
import { ScreenWrapper } from "src/reusasble-components";
import { Button, View } from "react-native";
import { handleAppLogout } from "src/utils";

export function Home() {
	return (
		<ScreenWrapper>
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
					height: "100%"
				}}
			>
				<Button onPress={handleAppLogout} title="Logout" />
			</View>
		</ScreenWrapper>
	);
}

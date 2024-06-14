import React, { useState } from "react";
import { View, Image, Button } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { AveonLogo } from "src/assets";
import { useAuth } from "src/custom-hooks";
import { CustomText, ScreenWrapper } from "src/reusasble-components";

export const Login: React.WithNavigationFC = () => {
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleSignIn = async () => {
		setLoading(true);
		try {
			await login();
		} catch (err) {
			// console.log(err, '-----loginScreen');
		}
		setLoading(false);
	};

	return (
		<ScreenWrapper style={styles.container}>
			<View />
			<View style={styles.contentContainer}>
				<View style={styles.actionsContainer}>
					<View style={styles.actionContainer}>
						<Button title="Login" onPress={handleSignIn} />
					</View>
				</View>
			</View>
			<View style={styles.footer}>
				<Image
					style={{
						height: 23,
						width: 23
					}}
					source={AveonLogo}
				/>
				<CustomText color="#01037e">
					Developed by AveonInfotech Pvt. Ltd
				</CustomText>
			</View>
		</ScreenWrapper>
	);
};

const styles = ScaledSheet.create({
	container: {
		height: "100%",
		backgroundColor: "white",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: "50@vs",
		paddingBottom: "50@vs"
	},
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
		gap: "50@vs",
		padding: "20@ms",
		width: "100%"
	},
	actionsContainer: {
		justifyContent: "center",
		width: "100%",
		gap: "20@vs"
	},
	actionContainer: {
		width: "100%",
		flexDirection: "column"
	},
	footer: {
		flexDirection: "column",
		gap: 10,
		alignItems: "center",
		justifyContent: "center"
	}
});

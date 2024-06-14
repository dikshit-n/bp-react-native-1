import React, { CSSProperties } from "react";
import { Platform, Text, TextProps } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export interface CUSTOM_TEXT_PROPS extends TextProps {
	variant?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "label"
		| "p"
		| "subtitle"
		| "subtitle-big";
	color?: "danger" | CSSProperties["color"];
	align?: "center" | "left" | "right";
	bold?: boolean;
}

export const CustomText: React.FC<CUSTOM_TEXT_PROPS> = ({
	variant = "p",
	color = "black",
	align = "left",
	bold = false,
	...rest
}) => {
	const colorVariant = {
		danger: {
			color: "#ED1A1A"
		}
	};
	const customStyle = ScaledSheet.create({
		container: {
			...(colorVariant[color] || { color }),
			textAlign: align,
			...(bold ? { fontWeight: "500" } : {})
		}
	});
	return (
		<Text
			{...rest}
			style={[
				Platform.OS === "ios" ? iosStyles[variant] : androidStyles[variant],
				customStyle.container,
				rest.style
			].flat(1)}
		>
			{rest.children}
		</Text>
	);
};

const iosStyles = ScaledSheet.create({
	h1: {
		fontSize: "26@s"
	},
	h2: {
		fontSize: "22@s"
	},
	h3: {
		fontSize: "20@s"
	},
	h4: {
		fontSize: "18@s"
	},
	h5: {
		fontSize: "16@s"
	},
	h6: {
		fontSize: "14@s"
	},
	label: {
		fontSize: "14@s"
	},
	p: {
		fontSize: "14@s"
	},
	subtitle: {
		fontSize: "10@s"
	},
	"subtitle-big": {
		fontSize: "12@s"
	}
});

const androidStyles = ScaledSheet.create({
	h1: {
		fontSize: "34@s"
	},
	h2: {
		fontSize: "24@s"
	},
	h3: {
		fontSize: "20@s"
	},
	h4: {
		fontSize: "16@s"
	},
	h5: {
		fontSize: "14@s"
	},
	h6: {
		fontSize: "12@s"
	},
	label: {
		fontSize: "14@s"
	},
	p: {
		fontSize: "14@s"
	},
	subtitle: {
		fontSize: "10@s"
	},
	"subtitle-big": {
		fontSize: "12@s"
	}
});

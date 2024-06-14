import { ImageSourcePropType } from "react-native";

// some global type declarations

// support importing different image formats
declare module "*.jpg" {
	const path: ImageSourcePropType;
	export default path;
}

declare module "*.png" {
	const path: ImageSourcePropType;
	export default path;
}

declare module "*.svg" {
	const path: ImageSourcePropType;
	export default path;
}

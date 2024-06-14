import uuid from "react-native-uuid";

export const urlSearch = (obj: Object) =>
	Object.entries(obj)
		.map(([key, val]) => val && `${key}=${encodeURIComponent(val)}`)
		.filter((el) => el)
		.join("&");

export const randomUUID = () => uuid.v4();

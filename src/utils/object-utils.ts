export const isObject = (object) =>
	typeof object === "object" && !Array.isArray(object) && object !== null;

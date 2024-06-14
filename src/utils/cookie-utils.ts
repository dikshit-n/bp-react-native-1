// handling cookies
import Storage, { LoadParams } from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
	size: 1000, // maximum capacity
	storageBackend: AsyncStorage, // If storageBackend is not set, data will be lost after reload
	defaultExpires: null // unlimited validity
});

interface SET_COOKIE_OPTIONS {
	id?: string;
	expires?: number;
}

type GET_COOKIE_OPTIONS = Omit<LoadParams, "key">;

interface DELETE_COOKIE_OPTIONS {
	id?: string;
}

const setCookie = async (
	key: string,
	data: any,
	options?: SET_COOKIE_OPTIONS
): Promise<void> => {
	await storage.save({
		key,
		data,
		...options
	});
};

const getCookie = async (
	key: string,
	options?: GET_COOKIE_OPTIONS
): Promise<any> => {
	try {
		const data = await storage.load({
			key,
			syncInBackground: false,
			autoSync: false,
			...options
		});
		return data;
	} catch (err) {
		switch (err.name) {
			case "NotFoundError":
				return undefined; // when not found, consider the cookie is undefined
			case "ExpiredError":
				await deleteCookie(key); // when expired, remove the cookie and consider the value is undefined
				return undefined;
			default:
				return undefined;
		}
	}
};

const deleteCookie = async (
	key: string,
	options?: DELETE_COOKIE_OPTIONS
): Promise<void> => {
	await storage.remove({
		key,
		...options
	});
};

export { setCookie, getCookie, deleteCookie };

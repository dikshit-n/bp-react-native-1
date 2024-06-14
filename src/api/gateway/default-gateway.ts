import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { authConfig, gatewayConfig } from "src/config";
import { getCookie, setCookie, handleAppLogout } from "src/utils";
import { authApi } from "src/api";

interface GATEWAY_INTERFACE {
	axiosInstance: AxiosInstance;
	setupHeadersForRequestInterceptors: (
		options?: HEADER_OPTIONS | (() => Promise<HEADER_OPTIONS> | HEADER_OPTIONS)
	) => void;
	includeRefreshTokenLogic: () => void;
	create: () => AxiosInstance;
}

interface HEADER_OPTIONS {
	Authorization?: string;
	[key: string]: any;
}

export class Gateway implements GATEWAY_INTERFACE {
	public axiosInstance: AxiosInstance;

	constructor(
		config: AxiosRequestConfig & { setupCustomizations?: boolean } = {}
	) {
		const {
			setupCustomizations = true,
			baseURL = gatewayConfig.baseURL,
			...rest
		} = config;
		this.axiosInstance = axios.create({
			baseURL,
			...rest
		});

		if (setupCustomizations) {
			this.setupHeadersForRequestInterceptors();
			this.includeRefreshTokenLogic();
		}
	}

	create() {
		return this.axiosInstance;
	}

	setupHeadersForRequestInterceptors(
		options?: HEADER_OPTIONS | (() => Promise<HEADER_OPTIONS> | HEADER_OPTIONS)
	) {
		// setting token in header for each request
		this.axiosInstance.interceptors.request.use(
			async (config) => {
				const accessToken = await getCookie(authConfig.accessTokenAccessor); // getting token from cookies
				if (accessToken && config.headers) {
					// defaults
					config.headers.Authorization = `Bearer ${accessToken}`;
				}
				// other (overwrites stuff if needed)
				let otherHeaders = {};
				if (typeof options === "object") {
					otherHeaders = options;
				} else if (typeof options === "function") {
					otherHeaders = await options();
				}
				Object.keys(otherHeaders).forEach((key) => {
					config.headers[key] = otherHeaders[key];
				});
				return config;
			},
			(error) => Promise.reject(error)
		);
		// return this to call other functions when this function has been implemented and stored in a variable.
		return this;
	}

	includeRefreshTokenLogic() {
		// globally logout the user, if 401 occurs
		this.axiosInstance.interceptors.response.use(undefined, async (error) => {
			// logout if unauthenticated or token expired
			if (error.response?.status === 401) {
				const existingRefreshToken = await getCookie(
					authConfig.refreshTokenAccessor
				);
				// redirect to auth route, if you don't have the refreshToken and the current route is not public route
				if (!existingRefreshToken) {
					await handleAppLogout();
				} else {
					// retry api call after exchanging with refresh token
					const apiCallConfig = error.config;
					let credentials;
					try {
						credentials = await authApi.getAccessTokenFromRefreshToken(
							existingRefreshToken
						);
					} catch (err) {
						// refresh token expired
						await handleAppLogout();
						return Promise.reject(err);
					}
					// setup the new access token to cookie
					await setCookie(
						authConfig.accessTokenAccessor,
						credentials.accessToken
					);
					await setCookie(
						authConfig.refreshTokenAccessor,
						credentials.refreshToken
					);
					await setCookie(authConfig.idTokenAccessor, credentials.idToken);
					const newGateway = new Gateway({ setupCustomizations: false })
						.setupHeadersForRequestInterceptors({
							Authorization: `Bearer ${credentials.accessToken}`
						})
						.create();
					return newGateway(apiCallConfig);
				}
				// TODO: navigate to login screen
				return Promise.reject(new Error("Session Expired"));
			}
			return Promise.reject(error);
		});
		// return this to call other functions when this function has been implemented and stored in a variable.
		return this;
	}
}

export const gateway = new Gateway().create();

// utility hook to handle authentication functionalities like connecting to api and updating redux in the background

import { useActions } from "src/custom-hooks";
import { useSelector } from "src/redux";
import {
	AuthGateway,
	LOGIN_DATA,
	SIGNUP_DATA,
	SIGNUP_PAYLOAD,
	authApi,
	userApi
} from "src/api";
import { authConfig } from "src/config";
import { deleteCookie, getCookie, setCookie } from "src/utils";

export interface USE_AUTH_OPTIONS {
	updateRedux?: boolean;
}

export interface CLIENT_CREDENTIALS {
	access_token: string;
}

export const useAuth = () => {
	const { auth } = useSelector((state) => state);
	const { auth: authActions } = useActions();

	function initialize({
		updateRedux = true
	}: USE_AUTH_OPTIONS = {}): Promise<LOGIN_DATA> {
		return new Promise(async (resolve, reject) => {
			try {
				let accessToken = await getCookie(authConfig.accessTokenAccessor);
				let refreshToken = await getCookie(authConfig.refreshTokenAccessor);
				let idToken = await getCookie(authConfig.idTokenAccessor);
				if (!accessToken) {
					// if you have a refresh token
					if (refreshToken) {
						// exchange access token from refresh token
						const data = await authApi.getAccessTokenFromRefreshToken(
							refreshToken
						);
						accessToken = data.accessToken;
						refreshToken = data.refreshToken;
						idToken = data.idToken;
					} else {
						await deleteCookie(authConfig.idTokenAccessor);
						throw new Error("Session expired");
					}
				}
				// initialize the app by fetching user details
				const userData = await userApi.getUserDataFromToken(accessToken);
				if (updateRedux) {
					// set the new access token, new refresh token, the idToken and the user data in redux
					authActions.initialize({
						accessToken,
						refreshToken,
						idToken,
						...userData
					});
				}
				resolve({
					accessToken,
					refreshToken,
					idToken,
					...userData
				});
			} catch (err) {
				// logout at the place where you are calling this function
				reject(err);
			}
		});
	}

	async function login({
		updateRedux = true
	}: USE_AUTH_OPTIONS = {}): Promise<LOGIN_DATA> {
		return new Promise(async (resolve, reject) => {
			try {
				const loginData = await authApi.login(authConfig.oAuthConfig);
				await setCookie(authConfig.accessTokenAccessor, loginData.accessToken);
				await setCookie(
					authConfig.refreshTokenAccessor,
					loginData.refreshToken
				);
				await setCookie(authConfig.idTokenAccessor, loginData.idToken);
				if (updateRedux) {
					authActions.login(loginData);
				}
				resolve(loginData);
			} catch (err) {
				reject(err);
			}
		});
	}

	// create a function for signup
	async function signup(
		signupData: SIGNUP_PAYLOAD,
		{ updateRedux = true }: USE_AUTH_OPTIONS = {}
	): Promise<SIGNUP_DATA> {
		return new Promise(async (resolve, reject) => {
			try {
				// to access the signup route, you have to authorize the application to the identity server as a part of client credential flow
				const customGateway = new AuthGateway({ setupCustomizations: false })
					.setupHeadersForRequestInterceptors({
						Authorization: undefined,
						"Content-type": "application/x-www-form-urlencoded"
					})
					.create();
				const { data } = await customGateway.post<CLIENT_CREDENTIALS>(
					"/connect/token",
					{
						client_id: authConfig.oAuthConfig.clientId,
						client_secret: authConfig.oAuthConfig.clientSecret,
						grant_type: "client_credentials"
					}
				);
				const result = await authApi.signup(data.access_token, signupData);
				if (updateRedux) {
					// TODO: update redux if necessary
				}
				resolve(result);
			} catch (err) {
				reject(err);
			}
		});
	}

	return {
		initialize,
		login,
		signup,
		...auth
	};
};

// application configuration like auth config, gateway config, or any other static data required globally

import ENV from "react-native-config";

// ios env config - https://medium.com/armenotech/configure-environment-variables-with-react-native-config-for-ios-and-android-7079c0842d8b
const gatewayConfig = {
	authApiBaseURL: ENV.AUTH_API_BASE_URL,
	baseURL: ENV.BASEURL,
	adminApiBaseURL: ENV.ADMIN_API_BASEURL
};

const authConfig = {
	accessTokenAccessor: "accessToken",
	idTokenAccessor: "idToken",
	refreshTokenAccessor: "refreshToken",
	oAuthConfig: {
		issuer: ENV.ISSUER,
		clientId: ENV.CLIENT_ID,
		clientSecret: ENV.CLIENT_SECRET,
		redirectUrl: ENV.REDIRECT_URL,
		scopes: ENV.SCOPES?.split(" ")
	}
};

export { gatewayConfig, authConfig };

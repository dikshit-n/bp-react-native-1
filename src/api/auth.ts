import {
	AuthConfiguration,
	RefreshResult,
	authorize,
	refresh
} from "react-native-app-auth";
import { authConfig } from "src/config";
import { getCookie } from "src/utils";
import { AdminGateway, AuthGateway } from "./gateway";
import { userApi } from ".";

export interface USER_DATA {
	userId: string;
	username: string;
	role: string;
}

export interface LOGIN_DATA extends USER_DATA {
	accessToken: string;
	refreshToken: string;
	idToken: string;
}

export interface SIGNUP_DATA {}

interface USER_CLAIM {
	claim_type: string;
	claim_value: string;
}

interface USER {
	email: string;
	phone_number: string;
	user_name: string;
	first_name: string;
	last_name: string;
	user_claims: USER_CLAIM[];
}

interface BUSINESS {
	business_name: string;
	email: string;
	logo_link: string;
	mobile_phone: string;
	address_line1: string;
	address_line2: string;
	city: string;
	state: string;
	zipcode: string;
	country_code: number;
	is_active: boolean;
	website_link: string;
	timezone_id: number;
}

export interface SIGNUP_PAYLOAD {
	user: USER;
	business: BUSINESS;
	roles: string[];
	applications: number[];
}

class AuthApi {
	async login(oAuthConfig: AuthConfiguration): Promise<LOGIN_DATA> {
		const result = await authorize(oAuthConfig);
		const userData = await userApi.getUserDataFromToken(result.accessToken);
		return {
			...result,
			...userData
		};
	}

	signup(
		accessToken: LOGIN_DATA["accessToken"],
		data: SIGNUP_PAYLOAD
	): Promise<SIGNUP_DATA> {
		// setup the accessToken obtained from client credentials flow, to access the signup route
		const adminGateway = new AdminGateway({ accessToken }).create();
		// signup with the api of identity server
		return adminGateway.post("/v1/business/signup", data);
	}

	async logout() {
		// TODO: make any api call if necessary
		const accessToken = await getCookie(authConfig.accessTokenAccessor);
		const customGateway = new AuthGateway({ setupCustomizations: false })
			.setupHeadersForRequestInterceptors({
				Authorization: `Bearer ${accessToken}`
			})
			.create();
		return customGateway.get("/connect/endsession");
	}

	getAccessTokenFromRefreshToken(
		refreshToken: LOGIN_DATA["refreshToken"]
	): Promise<RefreshResult> {
		return refresh(authConfig.oAuthConfig, { refreshToken });
	}
}

export const authApi = new AuthApi();

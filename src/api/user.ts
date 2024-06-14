import { AdminGateway, AuthGateway, USER_DATA } from "src/api";
import { authConfig } from "src/config";
import { getCookie } from "src/utils";

export type USER_DETAILS = USER_DETAIL[];

export interface USER_DETAIL {
	name?: string;
	given_name?: string;
	middle_name?: string;
	family_name?: string;
	nickname?: string;
	picture?: any;
	preferred_username?: string;
	gender?: string;
	user_id: USER_DATA["userId"];
}

class UserApi {
	async getUserDataFromToken(token: string): Promise<USER_DATA> {
		// set up a custom gateway with id token as authorization header
		const customGateway = new AuthGateway({ setupCustomizations: false })
			.setupHeadersForRequestInterceptors({
				Authorization: token ? `Bearer ${token}` : undefined
			})
			.create();
		try {
			const { data } = await customGateway.get("/connect/userinfo");
			return {
				username: data.preferred_username,
				role: data.role,
				userId: data.sub
			};
		} catch (err) {
			return Promise.reject(err);
		}
	}

	async getUsersFromIds(userIds: USER_DATA["userId"][]): Promise<USER_DETAILS> {
		const accessToken = await getCookie(authConfig.accessTokenAccessor);
		const adminGateway = new AdminGateway({ accessToken }).create();
		return userIds.length > 0
			? (
					await adminGateway.post("/v1/user/profile/list", {
						user_ids: userIds
					})
			  ).data
			: [];
	}
}

export const userApi = new UserApi();

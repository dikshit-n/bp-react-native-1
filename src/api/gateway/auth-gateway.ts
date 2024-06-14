import { AxiosRequestConfig } from "axios";
import { gatewayConfig } from "src/config";
import { Gateway } from ".";

export class AuthGateway extends Gateway {
	constructor(
		config: AxiosRequestConfig & {
			setupCustomizations?: boolean;
		} = {}
	) {
		const {
			setupCustomizations = true,
			baseURL = gatewayConfig.authApiBaseURL,
			...rest
		} = config;
		super({
			setupCustomizations,
			baseURL,
			...rest
		});
	}
}

export const authGateway = new AuthGateway().create();

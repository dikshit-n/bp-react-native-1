import { AxiosRequestConfig } from "axios";
import { gatewayConfig } from "src/config";
import { Gateway } from "./default-gateway";

export class AdminGateway extends Gateway {
	constructor(
		config: AxiosRequestConfig & {
			setupCustomizations?: boolean;
			accessToken: string; // accessToken obtained from client credential flow is required to access the admin gateway
		}
	) {
		const {
			setupCustomizations = false,
			baseURL = gatewayConfig.adminApiBaseURL,
			...rest
		} = config;
		super({
			setupCustomizations,
			baseURL,
			...rest
		});
		this.setupHeadersForRequestInterceptors(async () => ({
			Authorization: `Bearer ${config.accessToken}`
		}));
	}
}

// some application specific globally required utils like version upgrade check

import { Alert, Platform } from "react-native";
import { authApi } from "src/api";
import { authConfig } from "src/config";
import { queryClient } from "src/custom-hooks";
import { resetRedux } from "src/redux";
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
import DeviceInfo from "react-native-device-info";
import ENV from "react-native-config";
import { deleteCookie } from ".";

interface VERSION_UPGRADE_INFO {
	currentVersion: string;
	appStoreVersion: string;
	needVersionUpgrade: boolean;
	isMandatory: boolean;
}

export const handleAppLogout = async () => {
	// 1. clear session in backend using logout api call
	// 2. clear auth related cookies
	// 3. flush react-query
	// 4. flush redux
	await authApi.logout().catch(); // ignore error
	await deleteCookie(authConfig.accessTokenAccessor);
	await deleteCookie(authConfig.refreshTokenAccessor);
	await deleteCookie(authConfig.idTokenAccessor);
	queryClient.clear();
	resetRedux();
};

export const versionUpgradeInfo = (): Promise<VERSION_UPGRADE_INFO> =>
	new Promise(async (resolve, reject) => {
		const currentVersion = DeviceInfo.getVersion();
		try {
			if (Platform.OS === "ios") {
				// fetch app store version
				const metadata = await getAppstoreAppMetadata(ENV.APP_ID);
				resolve({
					currentVersion,
					appStoreVersion: metadata.version,
					needVersionUpgrade: metadata.version > currentVersion,
					isMandatory: true
				});
			} else {
				// fetch playstore version
				const metadata = await getAppstoreAppMetadata(ENV.APP_PACKAGE_ID);
				resolve({
					currentVersion,
					appStoreVersion: metadata.version,
					needVersionUpgrade: metadata.version > currentVersion,
					isMandatory: true
				});
			}
		} catch (err) {
			reject(err);
		}
	});

export const versionUpgradeCheck = async () => {
	try {
		const metadata = await versionUpgradeInfo();
		if (metadata.needVersionUpgrade && metadata.isMandatory) {
			Alert.alert(
				"Upgrade available",
				"Please update your application to proceed",
				[
					{
						text: "Upgrade"
					}
				]
			);
		}
	} catch (err) {
		// ignore error
	}
};

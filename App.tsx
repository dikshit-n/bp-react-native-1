import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { Navigation } from "./src/navigation";
import { useAuth } from "./src/custom-hooks";
import { handleAppLogout, versionUpgradeCheck } from "./src/utils/global-utils";

const App: React.WithNavigationFC = () => {
	const { initialize } = useAuth();

	const initializeApplication = async () => {
		await versionUpgradeCheck();
		try {
			await initialize();
		} catch (err) {
			handleAppLogout().catch(); // ignore error
		}
		SplashScreen.hide();
	};

	useEffect(() => {
		// kick-start the application
		initializeApplication();
	}, []);

	return <Navigation />;
};

export default App;

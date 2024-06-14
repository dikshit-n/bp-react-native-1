import { AppRegistry } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import App from "./App";
import { name as appName } from "./app.json";
import { store } from "./src/redux";
import { queryClient } from "./src/custom-hooks";

function ReactNativeApp() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReduxProvider store={store}>
				<NavigationContainer>
					<App />
				</NavigationContainer>
			</ReduxProvider>
		</QueryClientProvider>
	);
}

AppRegistry.registerComponent(appName, () => ReactNativeApp);

// TODO:
// 1. integrate react native elements for UI components
// 2. upgrade ts config for a short import path
// 3. upgrade linting
// 4. fix image import path error bug
// 5. change application name
// 6. update README.md
// 7. create env files

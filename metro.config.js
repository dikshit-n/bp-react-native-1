const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	resolver: {
		assetExts: assetExts.filter((ext) => ext !== "svg"),
		sourceExts: [...sourceExts, "svg"],
		enableGlobalPackages: true
	}
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

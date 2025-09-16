const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Modify assetExts and sourceExts to support SVGs
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts.push("svg");

// Add transformer for SVG
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

// Wrap with NativeWind
module.exports = withNativeWind(config, { input: "./app/global.css" });
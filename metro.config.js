/* eslint-env node */
// Learn more https://docs.expo.io/guides/customizing-metro
const { withTamagui } = require('@tamagui/metro-plugin');
const { getDefaultConfig } = require('expo/metro-config');
// add nice web support with optimizing compiler + CSS extraction

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true
});

config.resolver.assetExts.push('lottie');

module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css'
});

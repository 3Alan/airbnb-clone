import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { WebView as BaseWebView } from 'react-native-webview';

const Webview = () => {
  const { uri } = useLocalSearchParams<{ uri: string }>();

  return <BaseWebView style={{ flex: 1 }} source={{ uri }} />;
};

export default Webview;

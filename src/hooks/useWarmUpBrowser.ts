import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

// https://docs.expo.dev/guides/authentication/#warming-the-browser
export default function useWarmUpBrowser() {
  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
}

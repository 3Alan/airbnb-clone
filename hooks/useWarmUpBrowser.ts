import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

// https://docs.expo.dev/guides/authentication/#warming-the-browser
export default function useWarmUpBrowser() {
  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
}

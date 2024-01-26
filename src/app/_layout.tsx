import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useNavigationContainerRef } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';

import Toast from '@/components/common/Toast';

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation
      // ...
    })
  ]
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 6000,
      retry: false
    }
  }
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const ref = useNavigationContainerRef();
  const { bottom } = useSafeAreaInsets();
  const tabBarHeight = 50;
  const [loaded, error] = useFonts({
    Mon: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MonSB: require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    MonB: require('../../assets/fonts/Montserrat-Bold.ttf'),
    ...FontAwesome.font
  });

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ToastProvider
            duration={2000}
            offsetBottom={bottom + tabBarHeight + 16}
            renderType={{
              save: options => (
                <Toast type="save" img={options.data.img} listName={options.message as string} />
              ),
              delete: options => (
                <Toast type="delete" img={options.data.img} listName={options.message as string} />
              )
            }}
          >
            <Stack />
          </ToastProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default Sentry.wrap(RootLayout);

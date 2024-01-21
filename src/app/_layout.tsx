import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';

import Toast from '@/components/common/Toast';

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

export default function RootLayout() {
  const { bottom } = useSafeAreaInsets();
  const tabBarHeight = 50;
  const [loaded, error] = useFonts({
    Mon: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MonSB: require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    MonB: require('../../assets/fonts/Montserrat-Bold.ttf'),
    ...FontAwesome.font
  });

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
            <RootLayoutNav />
          </ToastProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: '登录或注册',
          headerTitleStyle: {
            fontFamily: 'MonSB'
          },
          // 安卓貌似没有
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          )
        }}
      />
    </Stack>
  );
}

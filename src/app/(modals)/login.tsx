import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import Colors from '../../constants/Colors';

import useWarmUpBrowser from '@/hooks/useWarmUpBrowser';

enum AuthType {
  Github = 'oauth_github',
  Google = 'oauth_google'
}

export default function Login() {
  const router = useRouter();
  useWarmUpBrowser();

  const githubAuth = useOAuth({ strategy: AuthType.Github });
  const googleAuth = useOAuth({ strategy: AuthType.Google });

  const onLogin = async (type: AuthType) => {
    const authFlow = {
      [AuthType.Github]: githubAuth,
      [AuthType.Google]: googleAuth
    };

    try {
      const { setActive, createdSessionId } = await authFlow[type].startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.error('OAuth error', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput keyboardType="email-address" placeholder="Email" style={{ marginBottom: 30 }} />
      <Button colors={['#e51e4d', '#d70465']}>Continue</Button>

      <View style={styles.separatorContainer}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            // 根据平台设置的最小宽度
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
        />
        <Text style={styles.separator}>OR</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            // 根据平台设置的最小宽度
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <Button
          theme="standard"
          icon={<Ionicons size={24} name="md-logo-github" />}
          onPress={() => onLogin(AuthType.Github)}
        >
          Continue with Github
        </Button>
        <Button
          theme="standard"
          icon={<Ionicons size={24} name="md-logo-google" />}
          onPress={() => onLogin(AuthType.Google)}
        >
          Continue with Google
        </Button>
        <Button
          theme="standard"
          icon={<Ionicons size={24} name="md-logo-facebook" />}
          onPress={() => Linking.openURL('https://www.facebook.com/')}
        >
          Continue with Facebook
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 26,
    backgroundColor: '#fff',
    flex: 1
  },
  separatorContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
    gap: 10
  },
  separator: {
    fontFamily: 'MonSB',
    fontSize: 16,
    color: Colors.grey
  }
});

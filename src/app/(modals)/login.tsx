import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';

import useAuth from '@/hooks/useAuth';
import request from '@/utils/request';

export default function Login() {
  const { styles } = useStyles(stylesheet);
  const toast = useToast();
  const { login } = useAuth();
  const {
    control,
    handleSubmit
    // TODO:
    // formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: data => {
      return request.post('/auth/login', data);
    }
  });

  const onLogin = async (data: any) => {
    // TODO: 格式验证
    const res = await mutation.mutateAsync(data);
    if (res.data.success) {
      login({ ...res.data.user, token: res.data.token });
      router.back();
    } else {
      toast.show(res.data.message, {
        type: 'danger'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '登录或注册',
          headerTitleStyle: {
            fontFamily: 'MonSB'
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          )
        }}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            placeholder="邮箱"
            style={{ marginBottom: 30, height: 60 }}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            keyboardType="visible-password"
            secureTextEntry
            placeholder="密码"
            style={{ marginBottom: 30, height: 60 }}
          />
        )}
      />

      <Button onPress={handleSubmit(onLogin)}>继续</Button>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>或</Text>
        <View style={styles.separator} />
      </View>

      <Button theme="tertiary" icon={<Ionicons size={24} name="logo-google" />}>
        使用 Google 账号登录
      </Button>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
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
    flex: 1,
    borderBottomColor: theme.colors.border,
    // 根据平台设置的最小宽度
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  separatorText: {
    fontFamily: 'MonSB',
    fontSize: theme.size.sm,
    color: theme.colors.gray600
  }
}));

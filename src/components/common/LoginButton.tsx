import { useRouter } from 'expo-router';
import React from 'react';

import Button from './Button';

const LoginButton = () => {
  const router = useRouter();

  return (
    <Button
      colors={['#e51e4d', '#d70465']}
      onPress={() => {
        router.navigate('/login');
      }}
    >
      登录
    </Button>
  );
};

export default LoginButton;

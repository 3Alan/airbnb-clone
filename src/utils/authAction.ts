import { router } from 'expo-router';

import { useUserStore } from '@/store/user';

export default function authAction(callback: Function) {
  return () => {
    const isLogin = useUserStore.getState().user?.token;

    if (isLogin) {
      callback();
    } else {
      router.push('/login');
    }
  };
}

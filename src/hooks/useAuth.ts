import { useUserStore } from '@/store/user';

export default function useAuth() {
  const { user, logout, login } = useUserStore(state => state);

  return { user, isLogin: !!user?.token, login, logout };
}

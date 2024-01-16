import { User } from '@prisma/client';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

type UserInfo = User & { token: string };

interface UserState {
  user: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
}

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') return localStorage.getItem(name);

    return (await SecureStore.getItemAsync(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') return localStorage.setItem(name, value);

    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') return localStorage.removeItem(name);

    await SecureStore.deleteItemAsync(name);
  }
};

export const useUserStore = create<UserState>(
  // @ts-ignore
  persist(
    set => ({
      user: null,
      login: user => set({ user }),
      logout: () => set({ user: null })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => storage)
    }
  )
);

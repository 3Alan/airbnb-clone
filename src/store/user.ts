import { User } from '@prisma/client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import storageAdapter from './storageAdapter';

type UserInfo = User & { token: string };

interface UserState {
  user: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
}

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
      storage: createJSONStorage(() => storageAdapter)
    }
  )
);

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import storageAdapter from './storageAdapter';

export interface GuestNumber {
  adultNumber: number;
  childrenNumber: number;
  infantNumber: number;
}

interface TripState {
  dateRange: string[];
  location: string;
  guestNumber: GuestNumber;
}

interface Actions {
  setDateRange: (dateRange: string[]) => void;
  cleanDateRange: () => void;
  setGuestNumber: (guestNumber: GuestNumber) => void;
}

const defaultState = {
  dateRange: [],
  location: '',
  guestNumber: {
    adultNumber: 0,
    childrenNumber: 0,
    infantNumber: 0
  }
};

export const useTrip = create<TripState & Actions>(
  // @ts-ignore
  persist(
    set => ({
      ...defaultState,
      setDateRange: (dateRange: string[]) => set({ dateRange }),
      cleanDateRange: () => set({ dateRange: [] }),
      setGuestNumber: (guestNumber: GuestNumber) => set({ guestNumber })
    }),
    {
      name: 'trip-storage',
      storage: createJSONStorage(() => storageAdapter)
    }
  )
);

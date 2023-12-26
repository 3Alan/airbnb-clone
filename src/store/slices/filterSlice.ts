import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GuestNumber {
  adultNumber: number;
  childrenNumber: number;
  infantNumber: number;
}

export interface SearchState {
  dateRange: string[];
  location: string;
  guestNumber: GuestNumber;
}

const initialState: SearchState = {
  dateRange: [],
  location: '',
  guestNumber: {
    adultNumber: 0,
    childrenNumber: 0,
    infantNumber: 0
  }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeDateRange: (state, action: PayloadAction<string[]>) => {
      state.dateRange = action.payload;
    },
    cleanDateRange: state => {
      state.dateRange = [];
    },
    changeLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    changeGuestNumber: (state, action: PayloadAction<GuestNumber>) => {
      state.guestNumber = action.payload;
    }
  }
});

export const { changeDateRange, cleanDateRange, changeLocation, changeGuestNumber } =
  filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  dateRange: string[];
  location: string;
  adultNumber: number;
  childrenNumber: number;
  infantNumber: number;
}

const initialState: SearchState = {
  dateRange: [],
  location: '',
  adultNumber: 0,
  childrenNumber: 0,
  infantNumber: 0
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
    changeAdultNumber: (state, action: PayloadAction<number>) => {
      state.adultNumber = action.payload;
    },
    changeChildrenNumber: (state, action: PayloadAction<number>) => {
      state.childrenNumber = action.payload;
    },
    changeInfantNumber: (state, action: PayloadAction<number>) => {
      state.infantNumber = action.payload;
    }
  }
});

export const {
  changeDateRange,
  cleanDateRange,
  changeLocation,
  changeAdultNumber,
  changeChildrenNumber,
  changeInfantNumber
} = filterSlice.actions;

export default filterSlice.reducer;

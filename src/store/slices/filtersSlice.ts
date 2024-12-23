import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleType } from '@/types/vehicle';

interface FiltersState {
  manufacturer: string | null;
  type: VehicleType | null;
  year: number | null;
  sortBy: 'price' | 'year' | null;
  sortOrder: 'asc' | 'desc';
}

const initialState: FiltersState = {
  manufacturer: null,
  type: null,
  year: null,
  sortBy: null,
  sortOrder: 'asc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setManufacturer: (state: FiltersState, action: PayloadAction<string | null>) => {
      state.manufacturer = action.payload;
    },
    setType: (state: FiltersState, action: PayloadAction<VehicleType | null>) => {
      state.type = action.payload;
    },
    setYear: (state: FiltersState, action: PayloadAction<number | null>) => {
      state.year = action.payload;
    },
    setSortBy: (state: FiltersState, action: PayloadAction<'price' | 'year' | null>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state: FiltersState, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    resetFilters: (state: FiltersState) => {
      return initialState;
    },
  },
});

export const {
  setManufacturer,
  setType,
  setYear,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer; 
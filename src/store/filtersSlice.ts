import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  manufacturer: string;
  type: string;
}

const initialState: FiltersState = {
  manufacturer: '',
  type: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setManufacturer: (state, action: PayloadAction<string>) => {
      state.manufacturer = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  },
});

export const { setManufacturer, setType } = filtersSlice.actions;
export default filtersSlice.reducer; 
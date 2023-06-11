import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Country from '../../types/entities/country.entity';
import { getCountries } from '../actions/country.action';

interface CountryState {
  countries: Country[] | null;
  loading: boolean;
  error: unknown;
}

const initialState: CountryState = {
  countries: null,
  loading: false,
  error: null
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCountries.fulfilled, (state, action: PayloadAction<Country[]>) => {
      state.loading = false;
      state.countries = action.payload;
    });
    builder.addCase(getCountries.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

const countryReducer = countrySlice.reducer;

export default countryReducer;

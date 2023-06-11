import { createAsyncThunk } from '@reduxjs/toolkit';
import CountryService from '../../api/services/country.service';

export const getCountries = createAsyncThunk(
  'country/getCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CountryService.getCountries();

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

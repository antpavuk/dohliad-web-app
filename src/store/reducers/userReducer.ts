import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { register } from '../actions/user.action';

export interface UserState {
  registrationStatus?: boolean;
  loading: boolean;
  error: unknown | null;
}

const initialState: UserState = {
  registrationStatus: undefined,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistrationStatus: (state) => {
      state.registrationStatus = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.registrationStatus = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<unknown>) => {
      state.registrationStatus = false;
      state.loading = false;
      state.error = action.payload || 'An error occurred.';
    });
    builder.addDefaultCase((state) => {
      state.loading = false;
    });
  }
});

const userReducer = userSlice.reducer;

export default userReducer;

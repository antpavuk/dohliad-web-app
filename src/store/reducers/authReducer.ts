//authReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, refreshToken } from '../actions/auth.action';
import TokenData from '../../types/token/token-data.type';

interface AuthState {
  tokenData: TokenData | null;
  loading: boolean;
  error: unknown | null;
}

const initialState: AuthState = {
  tokenData: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<TokenData>) => {
      state.tokenData = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred.';
    });

    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(refreshToken.fulfilled, (state, action: PayloadAction<TokenData>) => {
      state.tokenData = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(refreshToken.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred.';
    });

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.tokenData = null;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred.';
    });

    builder.addDefaultCase((state) => {
      state.loading = false;
    });
  }
});

const authReducer = authSlice.reducer;

export default authReducer;

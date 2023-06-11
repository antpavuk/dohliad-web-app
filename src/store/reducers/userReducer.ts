import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  assignBrandToCurrentEnvoy,
  authorizeEnvoy,
  getCurrentUser,
  getUsers,
  register,
  updateUser
} from '../actions/user.action';
import User from '../../types/entities/identity/user.entity';

export interface UserState {
  users: User[];
  сurrentUser?: User;
  registrationStatus?: boolean;
  envoyAuthStatus?: boolean;
  brandAssignStatus?: boolean;
  loading: boolean;
  error: unknown | null;
}

const initialState: UserState = {
  users: [],
  сurrentUser: undefined,
  registrationStatus: undefined,
  envoyAuthStatus: undefined,
  brandAssignStatus: undefined,
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

    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUsers.rejected, (state, action: PayloadAction<unknown>) => {
      state.users = [];
      state.loading = false;
      state.error = action.payload || 'An error occurred.';
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.сurrentUser = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCurrentUser.rejected, (state, action: PayloadAction<unknown>) => {
      state.сurrentUser = undefined;
      state.loading = false;
      state.error = action.payload || 'An error occurred.';
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.сurrentUser = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action: PayloadAction<unknown>) => {
      state.сurrentUser = undefined;
      state.loading = false;
      state.error = action.payload || 'An error occurred.';
    });

    builder.addCase(authorizeEnvoy.pending, (state) => {
      state.envoyAuthStatus = undefined;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authorizeEnvoy.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.envoyAuthStatus = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(authorizeEnvoy.rejected, (state, action: PayloadAction<unknown>) => {
      state.envoyAuthStatus = false;
      state.loading = false;
      state.error = action.payload || 'An error occurred.';
    });

    builder.addCase(assignBrandToCurrentEnvoy.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      assignBrandToCurrentEnvoy.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.brandAssignStatus = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(assignBrandToCurrentEnvoy.rejected, (state, action: PayloadAction<unknown>) => {
      state.сurrentUser = undefined;
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

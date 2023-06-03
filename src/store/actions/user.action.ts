import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/services/user.service';
import { RegisterUserCredentials } from '../../types/models/create-user';

export const register = createAsyncThunk(
  'user/register',
  async (body: RegisterUserCredentials, { rejectWithValue }) => {
    try {
      await UserService.register(body);

      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// reset User state
export const resetRegistrationStatus = createAction('user/resetRegistrationStatus');

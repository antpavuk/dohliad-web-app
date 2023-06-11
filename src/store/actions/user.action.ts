import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/services/user.service';
import { RegisterUserCredentials } from '../../types/models/create-user';
import { GetUsersParams } from '../../types/models/params/get-users';
import { UpdateUser } from '../../types/models/update-user';

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

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.getCurrentUser();

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (params: GetUsersParams, { rejectWithValue }) => {
    try {
      const response = await UserService.getUsers(params);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (body: UpdateUser, { rejectWithValue }) => {
    try {
      const response = await UserService.updateUser(body);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authorizeEnvoy = createAsyncThunk(
  'user/authorizeEnvoy',
  async (userId: string, { rejectWithValue }) => {
    try {
      await UserService.authorizeEnvoy(userId);

      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const assignBrandToCurrentEnvoy = createAsyncThunk(
  'user/assignBrandToCurrentEnvoy',
  async (brandId: string, { rejectWithValue }) => {
    try {
      await UserService.assignBrandToCurrentEnvoy(brandId);

      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetRegistrationStatus = createAction('user/resetRegistrationStatus');

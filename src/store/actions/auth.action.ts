import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../api/services/auth.service';
import { AuthUserCredentials } from '../../types/models/auth-user';
import { TokenName } from '../../types/token/token-name.enum';
import isTokenExpired from '../../utils/isTokenExpired';

export const login = createAsyncThunk(
  'auth/login',
  async (body: AuthUserCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(body);

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem(TokenName.Access, accessToken);
      localStorage.setItem(TokenName.Refresh, refreshToken);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      // Check if tokens are in localStorage
      const accessToken = localStorage.getItem(TokenName.Access);
      const refreshToken = localStorage.getItem(TokenName.Refresh);

      if (!accessToken) {
        localStorage.removeItem(TokenName.Refresh);

        return null;
      }

      if (!refreshToken) {
        localStorage.removeItem(TokenName.Access);

        return null;
      }

      if (isTokenExpired(accessToken)) {
        // Make the API request to refresh the token
        const response = await AuthService.refreshToken({ accessToken, refreshToken });

        const responseTokenData = response.data;
        // Save tokens to localStorage
        localStorage.setItem(TokenName.Access, responseTokenData.accessToken);
        localStorage.setItem(TokenName.Refresh, responseTokenData.refreshToken);

        return responseTokenData;
      }

      return { accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // Make the API request to log out the user
    await AuthService.logout();
    localStorage.clear();

    // Delete tokens from localStorage
    // localStorage.removeItem(TokenName.Access);
    // localStorage.removeItem(TokenName.Refresh);

    // Dispatch an action to update the state indicating logout
    return {};
  } catch (error) {
    return rejectWithValue(error);
  }
});

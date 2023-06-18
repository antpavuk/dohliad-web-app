import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateIngredient } from '../../types/models/create-ingredient';
import IngredientService from '../../api/services/ingredient.service';
import BaseParams from '../../types/models/params/base-params';

export const createIngredient = createAsyncThunk(
  'ingredient/createIngredient',
  async (body: CreateIngredient, { rejectWithValue }) => {
    try {
      const response = await IngredientService.createIngredient(body);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getIngredients = createAsyncThunk(
  'ingredient/getIngredients',
  async (params: BaseParams, { rejectWithValue }) => {
    try {
      const response = await IngredientService.getIngredients(params);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getIngredient = createAsyncThunk(
  'ingredient/getIngredient',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await IngredientService.getIngredient(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

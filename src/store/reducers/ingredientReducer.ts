import Ingredient from '../../types/entities/ingredient.entity';
import { createIngredient, getIngredient, getIngredients } from '../actions/ingredient.action';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IngredientState {
  ingredient: Ingredient | null;
  ingredients: Ingredient[] | null;
  loading: boolean;
  error: unknown;
}

const initialState: IngredientState = {
  ingredient: null,
  ingredients: null,
  loading: false,
  error: null
};

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
    builder.addCase(getIngredients.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getIngredient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIngredient.fulfilled, (state, action: PayloadAction<Ingredient>) => {
      state.loading = false;
      state.ingredient = action.payload;
    });
    builder.addCase(getIngredient.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createIngredient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createIngredient.fulfilled, (state, action: PayloadAction<Ingredient>) => {
      state.loading = false;
      state.ingredient = action.payload;
      state.ingredients = [...(state.ingredients || []), action.payload];
    });
    builder.addCase(createIngredient.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

const ingredientReducer = ingredientSlice.reducer;

export default ingredientReducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Product from '../../types/entities/product.entity';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct
} from '../actions/product.action';

interface ProductState {
  product: Product | null;
  products: Product[] | null;
  isProductCreated: boolean;
  isProductUpdated: boolean;
  isProductDeleted: boolean;
  loading: boolean;
  error: unknown;
}

const initialState: ProductState = {
  product: null,
  products: null,
  isProductCreated: false,
  isProductUpdated: false,
  isProductDeleted: false,
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.isProductCreated = false;
    });
    builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.product = action.payload;
      state.products = [...(state.products || []), action.payload];
      state.isProductCreated = true;
    });
    builder.addCase(createProduct.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.isProductUpdated = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.product = action.payload;
      state.products =
        state.products?.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ) || [];
      state.isProductUpdated = true;
    });
    builder.addCase(updateProduct.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.isProductDeleted = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.product = action.payload;
      state.products = state.products?.filter((product) => product.id !== action.payload.id) || [];
      state.isProductDeleted = true;
    });

    builder.addCase(deleteProduct.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default productSlice.reducer;

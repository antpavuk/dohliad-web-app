import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand
} from '../actions/brand.action';
import Brand from '../../types/entities/brand.entity';

interface BrandState {
  brands: Brand[];
  newFetchedBrand?: Brand;
  isUpdated?: boolean;
  isDeleted?: boolean;
  loading: boolean;
  // isCreated - this is a flag to indicate if the brand was created successfully
  // this flag is used in the CreateBrandForm component to show a success message
  // to logout the user due to the token invalidation on the backend
  isCreated?: boolean;
  error: unknown;
}

const initialState: BrandState = {
  brands: [],
  newFetchedBrand: undefined,
  isCreated: false,
  isUpdated: undefined,
  isDeleted: undefined,
  loading: false,
  error: null
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBrands.fulfilled, (state, { payload }: PayloadAction<Brand[]>) => {
      state.loading = false;
      state.brands = payload;
    });
    builder.addCase(getBrands.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(getBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBrand.fulfilled, (state, { payload }: PayloadAction<Brand>) => {
      state.loading = false;
      state.brands = state.brands.map((brand) => (brand.id === payload.id ? payload : brand));
      state.newFetchedBrand = payload;
    });
    builder.addCase(getBrand.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(createBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrand.fulfilled, (state, { payload }: PayloadAction<Brand>) => {
      state.loading = false;
      state.brands.push(payload);
      state.isCreated = true;
    });
    builder.addCase(createBrand.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isCreated = false;
    });

    builder.addCase(updateBrand.pending, (state) => {
      state.loading = true;
      state.isUpdated = undefined;
    });
    builder.addCase(updateBrand.fulfilled, (state, { payload }: PayloadAction<Brand>) => {
      state.loading = false;
      state.brands = state.brands.map((brand) => (brand.id === payload.id ? payload : brand));
      state.isUpdated = true;
    });
    builder.addCase(updateBrand.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isUpdated = false;
    });

    builder.addCase(deleteBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBrand.fulfilled, (state, { payload }: PayloadAction<boolean>) => {
      state.loading = false;
      state.isDeleted = payload;
    });
    builder.addCase(deleteBrand.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addDefaultCase((state) => {
      state.loading = false;
    });
  }
});

const brandReducer = brandSlice.reducer;

export default brandReducer;

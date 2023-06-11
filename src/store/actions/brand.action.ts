import { createAsyncThunk } from '@reduxjs/toolkit';
import BrandService from '../../api/services/brand.service';
import { GetBrandsParams } from '../../types/models/params/get-brands-params';
import { CreateBrand } from '../../types/models/create-brand';
import { UpdateBrand } from '../../types/models/update-brand';

export const getBrands = createAsyncThunk(
  'brand/getBrands',
  async (params: GetBrandsParams, { rejectWithValue }) => {
    try {
      const response = await BrandService.getBrands(params);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getBrand = createAsyncThunk(
  'brand/getBrand',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await BrandService.getBrand(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async (body: CreateBrand, { rejectWithValue }) => {
    try {
      const response = await BrandService.createBrand(body);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async (body: UpdateBrand, { rejectWithValue }) => {
    try {
      const response = await BrandService.updateBrand(body);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

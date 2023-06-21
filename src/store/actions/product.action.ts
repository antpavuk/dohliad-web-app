import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../../api/services/product.service';
import CreateProduct from '../../types/models/create-product';
import UpdateProduct from '../../types/models/update-product';
import BaseParams from '../../types/models/params/base-params';

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (body: CreateProduct, { rejectWithValue }) => {
    try {
      const response = await ProductService.createProduct(body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (params: BaseParams, { rejectWithValue }) => {
    try {
      const response = await ProductService.getProducts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await ProductService.getProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (body: UpdateProduct, { rejectWithValue }) => {
    try {
      const response = await ProductService.updateProduct(body);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await ProductService.deleteProduct(id);

      return { ...response.data, id };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

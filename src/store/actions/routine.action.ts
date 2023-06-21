import { createAsyncThunk } from '@reduxjs/toolkit';
import RoutineService from '../../api/services/routine.service';
import CreateRoutine from '../../types/models/create-routine';
import GenerateRoutineByQuiz from '../../types/models/generate-routine-by-quiz';

export const createRoutine = createAsyncThunk(
  'routine/createRoutine',
  async (body: CreateRoutine, { rejectWithValue }) => {
    try {
      const response = await RoutineService.createRoutine(body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const generateRoutineByQuiz = createAsyncThunk(
  'routine/generateRoutineByQuiz',
  async (body: GenerateRoutineByQuiz, { rejectWithValue }) => {
    try {
      const response = await RoutineService.generateRoutineByQuiz(body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getRoutines = createAsyncThunk(
  'routine/getRoutines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await RoutineService.getRoutines();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getRoutine = createAsyncThunk(
  'routine/getRoutine',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await RoutineService.getRoutine(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRoutine = createAsyncThunk(
  'routine/deleteRoutine',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await RoutineService.deleteRoutine(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

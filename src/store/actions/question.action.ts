import { createAsyncThunk } from '@reduxjs/toolkit';
import QuestionService from '../../api/services/question.service';

export const getQuestions = createAsyncThunk(
  'question/getQuestions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await QuestionService.getQuestions();

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

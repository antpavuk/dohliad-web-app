import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getQuestions } from '../actions/question.action';

import { Question } from '../../types/entities/question.entity';

interface QuestionState {
  question: Question | null;
  questions: Question[] | null;
  loading: boolean;
  error: unknown;
}

const initialState: QuestionState = {
  question: null,
  questions: null,
  loading: false,
  error: null
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
      state.loading = false;
      state.questions = action.payload;
    });
    builder.addCase(getQuestions.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default questionSlice.reducer;

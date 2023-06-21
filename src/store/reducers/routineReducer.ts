import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Routine from '../../types/entities/routine.entity';
import { getRoutine, getRoutines, createRoutine, deleteRoutine } from '../actions/routine.action';

interface RoutineState {
  routine: Routine | null;
  routines: Routine[] | null;
  loading: boolean;
  error: unknown;
}

const initialState: RoutineState = {
  routine: null,
  routines: null,
  loading: false,
  error: null
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoutines.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoutines.fulfilled, (state, action: PayloadAction<Routine[]>) => {
      state.loading = false;
      state.routines = action.payload;
    });
    builder.addCase(getRoutines.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getRoutine.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoutine.fulfilled, (state, action: PayloadAction<Routine>) => {
      state.loading = false;
      state.routine = action.payload;
    });
    builder.addCase(getRoutine.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createRoutine.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRoutine.fulfilled, (state, action: PayloadAction<Routine>) => {
      state.loading = false;
      state.routine = action.payload;
      state.routines = [...(state.routines || []), action.payload];
    });
    builder.addCase(createRoutine.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteRoutine.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRoutine.fulfilled, (state, action: PayloadAction<Routine>) => {
      state.loading = false;
      state.routine = action.payload;
      state.routines = [...(state.routines || []), action.payload];
    });
    builder.addCase(deleteRoutine.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default routineSlice.reducer;

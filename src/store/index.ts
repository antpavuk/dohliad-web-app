import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import brandReducer from './reducers/brandReducer';
import countryReducer from './reducers/countryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  brand: brandReducer,
  country: countryReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppThunk = ThunkAction<void, RootState, null, any>;

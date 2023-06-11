import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../..';
import useTypedSelector from '../utils/useTypedSelector';

const useAuthState = () => {
  const isAuthStateLoading = useTypedSelector((state: RootState) => state.auth.loading);

  const getAuthState = (state: RootState) => state.auth;

  const isAuth = createSelector(getAuthState, (auth) => !!auth.tokenData);

  const auth = useTypedSelector(isAuth);

  return { isAuthStateLoading, auth };
};

export default useAuthState;

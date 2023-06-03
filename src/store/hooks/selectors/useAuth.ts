import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../..';
import useTypedSelector from '../utils/useTypedSelector';

const useAuth = () => {
  // Selector to get the tokenData from the auth state
  const isAuth = createSelector(
    (state: RootState) => state.auth,
    (auth) => !!auth.tokenData
  );

  const isLoading = createSelector(
    (state: RootState) => state.auth,
    (auth) => auth.loading
  );

  const auth = useTypedSelector(isAuth);
  const loading = useTypedSelector(isLoading);

  return { auth, loading };
};

export default useAuth;

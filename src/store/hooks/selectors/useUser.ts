import { createSelector } from 'reselect';

import { RootState } from '../..';
import useTypedSelector from '../utils/useTypedSelector';

const useUserState = () => {
  const isRegistrationSuccessful = createSelector(
    (state: RootState) => state.user,
    (user) => user.registrationStatus
  );

  const registrationSuccesfull = useTypedSelector(isRegistrationSuccessful);

  return { registrationSuccesfull };
};

export default useUserState;

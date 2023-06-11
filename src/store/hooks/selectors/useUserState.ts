import { createSelector } from 'reselect';

import { RootState } from '../..';
import useTypedSelector from '../utils/useTypedSelector';
import { UserRole } from '../../../types/user-roles.enum';

const useUserState = () => {
  const isUserStateLoading = useTypedSelector((state: RootState) => state.user.loading);
  const isRegistrationSuccessful = createSelector(
    (state: RootState) => state.user,
    (user) => user.registrationStatus
  );
  const registrationSuccesfull = useTypedSelector(isRegistrationSuccessful);

  const users = useTypedSelector((state) => state.user.users);

  const getCurrentUser = (state: RootState) => state.user.сurrentUser;
  const currentUser = useTypedSelector(getCurrentUser);

  const isCurrentUserAdmin = createSelector(
    getCurrentUser,
    (currentUser) => currentUser?.role === UserRole.Admin
  );
  const isCurrentUserClient = createSelector(
    getCurrentUser,
    (currentUser) => currentUser?.role === UserRole.Client
  );
  const isCurrentUserBrandEnvoy = createSelector(
    getCurrentUser,
    (currentUser) => currentUser?.role === UserRole.BrandEnvoy
  );
  const hasCurrentUserBrand = createSelector(
    getCurrentUser,
    (currentUser) => currentUser?.role === UserRole.BrandEnvoy && currentUser?.brand !== null
  );

  const currentUserIsClient = useTypedSelector(isCurrentUserClient);
  const currentUserIsAdmin = useTypedSelector(isCurrentUserAdmin);
  const currentUserIsBrandEnvoy = useTypedSelector(isCurrentUserBrandEnvoy);

  const brandEnvoyAuthorized = useTypedSelector((state) => state.user.envoyAuthStatus);
  const currentUserHasBrand = useTypedSelector(hasCurrentUserBrand);
  const brandAssigned = useTypedSelector((state) => state.user.brandAssignStatus);

  return {
    isUserStateLoading,
    registrationSuccesfull,
    users,
    currentUser,
    currentUserIsAdmin,
    currentUserIsClient,
    currentUserIsBrandEnvoy,
    brandEnvoyAuthorized,
    currentUserHasBrand,
    brandAssigned
  };
};

export default useUserState;

import { Routes, Route, Navigate } from 'react-router-dom';
import { FC, Suspense, useEffect } from 'react';

import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import LandingPage from '../pages/LandingPage';
import { AdminRoute, AuthRoute, BrandRoute, IngredientRoute } from '../types/routes.enum';
import useAuthState from '../store/hooks/selectors/useAuthState';
import useActions from '../store/hooks/useActions';
import useUser from '../store/hooks/selectors/useUserState';
import BasicPageWrapper from '../pages/wrappers/BasicPageWrapper';
import UsersPage from '../pages/UsersPage';
import CurrentBrandPage from '../pages/CurrentBrandPage';
import BrandsPage from '../pages/BrandsPage';
import BrandPage from '../pages/BrandPage';
import IngredientsPage from '../pages/IngredientsPage';

const Router: FC = () => {
  const { auth, isAuthStateLoading } = useAuthState();

  const { getBrands } = useActions();
  const { getCurrentUser } = useActions();

  const { currentUserIsAdmin } = useUser();

  useEffect(() => {
    if (auth) {
      getCurrentUser();
      getBrands({
        pageNumber: 1,
        pageSize: 10,
        isSortAscending: true,
        orderBy: 'Name'
      });
    }
  }, [auth]);

  if (isAuthStateLoading) return <div>LOADING</div>;

  return (
    <Suspense fallback={<div>LOADING</div>}>
      <Routes>
        {!auth ? (
          <>
            <Route path={AuthRoute.LANDING} element={<LandingPage />} />
            <Route path={AuthRoute.LOGIN} element={<LoginPage />} />
            <Route path={AuthRoute.SIGN_UP} element={<SignUpPage />} />
            <Route path={AuthRoute.SIGN_UP_BRAND} element={<SignUpPage />} />
            <Route path={'*'} element={<Navigate to={AuthRoute.LOGIN} replace={true} />} />
          </>
        ) : (
          <>
            {currentUserIsAdmin ? (
              <>
                <Route
                  path={AdminRoute.HOME}
                  element={
                    <BasicPageWrapper>
                      <UsersPage />
                    </BasicPageWrapper>
                  }
                />
                <Route path={'*'} element={<Navigate to={AdminRoute.HOME} replace={true} />} />
              </>
            ) : (
              <>
                <Route path={BrandRoute.BRAND_CURRENT_USER} element={<CurrentBrandPage />} />
                <Route path={BrandRoute.BRAND} element={<BrandPage />} />
                <Route path={BrandRoute.BRANDS} element={<BrandsPage />} />
                <Route path={IngredientRoute.INGREDIENTS} element={<IngredientsPage />} />
                <Route
                  path={'*'}
                  element={<Navigate to={BrandRoute.BRAND_CURRENT_USER} replace={true} />}
                />
              </>
            )}
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default Router;

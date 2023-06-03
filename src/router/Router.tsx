import { Routes, Route } from 'react-router-dom';
import { FC, Suspense } from 'react';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import LandingPage from '../pages/LandingPage';
import { AuthRoute } from '../types/routes.enum';
import useAuth from '../store/hooks/selectors/useAuth';
import { Button } from '@mui/material';
import useActions from '../store/hooks/useActions';

const Router: FC = () => {
  const { auth, loading } = useAuth();
  const { logout } = useActions();

  if (loading) return <div>LOADING</div>;

  return (
    <Suspense fallback={<div>LOADING</div>}>
      <Routes>
        {!auth ? (
          <>
            <Route path={AuthRoute.LANDING} element={<LandingPage />} />
            <Route path={AuthRoute.LOGIN} element={<LoginPage />} />
            <Route path={AuthRoute.SIGN_UP} element={<SignUpPage />} />
            <Route path={AuthRoute.SIGN_UP_BRAND} element={<SignUpPage />} />
          </>
        ) : (
          <>
            <Route
              path={'/'}
              element={
                <div>
                  AUTHORIZED
                  <Button variant="contained" onClick={() => logout()}>
                    LOGOUT
                  </Button>
                </div>
              }
            />
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default Router;

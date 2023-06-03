import { FC, useMemo, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Snackbar, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import AuthPageWrapper from './wrappers/AuthPageWrapper';
import SignUpForm from '../components/forms/SignUpForm';
import { UserRole } from '../types/user-roles.enum';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserState from '../store/hooks/selectors/useUser';
import useActions from '../store/hooks/useActions';
import PrimaryButton from '../components/PrimaryButton';
import { AuthRoute } from '../types/routes.enum';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUpPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { registrationSuccesfull } = useUserState();
  const { resetRegistrationStatus } = useActions();
  const navigate = useNavigate();

  const role = useMemo(() => {
    const path = location.pathname;
    if (path.includes('/brand')) {
      return UserRole.BrandEnvoy;
    } else {
      return UserRole.Client;
    }
  }, [location.pathname]);

  const postRegistrationMessage = useMemo(() => {
    if (registrationSuccesfull) {
      return t('signUpPage.toat.registrationSuccesfull');
    } else if (registrationSuccesfull === false) {
      return t('signUpPage.toat.registrationFailed');
    }
  }, [registrationSuccesfull]);

  const handleClose = (): void => {
    resetRegistrationStatus();
  };

  return (
    <AuthPageWrapper
      title={
        role === UserRole.Client ? t('signUpPage.title.client') : t('signUpPage.title.brandEnvoy')
      }>
      {registrationSuccesfull ? (
        role === UserRole.Client ? (
          <PrimaryButton
            onClick={() => {
              navigate(AuthRoute.LOGIN);
            }}
            color="primary"
            sx={{ marginTop: '20px' }}>
            {t('signUpPage.registrationSuccessful.text.client')}
          </PrimaryButton>
        ) : (
          <Typography variant="h5" sx={{ marginTop: '20px' }}>
            {t('signUpPage.registrationSuccessful.text.brandEnvoy')}
          </Typography>
        )
      ) : (
        <SignUpForm role={role} />
      )}
      <Snackbar
        open={registrationSuccesfull !== undefined}
        autoHideDuration={10000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={registrationSuccesfull ? 'success' : 'error'}
          sx={{ width: '100%' }}>
          {postRegistrationMessage}
        </Alert>
      </Snackbar>
    </AuthPageWrapper>
  );
};

export default SignUpPage;

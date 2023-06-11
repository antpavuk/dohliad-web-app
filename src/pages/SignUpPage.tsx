import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Snackbar, Typography } from '@mui/material';

import AuthPageWrapper from './wrappers/AuthPageWrapper';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserState from '../store/hooks/selectors/useUserState';
import useActions from '../store/hooks/useActions';
import PrimaryButton from '../components/PrimaryButton';
import { AuthRoute } from '../types/routes.enum';
import CreateUserRole from '../types/models/enums/create-user-role';
import SignUpForm from '../components/forms/auth/SignUpForm';
import Alert from '../components/Alert';

const SignUpPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { registrationSuccesfull } = useUserState();
  const { resetRegistrationStatus } = useActions();
  const navigate = useNavigate();

  const role = useMemo(() => {
    const path = location.pathname;
    if (path.includes('/brand')) {
      return CreateUserRole.BrandEnvoy;
    } else {
      return CreateUserRole.Client;
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
        role === CreateUserRole.Client
          ? t('signUpPage.title.client')
          : t('signUpPage.title.brandEnvoy')
      }>
      {registrationSuccesfull ? (
        role === CreateUserRole.Client ? (
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
        <Box>
          <SignUpForm role={role} />
          <Box sx={{ mt: 3 }}>
            <Typography color="textSecondary" variant="body1">
              {t('signUpPage.haveAccount')}{' '}
              <span
                style={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 'lighter',
                  fontStyle: 'italic',
                  fontSize: '0.8rem'
                }}
                onClick={() => navigate(AuthRoute.LOGIN)}>
                {t('signUpPage.login')}
              </span>
            </Typography>
          </Box>
        </Box>
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

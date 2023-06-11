import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import AuthPageWrapper from './wrappers/AuthPageWrapper';
import LoginForm from '../components/forms/auth/LoginForm';
import { AuthRoute } from '../types/routes.enum';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <AuthPageWrapper title={t('loginPage.title')}>
      <Box>
        <LoginForm />
        <Box sx={{ mt: 3 }}>
          <Typography color="textSecondary" variant="body1">
            {t('loginPage.noAccount')}{' '}
            <span
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
                fontWeight: 'lighter',
                fontStyle: 'italic',
                fontSize: '0.8rem'
              }}
              onClick={() => navigate(AuthRoute.SIGN_UP)}
            >
              {t('loginPage.signUp')}
            </span>
          </Typography>
        </Box>
      </Box>
    </AuthPageWrapper>
  );
};

export default LoginPage;

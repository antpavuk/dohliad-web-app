import { FC } from 'react';

import AuthPageWrapper from './wrappers/AuthPageWrapper';
import LoginForm from '../components/forms/LoginForm';
import { useTranslation } from 'react-i18next';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  return (
    <AuthPageWrapper title={t('loginPage.title')}>
      <LoginForm />
    </AuthPageWrapper>
  );
};

export default LoginPage;

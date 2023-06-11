import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Topbar from '../components/navbars/Topbar';
import PrimaryButton from '../components/PrimaryButton';
import { AuthRoute } from '../types/routes.enum';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Topbar
        toolSection={
          <>
            <Typography variant="h6">
              <Link to={AuthRoute.LOGIN}>
                <PrimaryButton>{t('landingPage.button.login')}</PrimaryButton>
              </Link>
            </Typography>
            <Typography variant="h6">
              <Link to={AuthRoute.SIGN_UP}>
                <PrimaryButton variant="contained">{t('landingPage.button.signUp')}</PrimaryButton>
              </Link>
            </Typography>
            <Typography variant="h6">
              <Link to={AuthRoute.SIGN_UP_BRAND}>
                <PrimaryButton variant="text">{t('landingPage.button.brandEnvoy')}</PrimaryButton>
              </Link>
            </Typography>
          </>
        }
      />
    </div>
  );
};

export default LandingPage;

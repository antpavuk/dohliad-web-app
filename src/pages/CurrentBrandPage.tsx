import { Box, Container, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import Brand from '../types/entities/brand.entity';
import BasicPageWrapper from './wrappers/BasicPageWrapper';
import PrimaryButton from '../components/PrimaryButton';
import useUserState from '../store/hooks/selectors/useUserState';
import useBrandState from '../store/hooks/selectors/useBrandState';
import CreateBrandForm from '../components/forms/CreateBrandForm';
import UserBrandEnvoy from '../types/entities/identity/user-brand-envoy.entity';
import PrimaryModal from '../components/modal/PrimaryModal';
import useActions from '../store/hooks/useActions';
import { useTranslation } from 'react-i18next';
import { BrandRoute } from '../types/routes.enum';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '../components/headers/BrandHeader';

interface NotEnvoyOfAnyBrandProps {
  onCreateBrand: () => void;
  onChooseBrand: () => void;
}

const NotEnvoyOfAnyBrand: FC<NotEnvoyOfAnyBrandProps> = ({ onCreateBrand, onChooseBrand }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
        <Typography variant="h3">{t('brandPage.warnings.notEnvoyOfAnyBrand.title')}</Typography>
        <Typography variant="body1">
          {t('brandPage.warnings.notEnvoyOfAnyBrand.description')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            mt: '1rem'
          }}>
          <PrimaryButton variant="outlined" color="primary" onClick={onCreateBrand}>
            {t('brandPage.button.createBrand')}
          </PrimaryButton>
          <PrimaryButton
            variant="contained"
            color="primary"
            onClick={() => {
              onChooseBrand();
              navigate(BrandRoute.BRANDS);
            }}>
            {t('brandPage.button.chooseBrand')}
          </PrimaryButton>
        </Box>
      </Box>
    </Container>
  );
};

const CurrentBrandPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isUserStateLoading, currentUser, currentUserIsBrandEnvoy, currentUserHasBrand } =
    useUserState();
  const { isBrandStateLoading } = useBrandState();

  const { getBrands } = useActions();
  const [isCreateBrandModalOpen, setIsCreateBrandModalOpen] = useState(false);

  useEffect(() => {
    getBrands({});
  }, []);

  const handleVisitWebsite = () => {
    const brand = (currentUser as UserBrandEnvoy)?.brand as Brand;
    window.open(brand.websiteUrl, '_blank');
  };

  const handleCreateBrand = () => {
    setIsCreateBrandModalOpen(true);
  };

  const handleChooseBrand = () => {
    navigate(BrandRoute.BRANDS);
  };

  if (isBrandStateLoading || isUserStateLoading) return <div>LOADING...</div>;

  if (!currentUserIsBrandEnvoy) return <div>NOT ENVOY</div>;

  if (!currentUserHasBrand) {
    return (
      <BasicPageWrapper>
        <NotEnvoyOfAnyBrand onCreateBrand={handleCreateBrand} onChooseBrand={handleChooseBrand} />
        <PrimaryModal
          title={t('brandPage.createBrandForm.title') as string}
          open={isCreateBrandModalOpen}
          onClose={() => {
            setIsCreateBrandModalOpen(false);
          }}>
          <CreateBrandForm />
        </PrimaryModal>
      </BasicPageWrapper>
    );
  }

  const brand = (currentUser as UserBrandEnvoy)?.brand as Brand;

  return (
    <BasicPageWrapper>
      <BrandHeader brand={brand} onVisitWebsite={handleVisitWebsite} />
    </BasicPageWrapper>
  );
};

export default CurrentBrandPage;

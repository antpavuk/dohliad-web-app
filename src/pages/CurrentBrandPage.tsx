import { Box, Container, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import Brand from '../types/entities/brand.entity';
import BasicPageWrapper from './wrappers/BasicPageWrapper';
import PrimaryButton from '../components/PrimaryButton';
import useUserState from '../store/hooks/selectors/useUserState';
import useBrandState from '../store/hooks/selectors/useBrandState';
import CreateBrandForm from '../components/forms/brand/CreateBrandForm';
import UserBrandEnvoy from '../types/entities/identity/user-brand-envoy.entity';
import PrimaryModal from '../components/modal/PrimaryModal';
import useActions from '../store/hooks/useActions';
import { useTranslation } from 'react-i18next';
import { AuthRoute, BrandRoute } from '../types/routes.enum';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '../components/headers/BrandHeader';
import EditBrandForm from '../components/forms/brand/EditBrandForm';
import DeleteBrandForm from '../components/forms/brand/DeleteBrandForm';

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
  const { isBrandStateLoading, isBrandUpdated, isBrandDeleted } = useBrandState();

  const { getBrands, getCurrentUser, logout } = useActions();

  const [isCreateBrandModalOpen, setIsCreateBrandModalOpen] = useState(false);
  const [isEditBrandModalOpen, setIsEditBrandModalOpen] = useState(false);
  const [isDeleteBrandModalOpen, setIsDeleteBrandModalOpen] = useState(false);

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

  const handleEditBrand = () => {
    setIsEditBrandModalOpen(true);
  };

  const handleDeleteBrand = () => {
    setIsDeleteBrandModalOpen(true);
  };

  const handleCreateBrandCancel = () => {
    setIsCreateBrandModalOpen(false);
  };

  const handleEditBrandCancel = () => {
    setIsEditBrandModalOpen(false);
  };

  const handleDeleteBrandCancel = () => {
    setIsDeleteBrandModalOpen(false);
  };

  const handleChooseBrand = () => {
    navigate(BrandRoute.BRANDS);
  };

  useEffect(() => {
    if (isBrandUpdated) {
      getCurrentUser();
      setIsEditBrandModalOpen(false);
    }
  }, [isBrandUpdated]);

  useEffect(() => {
    if (isBrandDeleted) {
      logout();
    }
    if (isBrandDeleted) navigate(AuthRoute.LOGIN);
  }, [isBrandDeleted]);

  if (isBrandStateLoading || isUserStateLoading) return <div>LOADING...</div>;

  if (!currentUserIsBrandEnvoy) return <div>NOT ENVOY</div>;

  if (!currentUserHasBrand) {
    return (
      <BasicPageWrapper>
        <NotEnvoyOfAnyBrand onCreateBrand={handleCreateBrand} onChooseBrand={handleChooseBrand} />
        <PrimaryModal
          title={t('brandPage.createBrandForm.title') as string}
          open={isCreateBrandModalOpen}
          onClose={handleCreateBrandCancel}>
          <CreateBrandForm />
        </PrimaryModal>
      </BasicPageWrapper>
    );
  }

  const brand = (currentUser as UserBrandEnvoy)?.brand as Brand;

  return (
    <BasicPageWrapper>
      <BrandHeader
        brand={brand}
        onVisitWebsite={handleVisitWebsite}
        isCurrentUserBrandEnvoy={currentUserIsBrandEnvoy}
        onEditBrand={currentUserIsBrandEnvoy && currentUserHasBrand ? handleEditBrand : undefined}
        onDeleteBrand={
          currentUserIsBrandEnvoy && currentUserHasBrand ? handleDeleteBrand : undefined
        }
      />
      <PrimaryModal
        title={t('brandPage.editBrandForm.title') as string}
        open={isEditBrandModalOpen}
        onClose={handleEditBrandCancel}>
        <EditBrandForm brand={brand} />
      </PrimaryModal>
      <PrimaryModal
        title={t('brandPage.deleteBrandForm.title') as string}
        open={isDeleteBrandModalOpen}
        onClose={handleDeleteBrandCancel}>
        <DeleteBrandForm brand={brand} />
      </PrimaryModal>
    </BasicPageWrapper>
  );
};

export default CurrentBrandPage;

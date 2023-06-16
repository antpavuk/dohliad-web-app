import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../PrimaryButton';
import Brand from '../../../types/entities/brand.entity';
import useActions from '../../../store/hooks/useActions';
import { AuthRoute } from '../../../types/routes.enum';

interface DeleteBrandFormProps {
  brand: Brand;
}
const DeleteBrandForm: FC<DeleteBrandFormProps> = ({ brand }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { deleteBrand } = useActions();

  const handleDeleteBrand = () => {
    deleteBrand(brand.id);
    navigate(AuthRoute.LOGIN);
  };

  return (
    <FormControl>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('brandPage.deleteBrandForm.description', { brandName: brand.name })}
      </Typography>
      <PrimaryButton variant="outlined" color="primary" onClick={handleDeleteBrand}>
        {t('brandPage.deleteBrandForm.button.submit')}
      </PrimaryButton>
    </FormControl>
  );
};

export default DeleteBrandForm;

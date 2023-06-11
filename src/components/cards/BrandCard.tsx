import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Box } from '@mui/material';
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';

import PrimaryButton from '../PrimaryButton';
import Brand from '../../types/entities/brand.entity';
import flagCodes, { FlagCodes } from '../../utils/constants/flags.constants';
import { BrandRoute } from '../../types/routes.enum';
import useActions from '../../store/hooks/useActions';

const BrandCard = ({ brand }: { brand: Brand }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { assignBrandToCurrentEnvoy } = useActions();

  return (
    <Card sx={{ width: 345 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textDecoration: 'blue underline', pointerEvents: 'pointer' }}>
            {brand.name}
          </Typography>
          <Flag country={flagCodes[brand.countryName as keyof FlagCodes]} />
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <PrimaryButton
          variant="outlined"
          color="primary"
          onClick={() => {
            assignBrandToCurrentEnvoy(brand.id);
          }}>
          {t('brandCard.button.becomeEnvoy')}
        </PrimaryButton>
        <PrimaryButton
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate(BrandRoute.BRAND.replace(':id', brand.id.toString()));
          }}>
          {t('brandCard.button.findOutMore')}
        </PrimaryButton>
      </CardActions>
    </Card>
  );
};

export default BrandCard;

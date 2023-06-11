import { Box, Container, Divider, Typography } from '@mui/material';
import { FC } from 'react';
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../PrimaryButton';
import ReadMoreText from '../ReadMoreText';
import flagCodes, { FlagCodes } from '../../utils/constants/flags.constants';
import Brand from '../../types/entities/brand.entity';

interface BrandHeaderProps {
  brand: Brand;
  onVisitWebsite: () => void;
}

const BrandHeader: FC<BrandHeaderProps> = ({ brand, onVisitWebsite }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Box>
        <Typography variant="h1">{brand.name}</Typography>
      </Box>
      <Box sx={{ mt: '1rem' }}>
        <ReadMoreText text={brand.description} maxLength={200} openModalOnFullText />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1rem',
          mt: '1rem'
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center'
          }}>
          <Typography variant="body2">{`from ${brand.countryName}`}</Typography>
          <Flag country={flagCodes[brand.countryName as keyof FlagCodes]} />
        </Box>

        <Box>
          <PrimaryButton variant="outlined" color="primary" onClick={onVisitWebsite}>
            {t('brandPage.button.visitWebsite')}
          </PrimaryButton>
        </Box>
      </Box>
      <Divider sx={{ mt: '2rem', mb: '2rem', color: (theme) => theme.palette.primary.main }} />
    </Container>
  );
};

export default BrandHeader;

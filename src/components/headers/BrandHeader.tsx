import { FC } from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../PrimaryButton';
import ReadMoreText from '../ReadMoreText';
import flagCodes, { FlagCodes } from '../../utils/constants/flags.constants';
import Brand from '../../types/entities/brand.entity';

interface BrandHeaderProps {
  brand: Brand;
  onVisitWebsite: () => void;
  isCurrentUserBrandEnvoy?: boolean;
  onEditBrand?: () => void;
  onDeleteBrand?: () => void;
}

const BrandHeader: FC<BrandHeaderProps> = ({
  brand,
  onVisitWebsite,
  isCurrentUserBrandEnvoy,
  onEditBrand,
  onDeleteBrand
}) => {
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
          <PrimaryButton
            variant="outlined"
            color="primary"
            onClick={onVisitWebsite}
            startIcon={<LaunchIcon />}>
            {t('brandPage.button.visitWebsite')}
          </PrimaryButton>
          {isCurrentUserBrandEnvoy && (
            <>
              <PrimaryButton
                variant="contained"
                color="primary"
                sx={{ ml: '1rem' }}
                onClick={
                  onEditBrand ? onEditBrand : () => console.log('Edit brand not implemented')
                }
                startIcon={<EditIcon />}>
                {t('brandPage.button.editBrand')}
              </PrimaryButton>
              <PrimaryButton
                variant="contained"
                color="primary"
                sx={{ ml: '1rem' }}
                onClick={
                  onDeleteBrand ? onDeleteBrand : () => console.log('Delete brand not implemented')
                }
                startIcon={<DeleteRoundedIcon />}>
                {t('brandPage.button.deleteBrand')}
              </PrimaryButton>
            </>
          )}
        </Box>
      </Box>
      <Divider sx={{ mt: '2rem', mb: '2rem', color: (theme) => theme.palette.primary.main }} />
    </Container>
  );
};

export default BrandHeader;

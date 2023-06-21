import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BasicPageWrapper from './wrappers/BasicPageWrapper';
import CreateProductForm from '../components/forms/product/CreateProductForm';

const CreateProductPage: FC = () => {
  const { t } = useTranslation();

  return (
    <BasicPageWrapper>
      <Container>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          {t('createProductPage.title')}
        </Typography>

        <Box sx={{ maxWidth: '400px', margin: '0 auto' }}>
          <CreateProductForm />
        </Box>
      </Container>
    </BasicPageWrapper>
  );
};

export default CreateProductPage;

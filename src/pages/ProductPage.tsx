import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Divider, Link, Typography } from '@mui/material';
import BasicPageWrapper from './wrappers/BasicPageWrapper';
import useActions from '../store/hooks/useActions';
import useProductState from '../store/hooks/selectors/useProductState';
import LinkIcon from '@mui/icons-material/Link';
import { t } from 'i18next';

const ProductPage: FC = () => {
  const { id } = useParams();
  const { getProduct } = useActions();
  const { product } = useProductState();

  useEffect(() => {
    if (id) getProduct(id);
  }, [id]);

  return (
    <BasicPageWrapper>
      <Container sx={{ mt: '1rem' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '1rem'
          }}>
          <Box
            component={'figure'}
            sx={{
              minWidth: '300px',
              maxWidth: '300px'
            }}>
            <img
              src={product?.imageUrl}
              alt={product?.name}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </Box>
          <Box sx={{ mt: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Box>
              <Typography variant="h3">{product?.name}</Typography>
              <Divider sx={{ mt: '0.5rem' }} />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                <strong>{`${t('productPage.ingredients')}: `}</strong>
                {product?.ingredients.map((ingredient) => ingredient.name).join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>{`${t('productPage.skinCareFeatures')}: `}</strong>
                {product?.functions.map((feature) => feature).join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>{`${t('productPage.skinType')}: `}</strong>
                {product?.skinTypes.map((skinType) => skinType).join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>{`${t('productPage.classification')}: `}</strong>
                {product?.classification}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>{`${t('productPage.category')}: `}</strong>
                {product?.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>{`${t('productPage.age')}: `}</strong>
                {product?.age}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>{`${t('productPage.volume')}: `}</strong>
                {product?.volume} ml
              </Typography>
            </Box>

            <Box>
              <Typography variant="body1">{product?.description}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
                gap: '0.5rem'
              }}>
              <Typography variant="body1">
                <strong>{t('productPage.purchaseUrls')}</strong>
              </Typography>
              {product?.purchaseUrls ? (
                product.purchaseUrls.map((url) => (
                  <Link
                    href={url}
                    target="_blank"
                    key={url}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                    <LinkIcon />
                    {url}
                  </Link>
                ))
              ) : (
                <Typography variant="body1">{t('productPage.noPurchaseUrls')}</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </BasicPageWrapper>
  );
};

export default ProductPage;

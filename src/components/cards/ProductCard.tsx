import { FC } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Product from '../../types/entities/product.entity';
import PrimaryButton from '../PrimaryButton';
import useActions from '../../store/hooks/useActions';
import { ProductRoute } from '../../types/routes.enum';

interface ProductCardProps {
  product: Product;
}

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
//   price: number;
//   age: number;
//   volume: number;
//   ingredients: Ingredient[];
//   purchaseUrls: string[];
//   functions: SkinCareFeature[];
//   skinTypes: SkinType[];
//   classification: Classification;
//   category: Category;
// }

const MAX_NAME_LENGTH = 50;
const MAX_INGREDIENTS_LENGTH = 80;

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();

  const { deleteProduct } = useActions();

  const truncatedName =
    product.name.length > MAX_NAME_LENGTH
      ? `${product.name.slice(0, MAX_NAME_LENGTH)}...`
      : product.name;

  const ingredientsText = product.ingredients.map((ingredient) => ingredient.name).join(', ');
  const truncatedIngredients =
    ingredientsText.length > MAX_INGREDIENTS_LENGTH
      ? `${ingredientsText.slice(0, MAX_INGREDIENTS_LENGTH)}...`
      : ingredientsText;
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
        sx={{ width: '100%', objectFit: 'contain' }}
      />
      <CardContent
        sx={{
          height: 180
        }}>
        <Link to={ProductRoute.PRODUCT.replace(':id', product.id.toString())}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              //stable size
              height: 70
            }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                сolor: 'cta.black',
                textDecoration: 'blue underline',
                pointerEvents: 'pointer',
                cursor: 'pointer'
              }}>
              {truncatedName}
            </Typography>
          </Box>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {`For the age >${product.age} years`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>{`${t('productCard.volume')}: `}</strong>
          {`${product.volume} ml`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>{`${t('productCard.ingredients')}: `}</strong>
          {truncatedIngredients}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <PrimaryButton
          // eslint-disable-next-line react/jsx-no-undef
          variant="outlined"
          color="primary"
          startIcon={<Delete />}
          onClick={() => {
            deleteProduct(product.id);
          }}>
          {t('productCard.button.delete')}
        </PrimaryButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

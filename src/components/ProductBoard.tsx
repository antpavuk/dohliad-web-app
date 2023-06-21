import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

import Product from '../types/entities/product.entity';
import ProductCard from './cards/ProductCard';
import { Search, SearchIconWrapper, StyledInputBase } from './search/Search';
import { Container } from '@mui/material';

interface ProductBoardProps {
  products: Product[] | null;
  onSearchValueChange: (searchValue: string) => void;
  searchValue: string;
}

const ProductBoard: FC<ProductBoardProps> = ({ products, onSearchValueChange, searchValue }) => {
  const { t } = useTranslation();

  if (!products) {
    return <div>No Products</div>;
  }

  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t('ingredientsPage.searchPlaceholder') as string}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => {
            onSearchValueChange(e.target.value);
          }}
          value={searchValue}
        />
      </Search>
      {!products || products.length === 0 ? (
        <Container sx={{ mt: '1rem' }}>
          <div>No Products</div>
        </Container>
      ) : (
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            width: '100%',
            mt: '1rem'
          }}>
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductBoard;

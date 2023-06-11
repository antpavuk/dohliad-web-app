import { useSelector } from 'react-redux';
import { RootState } from '../..';
import useTypedSelector from '../utils/useTypedSelector';

const useBrandState = () => {
  const isBrandStateLoading = useTypedSelector((state: RootState) => state.brand.loading);

  const brands = useSelector((state: RootState) => state.brand.brands);
  const newFetchedBrand = useSelector((state: RootState) => state.brand.newFetchedBrand);

  const isBrandCreated = useTypedSelector((state: RootState) => state.brand.isCreated);

  return { brands, isBrandCreated, isBrandStateLoading, newFetchedBrand };
};

export default useBrandState;

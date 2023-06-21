import { useSelector } from 'react-redux';
import { RootState } from '../..';

const useProductState = () => {
  const productState = useSelector((state: RootState) => state.product);

  return productState;
};

export default useProductState;

import { RootState } from '../..';
import useTypedSelector from '../utils/useTypedSelector';

const useCountryState = () => {
  const isCountryStateLoading = useTypedSelector((state: RootState) => state.country.loading);
  const countries = useTypedSelector((state: RootState) => state.country.countries);

  return { isCountryStateLoading, countries };
};

export default useCountryState;

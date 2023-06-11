import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/auth.action';
import * as UserActions from '../actions/user.action';
import * as BrandActions from '../actions/brand.action';
import * as CountryActions from '../actions/country.action';

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...AuthActions,
      ...UserActions,
      ...BrandActions,
      ...CountryActions
    },
    dispatch
  );
};

export default useActions;

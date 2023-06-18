import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/auth.action';
import * as UserActions from '../actions/user.action';
import * as BrandActions from '../actions/brand.action';
import * as CountryActions from '../actions/country.action';
import * as IngredientActions from '../actions/ingredient.action';

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...AuthActions,
      ...UserActions,
      ...BrandActions,
      ...CountryActions,
      ...IngredientActions
    },
    dispatch
  );
};

export default useActions;

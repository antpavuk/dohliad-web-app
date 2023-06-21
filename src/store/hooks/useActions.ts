import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/auth.action';
import * as UserActions from '../actions/user.action';
import * as BrandActions from '../actions/brand.action';
import * as CountryActions from '../actions/country.action';
import * as IngredientActions from '../actions/ingredient.action';
import * as ProductActions from '../actions/product.action';
import * as QuestionActions from '../actions/question.action';
import * as RoutineActions from '../actions/routine.action';

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...AuthActions,
      ...UserActions,
      ...BrandActions,
      ...CountryActions,
      ...IngredientActions,
      ...ProductActions,
      ...QuestionActions,
      ...RoutineActions
    },
    dispatch
  );
};

export default useActions;

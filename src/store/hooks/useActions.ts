import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/auth.action';
import * as UserActions from '../actions/user.action';

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...AuthActions,
      ...UserActions
    },
    dispatch
  );
};

export default useActions;

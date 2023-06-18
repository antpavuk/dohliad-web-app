import { useSelector } from 'react-redux';
import { RootState } from '../..';

const useIngredientState = () => {
  const ingredient = useSelector((state: RootState) => state.ingredient.ingredient);

  const ingredients = useSelector((state: RootState) => state.ingredient.ingredients);

  const isIngredientStateLoading = useSelector((state: RootState) => state.ingredient.loading);

  return { ingredient, ingredients, isIngredientStateLoading };
};

export default useIngredientState;

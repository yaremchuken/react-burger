import { GET_INGREDIENTS_FAILED } from '../actions/ingredients';

export const getIngredientsFailed = () => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};

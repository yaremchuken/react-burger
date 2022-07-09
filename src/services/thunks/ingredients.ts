import { AppDispatch, AppThunk } from '../../types';
import { getIngredientsFailed, getIngredientsRequest, getIngredientsSuccess } from '../actions/ingredients';
import { fetchIngredients } from '../apiService';

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());

  fetchIngredients()
    .then((res) => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data));
      } else {
        dispatch(getIngredientsFailed());
      }
    })
    .catch(() => dispatch(getIngredientsFailed()));
};

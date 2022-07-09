import { Ingredient } from '../../models/Ingredient';
import { TIngredientsActions } from '../actions/ingredients';
import { IngredientsActionType } from '../constants/ingredients';

type TIngredientsState = {
  ingredients: ReadonlyArray<Ingredient>;
  ingredientsRequested: boolean;
  ingredientsFailed: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequested: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case IngredientsActionType.GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequested: true,
        ingredientsFailed: false,
      };
    }

    case IngredientsActionType.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequested: false,
        ingredientsFailed: false,
      };
    }

    case IngredientsActionType.GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        ingredientsFailed: true,
      };
    }

    default:
      return state;
  }
};

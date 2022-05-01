import {
  CHOOSE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  ingredientsRequested: false,
  ingredientsFailed: false,

  chosenIngredient: undefined,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequested: true,
        ingredientsFailed: false,
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequested: false,
        ingredientsFailed: false,
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ...initialState,
        ingredientsFailed: true,
      };

    case CHOOSE_INGREDIENT:
      return {
        ...state,
        chosenIngredient: action.ingredient,
      };

    default:
      return state;
  }
};

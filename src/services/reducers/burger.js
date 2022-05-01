import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/burger';

const initialState = {
  composition: ['60d3b41abdacab0026a733c6'],
  price: 1255 * 2,
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        composition: [...state.composition, action.id],
        price: state.price + action.price,
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        composition: [...state.composition].filter((ingredient) => ingredient._id !== action.id),
        price: state.price - action.price,
      };

    default:
      return state;
  }
};

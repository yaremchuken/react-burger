import { uniqueIdProvider } from '../../utils/utils';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/burger';

const initialState = {
  composition: [],
  price: 0,
};

export const burgerReducer = (state = initialState, action) => {
  let composition = [...state.composition];
  const { ingredient } = action;

  switch (action.type) {
    case ADD_INGREDIENT:
      if (ingredient.type === 'bun') {
        composition[0] = ingredient;
      } else {
        composition.push({ ...ingredient, uniqueId: uniqueIdProvider() });
      }

      return {
        ...state,
        composition,
        price: totalPrice(composition),
      };

    case REMOVE_INGREDIENT:
      composition = composition.filter((i) => i.uniqueId !== ingredient.uniqueId);
      return {
        ...state,
        composition,
        price: totalPrice(composition),
      };

    default:
      return state;
  }
};

const totalPrice = (composition) => {
  return composition.map((i) => i.price).reduce((res, amount) => res + amount, 0) + composition[0].price;
};

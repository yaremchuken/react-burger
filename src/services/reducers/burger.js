import { ADD_INGREDIENT, CLEAR_COMPOSITION, REMOVE_INGREDIENT, SORT_INGREDIENTS } from '../actions/burger';

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
        composition.push(ingredient);
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

    case CLEAR_COMPOSITION:
      return {
        ...initialState,
      };

    case SORT_INGREDIENTS:
      const { idxFrom, idxTo } = action;

      const sorted = composition.splice(idxFrom, 1)[0];
      composition = [...composition.slice(0, idxTo), sorted, ...composition.slice(idxTo)];

      return {
        ...state,
        composition,
      };

    default:
      return state;
  }
};

const totalPrice = (composition) => {
  return composition.map((i) => i.price).reduce((res, amount) => res + amount, 0) + composition[0].price;
};

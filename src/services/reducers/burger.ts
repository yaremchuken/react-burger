import { Ingredient } from '../../models/Ingredient';
import { TBurgerActions } from '../actions/burger';
import { BurgerActionType } from '../../constants/burger';

type TBurgerState = {
  composition: ReadonlyArray<Ingredient>;
  price: number;
};

const initialState: TBurgerState = {
  composition: [],
  price: 0,
};

export const burgerReducer = (state = initialState, action: TBurgerActions): TBurgerState => {
  let composition = [...state.composition];

  switch (action.type) {
    case BurgerActionType.ADD_INGREDIENT: {
      const { ingredient } = action;

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
    }

    case BurgerActionType.REMOVE_INGREDIENT: {
      const { ingredient } = action;
      composition = composition.filter((i) => i.uniqueId !== ingredient.uniqueId);
      return {
        ...state,
        composition,
        price: totalPrice(composition),
      };
    }

    case BurgerActionType.CLEAR_COMPOSITION: {
      return {
        ...initialState,
      };
    }

    case BurgerActionType.SORT_INGREDIENTS: {
      const { idxFrom, idxTo } = action;

      const sorted = composition.splice(idxFrom, 1)[0];
      composition = [...composition.slice(0, idxTo), sorted, ...composition.slice(idxTo)];

      return {
        ...state,
        composition,
      };
    }

    default:
      return state;
  }
};

const totalPrice = (composition: ReadonlyArray<Ingredient>) => {
  return composition.map((i) => i.price).reduce((res, amount) => res + amount, 0) + composition[0].price;
};

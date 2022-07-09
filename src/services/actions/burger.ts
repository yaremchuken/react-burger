import { Ingredient } from '../../models/Ingredient';
import { BurgerActionType } from '../constants/burger';

export interface IAddIngredientAction {
  readonly type: typeof BurgerActionType.ADD_INGREDIENT;
  readonly ingredient: Ingredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof BurgerActionType.REMOVE_INGREDIENT;
  readonly ingredient: Ingredient;
}

export interface IClearCompositionAction {
  readonly type: typeof BurgerActionType.CLEAR_COMPOSITION;
}

export interface ISortIngredientsAction {
  readonly type: typeof BurgerActionType.SORT_INGREDIENTS;
  readonly idxFrom: number;
  readonly idxTo: number;
}

export const addIngredient = (ingredient: Ingredient): IAddIngredientAction => ({
  type: BurgerActionType.ADD_INGREDIENT,
  ingredient,
});

export const removeIngredient = (ingredient: Ingredient): IRemoveIngredientAction => ({
  type: BurgerActionType.REMOVE_INGREDIENT,
  ingredient,
});

export const clearComposition = (): IClearCompositionAction => ({
  type: BurgerActionType.CLEAR_COMPOSITION,
});

export const sortIngredients = (idxFrom: number, idxTo: number): ISortIngredientsAction => ({
  type: BurgerActionType.SORT_INGREDIENTS,
  idxFrom,
  idxTo,
});

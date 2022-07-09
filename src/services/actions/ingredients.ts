import { IngredientsActionType } from '../../constants/ingredients';
import { Ingredient } from '../../models/Ingredient';

export interface IGetIngredientsRequestAction {
  readonly type: typeof IngredientsActionType.GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof IngredientsActionType.GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<Ingredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof IngredientsActionType.GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
  type: IngredientsActionType.GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (ingredients: Array<Ingredient>): IGetIngredientsSuccessAction => ({
  type: IngredientsActionType.GET_INGREDIENTS_SUCCESS,
  ingredients,
});

export const getIngredientsFailed = (): IGetIngredientsFailedAction => ({
  type: IngredientsActionType.GET_INGREDIENTS_FAILED,
});

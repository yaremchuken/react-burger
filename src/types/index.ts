import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TBurgerActions } from '../services/actions/burger';
import { TIngredientsActions } from '../services/actions/ingredients';
import { TOrderActions } from '../services/actions/order';
import { TUserActions } from '../services/actions/user';
import { TWebSocketActions } from '../services/actions/web-socket';
import { store } from '../store';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TBurgerActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TWebSocketActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, undefined, TApplicationActions>>;

export type AppDispatch = Dispatch<TApplicationActions>;

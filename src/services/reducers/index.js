import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { tokenReducer } from './token';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  user: userReducer,
  token: tokenReducer,
});

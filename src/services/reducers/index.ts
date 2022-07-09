import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { webSocketReducer } from './web-socket';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  user: userReducer,
  webSocket: webSocketReducer,
});

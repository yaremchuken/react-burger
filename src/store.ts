import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './services/middleware/web-socket-middleware';
import { rootReducer } from './services/reducers';
import { WEB_SOCKET_ACTIONS, WEB_SOCKET_URL } from './utils/constants';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(WEB_SOCKET_URL, WEB_SOCKET_ACTIONS)))
);

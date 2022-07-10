import { Middleware, MiddlewareAPI } from 'redux';
import { WebSocketActionType } from '../../constants/web-socket';
import { AppDispatch, RootState } from '../../types';
import {
  wsConnectionClose,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
  wsSendMessage,
} from './/../actions/web-socket';

export const socketMiddleware = (url: string): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | undefined = undefined;

    return (next: any) => (action: { type: WebSocketActionType; path: string; token?: string }) => {
      const { dispatch } = store;
      const { type, path, token } = action;

      if (type === WebSocketActionType.WS_CONNECTION_START) {
        const address = url + (path ?? '') + (token ? '?token=' + token : '');
        socket = new WebSocket(address);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsConnectionSuccess(event));
        };

        socket.onerror = (event) => {
          dispatch(wsConnectionError(event));
        };

        socket.onclose = (event) => {
          dispatch(wsConnectionClose(event));
        };

        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.success) {
            dispatch(wsGetMessage(message));
          } else {
            throw new Error(`Unable to aquire messages from web socket: ${message.message}`);
          }
        };

        socket.send = (event) => {
          dispatch(wsSendMessage(event));
        };

        if (type === WebSocketActionType.WS_CONNECTION_CLOSE && socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      }

      next(action);
    };
  };
};

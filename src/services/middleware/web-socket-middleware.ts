import { Dispatch } from 'redux';
import { WebSocketActionType } from '../../constants/web-socket';
import { WEB_SOCKET_ACTIONS } from '../../utils/constants';

export const socketMiddleware = (url: string, actions: typeof WEB_SOCKET_ACTIONS) => {
  return (store: { dispatch: Dispatch }) => {
    let socket: WebSocket | undefined = undefined;

    return (next: any) => (action: { type: WebSocketActionType; path: string; token?: string }) => {
      const { dispatch } = store;
      const { type, path, token } = action;
      const { wsInit, wsClose, onOpen, onError, onClose, onMessage, onSend } = actions;

      if (type === wsInit) {
        const address = url + (path ?? '') + (token ? '?token=' + token : '');
        socket = new WebSocket(address);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        socket.onmessage = (event) => {
          const result = JSON.parse(event.data);
          if (result.success) {
            dispatch({ type: onMessage, payload: result });
          } else {
            throw new Error(`Unable to aquire messages from web socket: ${result.message}`);
          }
        };

        socket.send = (event) => {
          dispatch({ type: onSend, payload: event });
        };

        if (type === wsClose && socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      }

      next(action);
    };
  };
};

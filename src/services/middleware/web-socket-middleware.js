export const socketMiddleware = (url, actions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, wsClose, onOpen, onError, onMessage } = actions;
      const { user } = getState().user;

      if (type === wsInit) {
        const path =
          url + (action.payload?.path ?? '') + (action.payload?.token ? '?token=' + action.payload.token : '');
        socket = new WebSocket(path);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const result = JSON.parse(event.data);
          if (result.success) {
            dispatch({ type: onMessage, payload: result });
          } else {
            throw new Error(`Unable to aquire messages from web socket!`);
          }
        };

        if (type === wsClose && socket.readyState === WebSocket.OPEN) {
          socket.close();
        }

        if (type === wsSendMessage) {
          const message = payload;
          message.token = user.token;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};

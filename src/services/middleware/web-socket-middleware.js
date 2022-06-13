export const socketMiddleware = (url, actions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = actions;
      const { user } = getState().user;

      if (type === wsInit) {
        socket = new WebSocket(url);
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

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

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

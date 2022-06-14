export const socketMiddleware = (url, actions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onError, onClose, onMessage, onSend } = actions;

      if (type === wsInit) {
        const path = url + (payload?.path ?? '') + (payload?.token ? '?token=' + payload.token : '');
        socket = new WebSocket(path);
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
            throw new Error(`Unable to aquire messages from web socket!`);
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

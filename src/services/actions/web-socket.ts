import { WsMessage } from '../../models/WsMessage';
import { WebSocketActionType } from '../constants/web-socket';

export interface IWsConnectionStartAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_START;
  readonly path: string;
  readonly token: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_ERROR;
}

export interface IWsConnectionCloseAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_CLOSE;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof WebSocketActionType.WS_GET_MESSAGE;
  readonly message: WsMessage;
}

export interface ISendMessageAction {
  readonly type: typeof WebSocketActionType.WS_SEND_MESSAGE;
  readonly message: unknown;
}

export const wsConnectionStart = (path: string, token: string): IWsConnectionStartAction => ({
  type: WebSocketActionType.WS_CONNECTION_START,
  path,
  token,
});

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => ({
  type: WebSocketActionType.WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (): IWsConnectionErrorAction => ({
  type: WebSocketActionType.WS_CONNECTION_ERROR,
});

export const wsConnectionClose = (): IWsConnectionCloseAction => ({
  type: WebSocketActionType.WS_CONNECTION_CLOSE,
});

export const wsConnectionClosed = (): IWsConnectionClosedAction => ({
  type: WebSocketActionType.WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (message: WsMessage): IWsGetMessageAction => ({
  type: WebSocketActionType.WS_GET_MESSAGE,
  message,
});

//TODO: Убрать все unknown
export const wsSendMessage = (message: unknown): ISendMessageAction => ({
  type: WebSocketActionType.WS_SEND_MESSAGE,
  message,
});

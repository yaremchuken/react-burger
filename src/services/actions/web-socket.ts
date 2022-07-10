import { WsMessage } from '../../models/WsMessage';
import { WebSocketActionType } from '../../constants/web-socket';

export interface IWsConnectionStartAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_START;
  readonly path: string;
  readonly token?: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_SUCCESS;
  readonly event: Event;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_ERROR;
  readonly event: Event;
}

export interface IWsConnectionCloseAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_CLOSE;
  readonly event?: Event;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WebSocketActionType.WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof WebSocketActionType.WS_GET_MESSAGE;
  readonly payload: WsMessage;
}

export interface ISendMessageAction {
  readonly type: typeof WebSocketActionType.WS_SEND_MESSAGE;
  readonly payload: any;
}

export type TWebSocketActions =
  | IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionCloseAction
  | IWsConnectionClosedAction
  | IWsGetMessageAction
  | ISendMessageAction;

export const wsConnectionStart = (path: string, token?: string): IWsConnectionStartAction => ({
  type: WebSocketActionType.WS_CONNECTION_START,
  path,
  token,
});

export const wsConnectionSuccess = (event: Event): IWsConnectionSuccessAction => ({
  type: WebSocketActionType.WS_CONNECTION_SUCCESS,
  event,
});

export const wsConnectionError = (event: Event): IWsConnectionErrorAction => ({
  type: WebSocketActionType.WS_CONNECTION_ERROR,
  event,
});

export const wsConnectionClose = (event?: Event): IWsConnectionCloseAction => ({
  type: WebSocketActionType.WS_CONNECTION_CLOSE,
  event,
});

export const wsConnectionClosed = (): IWsConnectionClosedAction => ({
  type: WebSocketActionType.WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (payload: WsMessage): IWsGetMessageAction => ({
  type: WebSocketActionType.WS_GET_MESSAGE,
  payload,
});

export const wsSendMessage = (payload: any): ISendMessageAction => ({
  type: WebSocketActionType.WS_SEND_MESSAGE,
  payload,
});

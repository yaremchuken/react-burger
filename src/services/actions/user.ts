import { UserActionType } from '../../constants/user';
import { User } from '../../models/User';

export interface IRegisterUserRequestAction {
  readonly type: typeof UserActionType.REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof UserActionType.REGISTER_USER_SUCCESS;
  readonly user: User;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof UserActionType.REGISTER_USER_FAILED;
}

export interface ILoginUserRequestAction {
  readonly type: typeof UserActionType.LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof UserActionType.LOGIN_USER_SUCCESS;
  readonly user: User;
}

export interface ILoginUserFailedAction {
  readonly type: typeof UserActionType.LOGIN_USER_FAILED;
}

export interface ILogoutUserRequestAction {
  readonly type: typeof UserActionType.LOGOUT_USER_REQUEST;
}

export interface ILogoutUserSuccessAction {
  readonly type: typeof UserActionType.LOGOUT_USER_SUCCESS;
}

export interface ILogoutUserFailedAction {
  readonly type: typeof UserActionType.LOGOUT_USER_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof UserActionType.GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof UserActionType.GET_USER_SUCCESS;
  readonly user: User;
}

export interface IGetUserFailedAction {
  readonly type: typeof UserActionType.GET_USER_FAILED;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UserActionType.UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UserActionType.UPDATE_USER_SUCCESS;
  readonly user: User;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UserActionType.UPDATE_USER_FAILED;
}

export interface IPasswordResetRequestedAction {
  readonly type: typeof UserActionType.PASSWORD_RESET_REQUESTED;
}

export type TUserActions =
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | ILogoutUserRequestAction
  | ILogoutUserSuccessAction
  | ILogoutUserFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | IPasswordResetRequestedAction;

export const registerUserRequest = (): IRegisterUserRequestAction => ({
  type: UserActionType.REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (user: User): IRegisterUserSuccessAction => ({
  type: UserActionType.REGISTER_USER_SUCCESS,
  user,
});

export const registerUserFailed = (): IRegisterUserFailedAction => ({
  type: UserActionType.REGISTER_USER_FAILED,
});

export const loginUserRequest = (): ILoginUserRequestAction => ({
  type: UserActionType.LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (user: User): ILoginUserSuccessAction => ({
  type: UserActionType.LOGIN_USER_SUCCESS,
  user,
});

export const loginUserFailed = (): ILoginUserFailedAction => ({
  type: UserActionType.LOGIN_USER_FAILED,
});

export const logoutUserRequest = (): ILogoutUserRequestAction => ({
  type: UserActionType.LOGOUT_USER_REQUEST,
});

export const logoutUserSuccess = (): ILogoutUserSuccessAction => ({
  type: UserActionType.LOGOUT_USER_SUCCESS,
});

export const logoutUserFailed = (): ILogoutUserFailedAction => ({
  type: UserActionType.LOGOUT_USER_FAILED,
});

export const getUserRequest = (): IGetUserRequestAction => ({
  type: UserActionType.GET_USER_REQUEST,
});

export const getUserSuccess = (user: User): IGetUserSuccessAction => ({
  type: UserActionType.GET_USER_SUCCESS,
  user,
});

export const getUserFailed = (): IGetUserFailedAction => ({
  type: UserActionType.GET_USER_FAILED,
});

export const updateUserRequest = (): IUpdateUserRequestAction => ({
  type: UserActionType.UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (user: User): IUpdateUserSuccessAction => ({
  type: UserActionType.UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFailed = (): IUpdateUserFailedAction => ({
  type: UserActionType.UPDATE_USER_FAILED,
});

export const passwordResetRequested = (): IPasswordResetRequestedAction => ({
  type: UserActionType.PASSWORD_RESET_REQUESTED,
});

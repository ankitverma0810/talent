import { ActionTypes } from "../action-types";

export interface AuthUserAction {
	type: ActionTypes.AUTH_USER;
	payload: {
		username: string;
		password: string;
	};
}

export interface AuthStartAction {
	type: ActionTypes.AUTH_START;
}

export interface AuthSuccessAction {
	type: ActionTypes.AUTH_SUCCESS;
	payload: {
		token: string;
		user: any;
	};
}

export interface AuthFailAction {
	type: ActionTypes.AUTH_FAIL;
	payload: string;
}

export interface AuthInitiateLogoutAction {
	type: ActionTypes.AUTH_INITIATE_LOGOUT;
}

export interface AuthLogoutAction {
	type: ActionTypes.AUTH_LOGOUT;
}

export interface AuthCheckStateAction {
	type: ActionTypes.AUTH_CHECK_STATE;
}

export type AuthActions =
	| AuthStartAction
	| AuthSuccessAction
	| AuthFailAction
	| AuthInitiateLogoutAction
	| AuthLogoutAction
	| AuthCheckStateAction
	| AuthUserAction;

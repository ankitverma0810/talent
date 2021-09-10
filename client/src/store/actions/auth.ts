import { ActionTypes } from "../action-types";

export interface SignInAction {
	type: ActionTypes.SIGN_IN;
	payload: {
		username: string;
		password: string;
	};
}

export interface SignUpAction {
	type: ActionTypes.SIGN_UP;
	payload: {
		firstname: string;
		lastname: string;
		username: string;
		password: string;
	};
}

export interface AuthStartAction {
	type: ActionTypes.AUTH_START;
}

export interface AuthSuccessAction {
	type: ActionTypes.AUTH_SUCCESS;
	payload: any;
}

export interface AuthFailAction {
	type: ActionTypes.AUTH_FAIL;
	payload: { message: string }[];
}

export interface AuthLogoutAction {
	type: ActionTypes.AUTH_LOGOUT;
}

export type AuthActions =
	| AuthStartAction
	| AuthSuccessAction
	| AuthFailAction
	| AuthLogoutAction
	| SignInAction
	| SignUpAction;

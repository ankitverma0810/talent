import { ActionTypes } from "../action-types";
import {
	AuthStartAction,
	AuthSuccessAction,
	AuthFailAction,
	AuthInitiateLogoutAction,
	AuthLogoutAction,
	AuthCheckStateAction,
} from "../actions/auth";

export const authStart = (): AuthStartAction => {
	return {
		type: ActionTypes.AUTH_START,
	};
};

export const authSuccess = (token: string, user: any): AuthSuccessAction => {
	return {
		type: ActionTypes.AUTH_SUCCESS,
		payload: {
			token,
			user,
		},
	};
};

export const authFail = (error: string): AuthFailAction => {
	return {
		type: ActionTypes.AUTH_FAIL,
		payload: error,
	};
};

export const logout = (): AuthInitiateLogoutAction => {
	return {
		type: ActionTypes.AUTH_INITIATE_LOGOUT,
	};
};

export const logoutSucceed = (): AuthLogoutAction => {
	return {
		type: ActionTypes.AUTH_LOGOUT,
	};
};

export const authCheckState = (): AuthCheckStateAction => {
	return {
		type: ActionTypes.AUTH_CHECK_STATE,
	};
};

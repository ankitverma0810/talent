import { Dispatch } from "redux";

import axios from "../../api/axios";
import { ActionTypes } from "../action-types";
import {
	AuthStartAction,
	AuthSuccessAction,
	AuthFailAction,
	AuthLogoutAction,
	AuthActions,
} from "../actions/auth";

export const signIn = (email: string, password: string) => {
	return async (dispatch: Dispatch<AuthActions>) => {
		dispatch({
			type: ActionTypes.AUTH_START,
		});
		try {
			const { data } = await axios.post("/employees/signin", {
				email,
				password,
			});
			sessionStorage.setItem("user", JSON.stringify(data));
			dispatch({
				type: ActionTypes.AUTH_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: ActionTypes.AUTH_FAIL,
				payload: error.response.data.errors,
			});
		}
	};
};

export const signUp = (
	firstname: string,
	lastname: string,
	email: string,
	password: string
) => {
	return async (dispatch: Dispatch<AuthActions>) => {
		dispatch({
			type: ActionTypes.AUTH_START,
		});
		try {
			const { data } = await axios.post("/employees/signup", {
				firstname,
				lastname,
				email,
				password,
			});
			sessionStorage.setItem("user", JSON.stringify(data));
			dispatch({
				type: ActionTypes.AUTH_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: ActionTypes.AUTH_FAIL,
				payload: error.response.data.errors,
			});
		}
	};
};

export const authCheckState = () => {
	return (dispatch: Dispatch<AuthActions>) => {
		const user = sessionStorage.getItem("user");
		if (user !== null) {
			dispatch({
				type: ActionTypes.AUTH_SUCCESS,
				payload: JSON.parse(user),
			});
		} else {
			dispatch({
				type: ActionTypes.AUTH_LOGOUT,
			});
		}
	};
};

export const authStart = (): AuthStartAction => {
	return {
		type: ActionTypes.AUTH_START,
	};
};

export const authSuccess = (user: any): AuthSuccessAction => {
	return {
		type: ActionTypes.AUTH_SUCCESS,
		payload: user,
	};
};

export const authFail = (error: { message: string }[]): AuthFailAction => {
	return {
		type: ActionTypes.AUTH_FAIL,
		payload: error,
	};
};

export const logout = () => {
	return (dispatch: Dispatch<AuthActions>) => {
		sessionStorage.clear();
		dispatch({
			type: ActionTypes.AUTH_LOGOUT,
		});
	};
};

export const logoutSucceed = (): AuthLogoutAction => {
	return {
		type: ActionTypes.AUTH_LOGOUT,
	};
};

import { ActionTypes } from "../action-types";
import { AuthActions } from '../actions/auth';

interface AuthState {
	user: any | null;
	token: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
	loading: false,
	error: null,
};

const reducer = (state: AuthState = initialState, action: AuthActions) => {
	switch (action.type) {
		case ActionTypes.AUTH_START:
			return {
				...state,
				error: null,
				loading: true,
			};
		case ActionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
				error: null,
				loading: false,
			};
		case ActionTypes.AUTH_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case ActionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				user: null,
			};
		default:
			return state;
	}
};

export default reducer;

import { ActionTypes } from "../action-types";
import { AuthActions } from "../actions/auth";

interface AuthState {
	user: any | null;
	loading: boolean;
	error: { message: string; field?: string }[] | null;
}

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
};

const reducer = (
	state: AuthState = initialState,
	action: AuthActions
): AuthState => {
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
				user: action.payload,
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
				user: null,
			};
		default:
			return state;
	}
};

export default reducer;

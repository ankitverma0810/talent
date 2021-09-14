import { ActionTypes } from "../action-types";
import { PerformanceActions } from "../actions/performance";

interface PerformanceState {
	data: any[];
	loading: boolean;
	error: { message: string; field?: string }[] | null;
	submitted: boolean;
}

const initialState: PerformanceState = {
	data: [],
	loading: false,
	error: null,
	submitted: false,
};

const reducer = (
	state: PerformanceState = initialState,
	action: PerformanceActions
): PerformanceState => {
	switch (action.type) {
		case ActionTypes.PERFORMANCE_START:
			return {
				...state,
				error: null,
				loading: true,
				submitted: false,
			};
		case ActionTypes.CREATE_PERFORMANCE_SUCCESS:
			return {
				...state,
				data: [{ ...action.payload }],
				error: null,
				loading: false,
				submitted: true,
			};
		case ActionTypes.PERFORMANCE_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false,
				submitted: false,
			};
		default:
			return state;
	}
};

export default reducer;

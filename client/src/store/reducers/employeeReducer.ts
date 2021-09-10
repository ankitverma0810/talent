import { ActionTypes } from "../action-types";
import { EmployeeActions, Employee } from "../actions/employee";

interface EmployeeState {
	data: Employee[];
	loading: boolean;
	error: { message: string; field?: string }[] | null;
	submitted: boolean;
}

const initialState: EmployeeState = {
	data: [],
	loading: false,
	error: null,
	submitted: false,
};

const reducer = (
	state: EmployeeState = initialState,
	action: EmployeeActions
): EmployeeState => {
	switch (action.type) {
		case ActionTypes.EMPLOYEE_START:
			return {
				...state,
				error: null,
				loading: true,
				submitted: false,
			};
		case ActionTypes.CREATE_EMPLOYEE_SUCCESS:
			return {
				...state,
				data: [{ ...action.payload }],
				error: null,
				loading: false,
				submitted: true,
			};
		case ActionTypes.UPDATE_EMPLOYEE_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				submitted: true,
			};
		case ActionTypes.FETCH_EMPLOYEE_SUCCESS:
			return {
				...state,
				data: [{ ...action.payload }],
				loading: false,
			};
		case ActionTypes.FETCH_EMPLOYEES_SUCCESS:
			return {
				...state,
				data: [...action.payload],
				loading: false,
			};
		case ActionTypes.EMPLOYEE_FAIL:
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

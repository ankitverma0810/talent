import { Dispatch } from "redux";

import axios from "../../api/axios";
import { ActionTypes } from "../action-types";
import {
	EmployeeStartAction,
	CreateEmployeeSuccessAction,
	EmployeeFailAction,
	EmployeeActions,
	Employee,
} from "../actions/employee";

export const createEmployee = (employee: Employee) => {
	return async (dispatch: Dispatch<EmployeeActions>) => {
		dispatch({
			type: ActionTypes.EMPLOYEE_START,
		});
		try {
			const { data } = await axios.post("/employees", employee);
			dispatch({
				type: ActionTypes.CREATE_EMPLOYEE_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			dispatch({
				type: ActionTypes.EMPLOYEE_FAIL,
				payload: error.response.data.errors,
			});
		}
	};
};

export const updateEmployee = (employee: Employee) => {
	return async (dispatch: Dispatch<EmployeeActions>) => {
		dispatch({
			type: ActionTypes.EMPLOYEE_START,
		});
		try {
			const { data } = await axios.put(`/employees/${employee.id}`, employee);
			dispatch({
				type: ActionTypes.UPDATE_EMPLOYEE_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			dispatch({
				type: ActionTypes.EMPLOYEE_FAIL,
				payload: error.response.data.errors,
			});
		}
	};
};

export const fetchEmployees = () => {
	return async (dispatch: Dispatch<EmployeeActions>) => {
		dispatch({
			type: ActionTypes.EMPLOYEE_START,
		});
		try {
			const { data } = await axios.get("/employees");
			dispatch({
				type: ActionTypes.FETCH_EMPLOYEES_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			dispatch({
				type: ActionTypes.EMPLOYEE_FAIL,
				payload: error.response.data.errors,
			});
		}
	};
};

export const fetchEmployee = (id: string) => {
	return async (dispatch: Dispatch<EmployeeActions>) => {
		dispatch({
			type: ActionTypes.EMPLOYEE_START,
		});
		try {
			const { data } = await axios.get(`/employees/${id}`);
			dispatch({
				type: ActionTypes.FETCH_EMPLOYEE_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			dispatch({
				type: ActionTypes.EMPLOYEE_FAIL,
				payload: error.response.data.errors,
			});
		}
	};
};

export const employeeStart = (): EmployeeStartAction => {
	return {
		type: ActionTypes.EMPLOYEE_START,
	};
};

export const CreateemployeeSuccess = (
	user: any
): CreateEmployeeSuccessAction => {
	return {
		type: ActionTypes.CREATE_EMPLOYEE_SUCCESS,
		payload: user,
	};
};

export const CreateemployeeFail = (
	error: { message: string }[]
): EmployeeFailAction => {
	return {
		type: ActionTypes.EMPLOYEE_FAIL,
		payload: error,
	};
};

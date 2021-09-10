import { ActionTypes } from "../action-types";

export interface Employee {
	id: string;
	firstname: string;
	lastname: string;
	role: string;
	designation: string;
	email: string;
	reportsTo: {};
}

export interface EmployeeStartAction {
	type: ActionTypes.EMPLOYEE_START;
}

export interface EmployeeFailAction {
	type: ActionTypes.EMPLOYEE_FAIL;
	payload: { message: string }[];
}

export interface CreateEmployeeSuccessAction {
	type: ActionTypes.CREATE_EMPLOYEE_SUCCESS;
	payload: Employee;
}

export interface UpdateEmployeeSuccessAction {
	type: ActionTypes.UPDATE_EMPLOYEE_SUCCESS;
	payload: Employee;
}

export interface FetchEmployeeSuccessAction {
	type: ActionTypes.FETCH_EMPLOYEE_SUCCESS;
	payload: Employee;
}

export interface FetchEmployeesSuccessAction {
	type: ActionTypes.FETCH_EMPLOYEES_SUCCESS;
	payload: Employee[];
}

export type EmployeeActions =
	| EmployeeStartAction
	| EmployeeFailAction
	| CreateEmployeeSuccessAction
	| FetchEmployeeSuccessAction
	| FetchEmployeesSuccessAction
	| UpdateEmployeeSuccessAction;

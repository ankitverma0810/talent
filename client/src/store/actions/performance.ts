import { ActionTypes } from "../action-types";

export interface PerformanceStartAction {
	type: ActionTypes.PERFORMANCE_START;
}

export interface PerformanceFailAction {
	type: ActionTypes.PERFORMANCE_FAIL;
	payload: { message: string }[];
}

export interface CreatePerformanceSuccessAction {
	type: ActionTypes.CREATE_PERFORMANCE_SUCCESS;
	payload: any;
}

export type PerformanceActions =
	| PerformanceStartAction
	| PerformanceFailAction
	| CreatePerformanceSuccessAction;
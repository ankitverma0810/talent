import { Dispatch } from "redux";

import axios from "../../api/axios";
import { ActionTypes } from "../action-types";
import { PerformanceActions } from "../actions/performance";

export const createPerformance = (
	employeeId: string,
	performance: {
		feedback: string;
		rating: string;
	}
) => {
	return async (dispatch: Dispatch<PerformanceActions>) => {
		dispatch({
			type: ActionTypes.PERFORMANCE_START,
		});
		try {
			const { data } = await axios.post(
				`/performances/${employeeId}`,
				performance
			);
			dispatch({
				type: ActionTypes.CREATE_PERFORMANCE_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			dispatch({
				type: ActionTypes.PERFORMANCE_FAIL,
				payload: error.response.data.errors,
			});
		}
	};
};

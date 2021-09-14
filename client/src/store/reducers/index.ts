import { combineReducers } from 'redux';

import authReducer from './authReducer';
import employeeReducer from './employeeReducer';
import performanceReducer from './performanceReducer';

const reducers = combineReducers({
    auth: authReducer,
    employees: employeeReducer,
    performaces: performanceReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
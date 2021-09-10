import { combineReducers } from 'redux';

import authReducer from './authReducer';
import employeeReducer from './employeeReducer';

const reducers = combineReducers({
    auth: authReducer,
    employees: employeeReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const initialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
	const devToolsExtension =
		((window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
			(window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
		compose;
	if (typeof devToolsExtension === "function") {
		enhancers.push(devToolsExtension);
	}
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(reducers, initialState, composedEnhancers);

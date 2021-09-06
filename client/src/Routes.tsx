import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Signin from "./containers/Auth/Signin/Signin";
import Signout from './containers/Auth/Signout/Signout';
import Signup from './containers/Auth/Signup/Signup';

interface RouteProps {
	isAuthenticated: boolean;
}

const EmployeeList = React.lazy(() => import('./containers/Employees/list'));

const Routes: React.FC<RouteProps> = ({ isAuthenticated }) => {
	let routes = (
		<Switch>
			<Route path="/Signin" component={Signin} />
			<Route path="/Signup" component={Signup} />
			<Route exact path="/" component={Signin} />
			<Route component={Signin} />
		</Switch>
	);

	if (isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/employees" render={props => <EmployeeList />} />
				<Route path="/signout" component={Signout} />
				<Redirect from="/" to="/employees" />
			</Switch>
		);
	}

	return <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>;
};

export default Routes;

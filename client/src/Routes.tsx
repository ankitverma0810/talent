import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Signin from "./containers/Auth/Signin";
import Signout from "./containers/Auth/Signout";
import Signup from "./containers/Auth/Signup";
import { RoleType } from "./config";

interface RouteProps {
	isAuthenticated: boolean;
	userRole: RoleType;
}

const EmployeeList = React.lazy(() => import("./containers/Employees/list"));
const EmployeeCreate = React.lazy(
	() => import("./containers/Employees/create")
);
const EmployeeUpdate = React.lazy(
	() => import("./containers/Employees/update")
);

const Routes: React.FC<RouteProps> = ({ isAuthenticated, userRole }) => {
	let routes = (
		<Switch>
			<Route path="/signin" component={Signin} />
			<Route path="/signup" component={Signup} />
			<Route exact path="/" component={Signin} />
		</Switch>
	);

	console.log(userRole);

	if (isAuthenticated) {
		routes = (
			<Switch>
				<Route
					exact
					path="/employees"
					render={(props) => <EmployeeList {...props} />}
				/>
				{userRole === RoleType.Admin ? (
						<Route
							path="/employees/create"
							render={(props) => <EmployeeCreate {...props} />}
						/>
				) : null}
				{userRole === RoleType.Admin ? (
					
						<Route
							path="/employees/:id"
							render={(props) => <EmployeeUpdate {...props} />}
						/>
				) : null}
				<Route path="/signout" component={Signout} />
				<Redirect from="/" to="/employees" />
			</Switch>
		);
	}

	return <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>;
};

export default Routes;

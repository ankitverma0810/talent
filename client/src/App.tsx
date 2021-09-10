import { useEffect } from "react";

import Layout from "./hoc/Layout/Layout";
import Routes from "./Routes";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useActions } from "./hooks/useActions";
import useGlobalStyles from "./theme/global-classes";
import { RoleType } from "./config";

const App: React.FC = () => {
	useGlobalStyles();
	const { user } = useTypedSelector((state) => state.auth);
	const { authCheckState } = useActions();
	const isAuthenticated = user !== null;

	useEffect(() => {
		authCheckState();
	}, []);

	return (
		<Layout isAuthenticated={isAuthenticated}>
			<Routes isAuthenticated={isAuthenticated} userRole={user && user.role} />
		</Layout>
	);
};

export default App;

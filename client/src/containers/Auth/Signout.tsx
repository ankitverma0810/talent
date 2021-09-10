import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useActions } from "../../hooks/useActions";

const Signout: React.FC = () => {
	const { logout } = useActions();

	useEffect(() => {
		logout();
	}, [logout]);

	return <Redirect to="/" />;
}

export default Signout;
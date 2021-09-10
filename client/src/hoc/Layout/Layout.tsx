import React from "react";

import Header from "../../components/Header/header";

interface LayoutProps {
	isAuthenticated: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated, children }) => {
	return (
		<div>
			{isAuthenticated ? <Header isAuthenticated={isAuthenticated} /> : null}
			{children}
		</div>
	);
};

export default Layout;

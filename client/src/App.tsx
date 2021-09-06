import Layout from "./hoc/Layout/Layout";
import Routes from "./Routes";

const App: React.FC = () => {
	return (
		<Layout>
			<Routes isAuthenticated={false} />
		</Layout>
	);
};

export default App;

import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
	return (
		<div className="max-w-7xl mx-auto">
			<Navbar />

			<div className="min-h-screen px-4">
				<Outlet />
			</div>

			<Footer />
		</div>
	);
};

export default App;

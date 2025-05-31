import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";

const App = () => {
  return (
    <div className="max-w-7xl mx-auto font-roboto">
      <Navbar />

      <div className="min-h-screen px-4">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default App;

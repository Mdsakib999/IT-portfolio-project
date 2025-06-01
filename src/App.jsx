import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import ScrollToTop from "./Utils/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App = () => {
  return (
    <div className="max-w-7xl mx-auto font-serif">
      <Navbar />
      <ScrollToTop />
      <div className="min-h-screen px-4">
        <Outlet />
      </div>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default App;

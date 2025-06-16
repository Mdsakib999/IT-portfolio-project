import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import ScrollToTop from "./Utils/ScrollToTop";
import ScrollToTopButton from "./Utils/ScrollToTopButton";

const App = () => {
  return (
    <div className="">
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

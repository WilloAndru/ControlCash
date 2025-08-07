import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PlanCost from "./pages/PlanCost/PlanCost";
import Configuration from "./pages/Configuration/Configuration";
import Profile from "./pages/Profle/Profile";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth";
  const isModalRoute =
    location.pathname === "/profile" || location.pathname === "/configuration";

  return (
    <div className="appContainer">
      <div className={`appContent ${isModalRoute ? "blurred" : ""}`}>
        {!hideLayout && <Header />}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/planCost" element={<PlanCost />} />
        </Routes>
        {!hideLayout && <Footer />}
      </div>

      {isModalRoute && (
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/configuration" element={<Configuration />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

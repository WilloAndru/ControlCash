import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profle/Profile";
import PlanCost from "./pages/PlanCost/PlanCost";
import Configuration from "./pages/Configuration/Configuration";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth"; // ocultar header y footer en auth

  return (
    <div className="appContainer">
      <div className="appContent">
        {!hideLayout && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/planCost" element={<PlanCost />} />
          <Route path="/configuration" element={<Configuration />} />
        </Routes>
        {!hideLayout && <Footer />}
      </div>
    </div>
  );
}

export default App;

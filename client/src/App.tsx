import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PlanCost from "./pages/PlanCost/PlanCost";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth"; // ocultar header y footer en auth

  return (
    <div className="app-container">
      <div className="app-content">
        {!hideLayout && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/viewPlans" element={<PlanCost />} />
        </Routes>
        {!hideLayout && <Footer />}
      </div>
    </div>
  );
}

export default App;

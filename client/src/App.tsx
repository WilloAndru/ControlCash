import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import ViewPlans from "./pages/ViewPlans/ViewPlans";
import Calculator from "./pages/Calculator/Calculator";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth"; // ocultar header y footer en auth
  const isAuth = localStorage.getItem("userData");

  return (
    <div className="app-container">
      <div className="app-content">
        {!hideLayout && <Header />}
        <Routes>
          <Route path="/" element={!isAuth ? <Home /> : <Calculator />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/viewPlans" element={<ViewPlans />} />
        </Routes>
        {!hideLayout && <Footer />}
      </div>
    </div>
  );
}

export default App;

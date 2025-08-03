import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth"; // ✅ Ocultar en /auth

  return (
    <div className="appContainer">
      <div className="appContent">
        {!hideLayout && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/proyection" element={<Home />} />
          <Route path="/profile" element={<Home />} />
        </Routes>
        {!hideLayout && <Footer />}
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <section className="header">
      <Link to="/" className="brand">
        <img src="logo" alt="Logo" />
        <h4>ControlCash</h4>
      </Link>
    </section>
  );
}

export default Header;

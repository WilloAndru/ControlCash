import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <Link to="/" className="brand">
        <img src="logo" alt="Logo" />
        <h4>ControlCash</h4>
      </Link>
    </section>
  );
}

export default Footer;

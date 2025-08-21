import { Link } from "react-router-dom";
import "./Footer.css";
import Brand from "../Brand/Brand";

function Footer() {
  return (
    <footer className="footer">
      {/* Seccion del eslogan */}
      <section className="brand-section">
        <Brand />
        <p className="text-gray">Control your finances, build your home.</p>
      </section>
      {/* Seccion de Links */}
      <section className="link-section">
        <div>
          <p className="text-gray">APP</p>
          <Link to="/" className="option-link">
            Web
          </Link>
          <Link to="/" className="option-link">
            Explore
          </Link>
        </div>
        <div>
          <p className="text-gray">NEED A HELP?</p>
          <Link to="/" className="option-link">
            Contact us
          </Link>
          <Link to="/" className="option-link">
            Blog
          </Link>
        </div>
        <div>
          <p className="text-gray">COMMUNITY</p>
          <Link to="/" className="option-link">
            X
          </Link>
          <Link to="/" className="option-link">
            Linkedin
          </Link>
          <Link to="/" className="option-link">
            Instagram
          </Link>
        </div>
      </section>
    </footer>
  );
}

export default Footer;

import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* Seccion del eslogan */}
      <section className="brandSection">
        <div className="brand">
          <img src="icon.png" alt="Icon" />
          <h3>ControlCash</h3>
        </div>
        <p className="textGray">Control your finances, build your home.</p>
      </section>
      {/* Seccion de Links */}
      <section className="linkSection">
        <div>
          <p className="textGray">APP</p>
          <Link to="/" className="optionLink">
            Web
          </Link>
          <Link to="/" className="optionLink">
            Explore
          </Link>
        </div>
        <div>
          <p className="textGray">NEED A HELP?</p>
          <Link to="/" className="optionLink">
            Contact us
          </Link>
          <Link to="/" className="optionLink">
            Blog
          </Link>
        </div>
        <div>
          <p className="textGray">COMMUNITY</p>
          <Link to="/" className="optionLink">
            X
          </Link>
          <Link to="/" className="optionLink">
            Linkedin
          </Link>
          <Link to="/" className="optionLink">
            Instagram
          </Link>
        </div>
      </section>
    </footer>
  );
}

export default Footer;

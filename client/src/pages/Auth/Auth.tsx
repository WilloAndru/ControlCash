import { Link } from "react-router-dom";
import "./Auth.css";

function Auth() {
  return (
    <main>
      {/* Formulario Auth */}
      <section className="containerAuth">
        <Link to="/" className="brand">
          <img src="icon.png" alt="Icon" />
          <h3>ControlCash</h3>
        </Link>
        <div className="textDiv">
          <h1>Welcome</h1>
          <p className="textGray">
            Sign up or log in with your Google account.
          </p>
        </div>
      </section>
      {/* Imagen Derecha */}
      <img src="" alt="Image Auth" />
    </main>
  );
}

export default Auth;

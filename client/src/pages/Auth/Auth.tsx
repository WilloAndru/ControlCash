import { Link } from "react-router-dom";
import "./Auth.css";

function Auth() {
  return (
    <main className="auth">
      {/* Formulario Auth */}
      <section>
        {/* Link de marca */}
        <Link to="/" className="brand">
          <img src="icon.png" alt="Icon" />
          <h3>ControlCash</h3>
        </Link>

        {/* Div que va en el centro */}
        <div className="centerContainer">
          {/* Div de bienvenida */}
          <div>
            <h1>Welcome</h1>
            <p className="textGray">
              Sign up or log in with your Google account.
            </p>
          </div>
          {/* Boton de google */}
          <button>Google</button>
        </div>

        {/* Terminos */}
        <p className="textGray terms">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </section>
      {/* Imagen Derecha */}
      <img className="imgRight" src="imgHome1.jpg" alt="Image Auth" />
    </main>
  );
}

export default Auth;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "./Auth.css";

const baseURL = import.meta.env.VITE_API_URL;

function Auth() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //funcion de auth con google
  const authWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();

      const response = await axios.post(`${baseURL}/google`, { token });

      if (response.status === 200) {
        navigate("/");
      } else {
        setError("Authentication failed on the server.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.error ||
            "Authentication with the server failed."
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unexpected error occurred.");
      }
    }
  };

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
        <div className="centerDiv">
          {/* Error */}
          {error && <p className="errorMessage">{error}</p>}
          {/* Div de bienvenida */}
          <div>
            <h1>Welcome</h1>
            <p className="textGray">
              Sign up or log in with your Google account.
            </p>
          </div>
          {/* Boton de google */}
          <button onClick={authWithGoogle}>
            <FcGoogle className="iconGoogle" />
            Login with Google
          </button>
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

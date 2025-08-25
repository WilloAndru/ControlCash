import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import "./Auth.css";
import Brand from "../../components/Brand/Brand";
import { FirebaseError } from "firebase/app";

const URL = import.meta.env.VITE_API_URL;

function Auth() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Funcion de autenticacion
  const handleAuth = async (provider: string) => {
    try {
      // Autentica al usuario mediante una ventana emergente
      const result = await signInWithPopup(
        auth,
        provider === "google"
          ? googleProvider
          : provider === "facebook"
          ? facebookProvider
          : githubProvider
      );
      // Obtiene el token de autenticación del usuario
      const token = await result.user.getIdToken();
      // Envía el token al backend para validación e inicio de sesión
      const response = await axios.post(`${URL}/authProvider`, { token });
      // Guarda los datos de usuario en el localstorage y redirigue al home
      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        localStorage.setItem("planData", JSON.stringify(response.data.plan));
        navigate("/");
      } else {
        setError("Server authentication failed.");
      }
    } catch (err) {
      let message = "Unexpected error occurred.";

      if (err instanceof FirebaseError) {
        if (err.code === "auth/account-exists-with-different-credential") {
          const email = (err as any).customData?.email;
          const methods = await fetchSignInMethodsForEmail(auth, email);
          message = `This email is already associated with ${methods[0]}. Sign in using that method to link your account.`;
        } else {
          message = err.message;
        }
      } else if (axios.isAxiosError(err)) {
        message =
          err.response?.data?.error ?? "Server error during authentication.";
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    }
  };

  return (
    <main className="auth">
      {/* Formulario Auth */}
      <section>
        {/* Link de marca */}
        <Brand />

        {/* Div que va en el centro */}
        <div className="center-div">
          {/* Error */}
          {error && <p className="error-msg">{error}</p>}
          {/* Div de bienvenida */}
          <div>
            <h1>Welcome</h1>
            <p className="text-gray">
              Sign up or log in with your Google account.
            </p>
          </div>
          {/* Boton de google */}
          <button onClick={() => handleAuth("google")}>
            <FcGoogle className="icon-google" />
            Login with Google
          </button>
          {/* Boton de github */}
          <button onClick={() => handleAuth("github")}>
            <FaGithub className="icon-google" />
            Login with GitHub
          </button>
          {/* Boton de facebook */}
          <button onClick={() => handleAuth("facebook")}>
            <FaFacebook className="icon-google" />
            Login with Facebook
          </button>
        </div>

        {/* Terminos */}
        <p className="text-gray terms">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </section>
      {/* Imagen Derecha */}
      <img className="img-right" src="imgHome1.jpg" alt="Image Auth" />
    </main>
  );
}

export default Auth;

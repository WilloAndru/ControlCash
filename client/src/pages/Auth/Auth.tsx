import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "./Auth.css";
import Brand from "../../components/Brand/Brand";

const baseURL = import.meta.env.VITE_API_URL;

function Auth() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Funcion de autenticacion con google
  const authWithGoogle = async () => {
    try {
      // Autentica al usuario con Google mediante una ventana emergente
      const result = await signInWithPopup(auth, provider);
      // Obtiene el token de autenticación del usuario
      const token = await result.user.getIdToken();
      // Envía el token al backend para validación e inicio de sesión
      const response = await axios.post(`${baseURL}/google`, { token });
      // Guarda los datos de usuario en el localstorage y redirigue al home
      if (response.status === 200) {
        const userData = {
          uid: response.data.user.uid,
          name: response.data.user.name,
          email: response.data.user.email,
          avatar: response.data.user.avatar,
          planType: response.data.user.planType,
          planExpirationDate: response.data.user.planExpirationDate,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/");
      } else {
        setError("Server authentication failed.");
      }
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.error || "Server error during authentication."
        : err instanceof Error
        ? err.message
        : "Unexpected error occurred.";

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

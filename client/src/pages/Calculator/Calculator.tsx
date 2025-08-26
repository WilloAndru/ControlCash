import { useEffect, useState } from "react";
import "./Calculator.css";
import { useProfile } from "../../context/ProfileContext";
import axios from "axios";
import { SiOpenai } from "react-icons/si";

function Calculator() {
  const storedData = localStorage.getItem("userData");
  const userData = storedData ? JSON.parse(storedData) : {};
  const isCompleteData = userData.city && userData.country && userData.savings;
  const { setIsProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [resPromp, setResPromp] = useState("");

  const fetchData = async () => {
    try {
      // Inicia la carga
      setIsLoading(true);
      // Simulación de espera de 3s (como si fuera la API)
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error: any) {
      console.error("Error:", error);
      setIsLoading(false);
      setResPromp(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    isCompleteData ? fetchData() : setIsProfile(true);
  }, []);

  return (
    <main className="calculator">
      {isCompleteData ? (
        isLoading ? (
          // Interfaz de cargando
          <section className="calculator">
            <div className="loading-div">
              <SiOpenai className="icon" />
              <h1>Asking ChatGPT</h1>
            </div>
          </section>
        ) : (
          // Interfaz de calculadora
          <section className="calculator">
            <div className="calculator-div">
              <div className="top-div">
                <section className="container"></section>
                <section className="container"></section>
              </div>
              <section className="container"></section>
            </div>
          </section>
        )
      ) : (
        // Interfaz de aviso para datos incompletos
        <section className="calculator">
          <div className="havent-filled-div">
            <h1>
              You haven’t filled in your details yet:
              {!userData.city && " City,"}
              {!userData.country && " Country,"}
              {!userData.savings && " Savings"}
            </h1>
            <button
              className="style-btn-black"
              onClick={() => setIsProfile(true)}
            >
              Fill them in here
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default Calculator;

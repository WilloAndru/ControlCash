import { useEffect, useState } from "react";
import "./Calculator.css";
import { useProfile } from "../../context/ProfileContext";
import axios from "axios";
import { SiOpenai } from "react-icons/si";
import { FaRegFileExcel } from "react-icons/fa";

function Calculator() {
  const storedData = localStorage.getItem("userData");
  const userData = storedData ? JSON.parse(storedData) : {};
  const isCompleteData = userData.city && userData.country && userData.savings;
  const { setIsProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [resPromp, setResPromp] = useState("");
  const [costProperty, setCostProperty] = useState<number>(1800000000);

  const listStatistics = [
    {
      name: "Estimated acquisition time",
      description: "5 years and 6 months",
    },
    {
      name: "Estimated time in months",
      description: "66 months",
    },
    {
      name: "Acquisition date",
      description: "August 2028",
    },
  ];

  const formatCOP = (value: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);

  // Inicia la carga de la respuesta del promp a chatGPT
  const fetchData = async () => {
    try {
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
            <section className="container">
              <h1>Learning statistics</h1>
              <div className="cost-property-div">
                <h3>Cost of the property</h3>
                <input
                  type="text"
                  value={costProperty}
                  onChange={(e) => setCostProperty(Number(e.target.value))}
                />
              </div>
              <div className="list-statistics">
                {listStatistics.map((item, index) => {
                  return (
                    <div>
                      <h3 className="text-gray">{item.name}</h3>
                      <h3>{item.description}</h3>
                    </div>
                  );
                })}
              </div>
            </section>
            <section className="container table">
              <header>
                <h1>Table</h1>
                <button>
                  <FaRegFileExcel className="icon" /> Import
                </button>
              </header>
              <table></table>
            </section>
          </section>
        )
      ) : (
        // Interfaz de aviso para datos incompletos
        <section className="calculator">
          <div className="havent-filled-div">
            <h1>
              You haven’t filled in your details yet:
              {!userData.city && " City"}
              {!userData.country && " Country"}
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

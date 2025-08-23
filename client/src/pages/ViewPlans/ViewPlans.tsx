import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewPlans.css";
import { FaVial } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";

const URL = import.meta.env.VITE_API_URL;

function ViewPlans() {
  const [dataPlans, setDataPlans] = useState<any[]>([]);
  const storedUser = localStorage.getItem("userData");
  const userData = storedUser ? JSON.parse(storedUser) : null;

  // Lista de iconos para las caracteristicas
  const listIconsFeatures = [
    <FaVial className="icon" />,
    <FaRegFileExcel className="icon" />,
    <AiOutlineDollarCircle className="icon" />,
  ];

  // Obtiene los datos de los planes del servidor
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${URL}/getPlans`);
        if (response.status === 200) {
          setDataPlans(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlans();
  }, []);

  // Funcion que redirigue al pago
  const handleCheckout = async (paymentProviderId: string) => {
    try {
      const { data } = await axios.post(`${URL}/checkout`, {
        paymentProviderId,
      });

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <main className="plan-cost">
      <h1>Find the plan that fits your needs</h1>
      {/* Seccion de planes */}
      <section className="plans-section">
        {dataPlans.map((item, index) => {
          return (
            // Plan Individual
            <section key={index} className="plan">
              {/* Div con titulo y precio */}
              <section className="sup-section">
                <h2>{item.name}</h2>
                <div className="cost-div">
                  <h2>${item.price}</h2>
                  <p>
                    per {item.duration}{" "}
                    {item.duration === 1 ? "month" : "months"}
                  </p>
                </div>
                <button
                  className="style-btn-black"
                  disabled={index === 0 || userData.planId === index + 1}
                  onClick={() => handleCheckout(item.paymentProviderId)}
                >
                  {index === 0
                    ? "Default Plan"
                    : userData.planId === index + 1
                    ? "Your current plan"
                    : "Get Started"}
                </button>
              </section>
              {/* Div de caracteristicas */}
              <section className="features-section">
                <div className="sup-div">
                  <h3>FEATURES</h3>
                  <p>{item.description}</p>
                </div>
                <ul>
                  {JSON.parse(item.features).map((f: string, i: number) => (
                    <li key={i}>
                      {listIconsFeatures[i]}
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            </section>
          );
        })}
      </section>
    </main>
  );
}

export default ViewPlans;

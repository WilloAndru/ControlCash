import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewPlans.css";
import { FaVial } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL;

function ViewPlans() {
  const [dataPlans, setDataPlans] = useState<any[]>([]);
  const storedUser = localStorage.getItem("userData");
  let userData = storedUser ? JSON.parse(storedUser) : null;

  const navigate = useNavigate();

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
  const handleCheckout = async (payment_provider_id: number) => {
    try {
      const { data } = await axios.post(`${URL}/checkout`, {
        payment_provider_id,
      });

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Funcion para cambiar de plan, solo para test
  const handleChangePlan = async (userUid: string, plan_id: number) => {
    try {
      const response = await axios.patch(`${URL}/changePlan`, {
        userUid,
        plan_id,
      });
      if (response.status === 200) {
        userData.plan_id = plan_id;
        userData.update_plan_date = new Date();
        localStorage.setItem("userData", JSON.stringify(userData));
        const planData = {
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          duration: response.data.duration,
          payment_provider_id: response.data.payment_provider_id,
        };
        localStorage.setItem("planData", JSON.stringify(planData));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
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
                  disabled={index === 0 || userData?.plan_id === index + 1}
                  onClick={() => handleCheckout(item.payment_provider_id)}
                >
                  {index === 0
                    ? "Default Plan"
                    : userData?.plan_id === index + 1
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
                  {item.features.map((f: string, i: number) => (
                    <li key={i}>
                      {listIconsFeatures[i]}
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  disabled={userData?.plan_id === index + 1}
                  className="style-btn-black"
                  onClick={() => handleChangePlan(userData.uid, item.id)}
                >
                  Change to this Plan (Test)
                </button>
              </section>
            </section>
          );
        })}
      </section>
    </main>
  );
}

export default ViewPlans;

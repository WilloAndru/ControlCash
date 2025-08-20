import axios from "axios";
import { useState, useEffect } from "react";
import "./PlanCost.css";

const URL = import.meta.env.VITE_API_URL;

function PlanCost() {
  const [dataPlans, setDataPlans] = useState<any[]>([]);

  //Obtiene los datos de los planes del servidor
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
                  <p>per {item.duration} month</p>
                </div>
                <button>Get Started</button>
              </section>
              {/* Div de caracteristicas */}
              <section className="features-section">
                <div className="sup-div">
                  <h3>FEATURES</h3>
                  <p>Everything in our free plan plus</p>
                </div>
                <ul>
                  {JSON.parse(item.features).map((f: string, i: number) => (
                    <li key={i}>{f}</li>
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

export default PlanCost;

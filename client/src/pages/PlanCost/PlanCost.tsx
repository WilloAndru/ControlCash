import axios from "axios";
import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_API_URL;

function PlanCost() {
  const [dataPlans, setDataPlans] = useState<any[]>([]);

  //Obtiene los datos de los planes del servidor
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${URL}/getPlansData`);
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
    <main>
      <h1>Find the plan that fits your needs.</h1>
      {/* Seccion de planes */}
      <section className="plans-section">
        {dataPlans.map((item, index) => {
          return (
            // Plan Individual
            <section key={index} className="plan">
              {/* Div con titulo y precio */}
              <div className="sup-div">
                <h5>{item.title}</h5>
                <div className="cost-div">
                  <h1>${item.price}</h1>
                  <p className="textGray">per {item.duration}</p>
                </div>
                <button>Get Started</button>
              </div>
              {/* Div de caracteristicas */}
              <section className="features-section">
                <div className="sup-div">
                  <h5>FEATURES</h5>
                  <p className="textGray">Everything in our free plan plus</p>
                </div>
                <ul>
                  {item.features?.map((f: string, i: number) => (
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

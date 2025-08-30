import { useEffect, useState } from "react";
import "./Calculator.css";
import { useProfile } from "../../context/ProfileContext";
import axios from "axios";
import { SiOpenai } from "react-icons/si";
import { FaRegFileExcel } from "react-icons/fa";
import { PiBuildingApartment } from "react-icons/pi";
import { PiHouseLineBold } from "react-icons/pi";
import { PiWarehouse } from "react-icons/pi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { acquisitionTime } from "../../utils/acquisitionTime";

const URL = import.meta.env.VITE_API_URL;

type Prices = {
  apartment: number;
  house: number;
  luxury: number;
};

function Calculator() {
  const storedData = localStorage.getItem("userData");
  const userData = storedData ? JSON.parse(storedData) : {};
  const storedPlan = localStorage.getItem("planData");
  const planData = storedPlan ? JSON.parse(storedPlan) : {};
  const isCompleteData = userData.city && userData.country && userData.savings;
  const { setIsProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState<Prices>({
    apartment: 0,
    house: 0,
    luxury: 0,
  });
  const [price, setPrice] = useState(0);
  const [btnTarget, setBtnTarget] = useState(1);

  // Solicitud del promp de ChatGPT
  const handlePromp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${URL}/getPrices`, {
        country: userData.country,
        city: userData.city,
        savings: userData.savings,
      });
      if (response.status === 200) {
        setPrices(response.data);
        setPrice(response.data.apartment);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error:", error);
      setIsLoading(false);
      setPrices(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    isCompleteData ? handlePromp() : setIsProfile(true);
  }, []);

  return (
    <main className="calculator-main">
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
            {/* Opciones de propiedades */}
            <section className="top-section">
              <button
                style={{
                  backgroundColor:
                    btnTarget !== 1 ? "var(--color-bg-hover)" : undefined,
                }}
                className="style-btn-white"
                onClick={() => {
                  setPrice(prices.apartment);
                  setBtnTarget(1);
                }}
              >
                <PiBuildingApartment className="icon" />
                <h3>Apartment</h3>
              </button>
              <button
                style={{
                  backgroundColor:
                    btnTarget !== 2 ? "var(--color-bg-hover)" : undefined,
                }}
                disabled={planData.id === 1}
                className="style-btn-white"
                onClick={() => {
                  setPrice(prices.house);
                  setBtnTarget(2);
                }}
              >
                <PiHouseLineBold className="icon" />
                <h3>House</h3>
              </button>
              <button
                style={{
                  backgroundColor:
                    btnTarget !== 3 ? "var(--color-bg-hover)" : undefined,
                }}
                disabled={planData.id === 1}
                className="style-btn-white"
                onClick={() => {
                  setPrice(prices.luxury);
                  setBtnTarget(3);
                }}
              >
                <PiWarehouse className="icon" />
                <h3>Luxury House</h3>
              </button>
              <button
                style={{
                  backgroundColor:
                    btnTarget !== 4 ? "var(--color-bg-hover)" : undefined,
                }}
                disabled={planData.id === 1}
                className="style-btn-white"
                onClick={() => {
                  setPrice(0);
                  setBtnTarget(4);
                }}
              >
                <MdOutlineDashboardCustomize className="icon" />
                <h3>Customize</h3>
              </button>
            </section>
            <div className="bottom-div">
              {/* Seccion de estadisticas */}
              <section className="container">
                <h1>Learning statistics</h1>
                <p className="text-gray">
                  The following information is based on your data: City:{" "}
                  <strong>{userData.city}</strong>, Country:{" "}
                  <strong>{userData.country}</strong>, Savings:{" "}
                  <strong>{userData.savings}</strong> USD.
                </p>
                <button
                  className="style-btn-black"
                  onClick={() => setIsProfile(true)}
                >
                  Edit your datas here
                </button>
                <div className="list-statistics">
                  <div>
                    <h3 className="text-gray">Cost of the property</h3>
                    <h3>{new Intl.NumberFormat("en-US").format(price)} USD</h3>
                  </div>
                  <div>
                    <h3 className="text-gray">Estimated acquisition time</h3>
                    <h3>{acquisitionTime(1, userData.savings, price)}</h3>
                  </div>
                  <div>
                    <h3 className="text-gray">Estimated time in months</h3>
                    <h3>{acquisitionTime(2, userData.savings, price)}</h3>
                  </div>
                  <div>
                    <h3 className="text-gray">Acquisition date</h3>
                    <h3>{acquisitionTime(3, userData.savings, price)}</h3>
                  </div>
                </div>
              </section>
              {/* Tabla */}
              <section className="container table">
                <header>
                  <h1>Table</h1>
                  <button>
                    <FaRegFileExcel className="icon" /> Import
                  </button>
                </header>
                <table></table>
              </section>
            </div>
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

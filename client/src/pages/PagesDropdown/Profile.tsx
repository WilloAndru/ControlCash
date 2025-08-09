import { useState, useMemo } from "react";
import { forwardRef } from "react"; //soporte de ref en componentes hijos
import { IoClose } from "react-icons/io5";

interface ProfileProps {
  setIsShow: (value: boolean) => void;
}

const Profile = forwardRef<HTMLDivElement, ProfileProps>(
  ({ setIsShow }, ref) => {
    const stored = localStorage.getItem("userData");
    const userData = stored ? JSON.parse(stored) : {};

    // Estado inicial de datos para comparar con los modificados y comprobar si hay cambios
    const initialData = {
      country: userData.country || "",
      city: userData.city || "",
      income: userData.income || "",
    };

    const [country, setCountry] = useState(userData.country || "");
    const [city, setCity] = useState(userData.city || "");
    const [income, setIncome] = useState(userData.income || "");

    // Lista de inputs
    const listDatas = [
      {
        title: "Which country do you live in?",
        value: country,
        onChange: setCountry,
      },
      { title: "Which city do you live in?", value: city, onChange: setCity },
      {
        title: "What is your monthly income?",
        value: income,
        onChange: setIncome,
      },
    ];

    // Detectar cambios en los inputs
    const hasChanges = useMemo(() => {
      return (
        country !== initialData.country ||
        city !== initialData.city ||
        income !== initialData.income
      );
    }, [country, city, income]);

    // Envio del formulario
    const saveDatas = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Guardando datos:", { country, city, income });
    };

    return (
      <div className="pageDropdown">
        <section ref={ref}>
          <form className="container" onSubmit={saveDatas}>
            <button
              onClick={() => setIsShow(false)}
              className="closeBtn"
              type="button"
            >
              <IoClose />
            </button>
            {/* Header */}
            <header className="headerpageDropdown">
              <h2>Custom your profile</h2>
              <p>
                Edit your information to get more accurate estimates and costs.
              </p>
            </header>
            {/* Inputs */}
            <main>
              {listDatas.map((item, index) => (
                <div key={index}>
                  <h4>{item.title}</h4>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => item.onChange(e.target.value)}
                  />
                </div>
              ))}
            </main>
            {/* Parte de guardado del form */}
            <footer className="footerpageDropdown">
              <button
                onClick={() => setIsShow(false)}
                type="button"
                className="styleBtnWhite"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="styleBtnBlack"
                disabled={!hasChanges}
              >
                Save
              </button>
            </footer>
          </form>
        </section>
      </div>
    );
  }
);

export default Profile;

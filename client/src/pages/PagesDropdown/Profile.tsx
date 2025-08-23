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
      savings: userData.savings || "",
    };

    const [country, setCountry] = useState(userData.country || "");
    const [city, setCity] = useState(userData.city || "");
    const [savings, setSavings] = useState(userData.savings || "");

    // Lista de inputs
    const listDatas = [
      {
        title: "Which country do you live in?",
        value: country,
        onChange: setCountry,
      },
      { title: "Which city do you live in?", value: city, onChange: setCity },
      {
        title: "What are your monthly savings?",
        value: savings,
        onChange: setSavings,
      },
    ];

    // Detectar cambios en los inputs
    const hasChanges = useMemo(() => {
      return (
        country !== initialData.country ||
        city !== initialData.city ||
        savings !== initialData.savings
      );
    }, [country, city, savings]);

    // Envio del formulario
    const saveDatas = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Guardando datos:", { country, city, savings });
    };

    return (
      <div className="page-dropdown">
        <section ref={ref}>
          <form className="container" onSubmit={saveDatas}>
            <button
              onClick={() => setIsShow(false)}
              className="close-btn"
              type="button"
            >
              <IoClose />
            </button>
            {/* Header */}
            <header className="headerpage-dropdown">
              <h2>Custom your profile</h2>
              <p>
                Edit your information to get more accurate estimates and costs.
              </p>
            </header>
            {/* Inputs */}
            <main>
              {listDatas.map((item, index) => (
                <div key={index} className="options">
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
            <footer className="footerpage-dropdown">
              <button
                onClick={() => setIsShow(false)}
                type="button"
                className="style-btn-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="style-btn-black"
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

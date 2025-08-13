import { forwardRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Select from "../../components/Select/Select";

interface ConfigurationProps {
  setIsShow: (value: boolean) => void;
}

const Configuration = forwardRef<HTMLDivElement, ConfigurationProps>(
  ({ setIsShow }, ref) => {
    // Estado del color del tema
    const [darkMode, setDarkMode] = useState(
      localStorage.getItem("themeColor") === "Black"
    );

    // Cambia la clase del root para aplicar estilos
    useEffect(() => {
      const className = "dark";
      const element = document.documentElement;

      if (darkMode) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    }, [darkMode]);

    // Funcion que cambia el tema
    const handleThemeChange = (value: string) => {
      setDarkMode(value === "Black");
      localStorage.setItem("themeColor", value);
    };

    return (
      <div className="pageDropdown">
        <section ref={ref}>
          <div className="container">
            {/* Boton de cierre */}
            <button
              onClick={() => setIsShow(false)}
              className="closeBtn"
              type="button"
            >
              <IoClose />
            </button>

            {/* Header */}
            <h2>General configuration</h2>

            {/* Selects */}
            <main>
              <div className="options divSelect">
                <h4>Theme</h4>
                <Select
                  title={darkMode ? "Black" : "White"}
                  options={["White", "Black"]}
                  action={handleThemeChange}
                />
              </div>
            </main>
          </div>
        </section>
      </div>
    );
  }
);

export default Configuration;

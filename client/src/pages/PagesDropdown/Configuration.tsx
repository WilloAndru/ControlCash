import { useState } from "react";
import { forwardRef } from "react"; //soporte de ref en componentes hijos
import { IoClose } from "react-icons/io5";

interface ConfigurationProps {
  setIsShow: (value: boolean) => void;
}

const Configuration = forwardRef<HTMLDivElement, ConfigurationProps>(
  ({ setIsShow }, ref) => {
    const [themeColor, setThemeColor] = useState(
      localStorage.getItem("themeColor") || "White"
    );

    // Lista de opciones
    const listDatas = [
      {
        title: "Theme",
        value: themeColor,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
          setThemeColor(e.target.value);
          localStorage.setItem("themeColor", e.target.value);
          console.log(e.target.value);
        },
      },
    ];

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
            <header className="headerpageDropdown">
              <h2>General configuration</h2>
            </header>
            {/* Inputs */}
            <main>
              {listDatas.map((item, index) => (
                <div key={index}>
                  <h4>{item.title}</h4>
                  <select value={item.value} onChange={item.onChange}>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                  </select>
                </div>
              ))}
            </main>
          </div>
        </section>
      </div>
    );
  }
);

export default Configuration;

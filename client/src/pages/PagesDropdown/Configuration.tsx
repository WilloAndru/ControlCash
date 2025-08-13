import { forwardRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Select from "../../components/Select/Select";

interface ConfigurationProps {
  setIsShow: (value: boolean) => void;
}

const Configuration = forwardRef<HTMLDivElement, ConfigurationProps>(
  ({ setIsShow }, ref) => {
    const [darkMode, setDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem("themeColor");
      return savedTheme === "Black";
    });

    useEffect(() => {
      const className = "dark";
      const element = document.documentElement; // <html>

      if (darkMode) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    }, [darkMode]);

    const handleThemeChange = (value: string) => {
      setDarkMode(value === "Black");
      localStorage.setItem("themeColor", value);
    };

    return (
      <div className="pageDropdown">
        <section ref={ref}>
          <div className="container">
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

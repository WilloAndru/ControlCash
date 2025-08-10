import { useState, forwardRef } from "react";
import { IoClose } from "react-icons/io5";
import Select from "../../components/Select/Select";

interface ConfigurationProps {
  setIsShow: (value: boolean) => void;
}

const Configuration = forwardRef<HTMLDivElement, ConfigurationProps>(
  ({ setIsShow }, ref) => {
    const [themeColor, setThemeColor] = useState(
      localStorage.getItem("themeColor") || "white"
    );

    const handleChange = (newValue: string) => {
      setThemeColor(newValue);
      localStorage.setItem("themeColor", newValue);
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
              <div>
                <h4>Theme</h4>
                <Select
                  value={themeColor}
                  onChange={handleChange}
                  options={[
                    { value: "white", label: "White" },
                    { value: "black", label: "Black" },
                  ]}
                  placeholder="Chose a theme"
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

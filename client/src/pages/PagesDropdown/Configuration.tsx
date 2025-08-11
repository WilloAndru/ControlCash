import { forwardRef } from "react";
import { IoClose } from "react-icons/io5";
import Select from "../../components/Select/Select";

interface ConfigurationProps {
  setIsShow: (value: boolean) => void;
}

const Configuration = forwardRef<HTMLDivElement, ConfigurationProps>(
  ({ setIsShow }, ref) => {
    const themeColor = localStorage.getItem("themeColor") || "White";

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
              <div className="divSelect">
                <h4>Theme</h4>
                <Select
                  title={themeColor}
                  options={["White", "Black"]}
                  action={(value) => {
                    localStorage.setItem("themeColor", value);
                  }}
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

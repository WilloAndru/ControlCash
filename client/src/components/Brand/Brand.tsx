import { Link } from "react-router-dom";
import "./Brand.css";

function Brand() {
  const themeColor = localStorage.getItem("themeColor") || "White";
  return (
    <Link to="/" className="brand">
      <img
        src={themeColor === "White" ? "icon.png" : "iconWhite.png"}
        alt="Icon"
      />
      <h3>ControlCash</h3>
    </Link>
  );
}

export default Brand;

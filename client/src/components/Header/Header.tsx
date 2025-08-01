import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      
      {/* Seccion de marca */}
      <Link to="/" className="brand">
        <img src="icon.png" alt="Icon" />
        <h3>ControlCash</h3>
      </Link>

      {/* Seccion de opciones */}
      <section>
        <Link to="/proyection">Plan de vida</Link>
      </section>

      {/* Seccion de perfil */}
      <Link to="/profile" className="profile">

        {/* Contenedor con texto */}
        <div className="avatarText">
          <p>Nombre Usuario</p>
          <p className="paymentPlan">Tipo Plan</p>
        </div>

        {/* Avatar */}
        <div className="avatarImg">
          <img src="icon.png" alt="User Image" />
        </div>
      </Link>
    </header>
  );
}

export default Header;

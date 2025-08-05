import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const stored = localStorage.getItem("userData");
  const userData = stored ? JSON.parse(stored) : null;

  return (
    <header>
      {/* Seccion de marca */}
      <Link to="/" className="brand">
        <img src="icon.png" alt="Icon" />
        <h3>ControlCash</h3>
      </Link>

      {/* Seccion de opciones */}
      {userData && (
        <section>
          <Link to="/proyection" className="optionLink">
            Proyection
          </Link>
        </section>
      )}

      {/* Seccion derecha */}
      {!userData ? (
        //Seccion de auth
        <Link to="/auth" className="authLink btn">
          Get started
        </Link>
      ) : (
        //Seccion de perfil
        <Link to="/profile" className="profile">
          {/* Contenedor con texto */}
          <div className="avatarText">
            <p>{userData.name.split(" ")[0]}</p>
            <p className="paymentPlan textGray">{userData.planType}</p>
          </div>
          {/* Avatar */}
          <div className="avatarImg">
            <img src={userData.avatar} alt="User Image" />
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;

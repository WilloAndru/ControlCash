import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isLogin] = useState(false);

  return (
    <header>
      {/* Seccion de marca */}
      <Link to="/" className="brand">
        <img src="icon.png" alt="Icon" />
        <h3>ControlCash</h3>
      </Link>

      {/* Seccion de opciones */}
      {isLogin && (
        <section>
          <Link to="/proyection" className="optionLink">
            Proyection
          </Link>
        </section>
      )}

      {/* Seccion derecha */}
      {!isLogin ? (
        //Seccion de auth
        <Link to="/auth" className="authLink btn">
          Get started
        </Link>
      ) : (
        //Seccion de perfil
        <Link to="/profile" className="profile">
          {/* Contenedor con texto */}
          <div className="avatarText">
            <p>User name</p>
            <p className="paymentPlan textGray">Plan type</p>
          </div>

          {/* Avatar */}
          <div className="avatarImg">
            <img src="icon.png" alt="User Image" />
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;

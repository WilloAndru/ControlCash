import "./Header.css";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useRef, useState, useEffect } from "react";

function Header() {
  const stored = localStorage.getItem("userData");
  const userData = stored ? JSON.parse(stored) : null;

  //Logica de div desplegable
  const [isProfile, setIsProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null); //Referencia del boton perfil
  const dropdownRef = useRef<HTMLDivElement>(null); //Referencia del menu desplegable

  //Cierre del menú desplegable por clic externo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && dropdownRef.current.contains(target)) {
        return;
      }
      if (profileRef.current && profileRef.current.contains(target)) {
        console.log(2);
        setIsProfile((prev) => !prev);
        return;
      }
      // Click fuera → cerrar
      console.log(3);
      setIsProfile(false);
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

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
        //Seccion de autenticacion
        <Link to="/auth" className="authLink btn">
          Get started
        </Link>
      ) : (
        //Seccion de perfil
        <section ref={profileRef} className="profileSection">
          <button className="profile">
            {/* Contenedor con texto */}
            <div className="avatarText">
              <p>{userData.name.split(" ")[0]}</p>
              <p className="paymentPlan textGray">{userData.planType}</p>
            </div>

            {/* Avatar */}
            <div className="avatarImg">
              <img src={userData.avatar} alt="User Image" />
            </div>
          </button>

          {/* Dropdown que aparece al hacer hover */}
          {isProfile && (
            <UserDropdown
              email={userData.email}
              planType={userData.planType}
              planExpirationDate={userData.planExpirationDate}
              ref={dropdownRef}
            />
          )}
        </section>
      )}
    </header>
  );
}

export default Header;

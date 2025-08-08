import "./Header.css";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useRef, useState, useEffect } from "react";
import Profile from "../../pages/PagesDropdown/Profile";
import Configuration from "../../pages/PagesDropdown/Configuration";

function Header() {
  const stored = localStorage.getItem("userData");
  const userData = stored ? JSON.parse(stored) : null;

  //Logica de div desplegable
  const [isMenu, setIsMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null); //Referencia del boton perfil
  const dropdownRef = useRef<HTMLDivElement>(null); //Referencia del menu desplegable
  const [isProfile, setIsProfile] = useState(false);
  const [isConfiguration, setIsConfiguration] = useState(false);

  //Cierre del menú desplegable por clic externo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Click dentro del menu
      if (dropdownRef.current && dropdownRef.current.contains(target)) {
        setTimeout(() => {
          setIsMenu(false);
        }, 80);
        return;
      }

      // Click al boton de perfil
      if (profileRef.current && profileRef.current.contains(target)) {
        setIsMenu((prev) => !prev);
        return;
      }

      // Click fuera → cerrar
      setIsMenu(false);
      setIsProfile(false);
      setIsConfiguration(false);
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
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
          {isMenu && (
            <UserDropdown
              email={userData.email}
              planType={userData.planType}
              planExpirationDate={userData.planExpirationDate}
              ref={dropdownRef}
              setIsProfile={setIsProfile}
              setIsConfiguration={setIsConfiguration}
            />
          )}
        </section>
      )}

      {/* Paginas desplegables del menu */}
      {isProfile && <Profile />}
      {isConfiguration && <Configuration />}
    </header>
  );
}

export default Header;

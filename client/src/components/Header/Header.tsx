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
  const menuRef = useRef<HTMLDivElement>(null); //Referencia del boton perfil
  const dropdownRef = useRef<HTMLDivElement>(null); //Referencia del menu desplegable
  const profilePageRef = useRef<HTMLDivElement>(null); //Referencia a la pagina perfil
  const configurationPageRef = useRef<HTMLDivElement>(null); //Referencia a la pagina configuracion
  const [isProfile, setIsProfile] = useState(false);
  const [isConfiguration, setIsConfiguration] = useState(false);

  //Cierres o despliege de los refs
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
      if (menuRef.current && menuRef.current.contains(target)) {
        setIsMenu((prev) => !prev);
        return;
      }

      //Click dentro de la pagina profile
      if (profilePageRef.current && profilePageRef.current.contains(target)) {
        setIsProfile(true);
        return;
      }

      //Click dentro de la pagina configuration
      if (
        configurationPageRef.current &&
        configurationPageRef.current.contains(target)
      ) {
        setIsConfiguration(true);
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
        <section ref={menuRef} className="profileSection">
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
      {isProfile && <Profile ref={profilePageRef} />}
      {isConfiguration && <Configuration ref={configurationPageRef} />}
    </header>
  );
}

export default Header;

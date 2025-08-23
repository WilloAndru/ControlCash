import "./Header.css";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Profile from "../../pages/PagesDropdown/Profile";
import Configuration from "../../pages/PagesDropdown/Configuration";
import Brand from "../Brand/Brand";
import UserDropdown from "./UserDropdown";

function Header() {
  const storedUser = localStorage.getItem("userData");
  const userData = storedUser ? JSON.parse(storedUser) : null;
  const storedPlan = localStorage.getItem("planData");
  const planData = storedPlan ? JSON.parse(storedPlan) : null;

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
      <Brand />

      {/* Seccion de opciones */}
      {userData && (
        <section>
          <Link to="/proyection" className="option-link">
            Proyection
          </Link>
        </section>
      )}

      {/* Seccion derecha */}
      {!userData ? (
        //Seccion de autenticacion
        <Link to="/auth" className="style-btn-black btn">
          Get started
        </Link>
      ) : (
        //Seccion de perfil
        <section ref={menuRef} className="profile-section">
          <button className="profile">
            {/* Contenedor con texto */}
            <div className="avatar-text">
              <p>{userData.name.split(" ")[0]}</p>
              <p className="payment-plan text-gray">{planData.name}</p>
            </div>

            {/* Avatar */}
            <div className="avatar-img">
              <img src={userData.avatar} alt="User Image" />
            </div>
          </button>

          {/* Dropdown que aparece al hacer dar click */}
          {isMenu && (
            <UserDropdown
              email={userData.email}
              planType={planData.name}
              updatePlanDate={userData.updatePlanDate}
              planDuration={planData.duration}
              ref={dropdownRef}
              setIsProfile={setIsProfile}
              setIsConfiguration={setIsConfiguration}
            />
          )}
        </section>
      )}

      {/* Paginas desplegables del menu */}
      {isProfile && <Profile ref={profilePageRef} setIsShow={setIsProfile} />}
      {isConfiguration && (
        <Configuration
          ref={configurationPageRef}
          setIsShow={setIsConfiguration}
        />
      )}
    </header>
  );
}

export default Header;

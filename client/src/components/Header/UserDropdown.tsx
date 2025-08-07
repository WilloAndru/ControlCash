import { forwardRef, useState } from "react"; //soporte de ref en componentes hijos
import "./UserDropdown.css";
import { FaRegUserCircle } from "react-icons/fa";
import { GrDiamond } from "react-icons/gr";
import { DiAptana } from "react-icons/di";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getDaysRemaining } from "../../utils/getDaysRemaining "; //funcion para calcular los dias restantes del plan premium
import Profile from "../../pages/PagesDropdown/Profile";
import Configuration from "../../pages/PagesDropdown/Configuration";

//prop email de componente padre (Ts estricto)
interface UserDropdownProps {
  email: string;
  planType: string;
  planExpirationDate: string | null;
}

const UserDropdown = forwardRef<HTMLDivElement, UserDropdownProps>(
  ({ email, planType, planExpirationDate }, ref) => {
    //Estados para controlar las paginas desplegables dentro del dropdown
    const [isProfile, setIsProfile] = useState(false);
    const [isConfiguration, setIsConfiguration] = useState(false);
    const navigate = useNavigate();

    //Lista de opciones de perfil
    const itemsList = [
      //Opcion de editar perfil
      {
        icon: <FaRegUserCircle className="icon" />,
        text: email,
        onClick: () => setIsProfile(true),
      },
      //Opcion de cambiar plan o ver plan premium
      {
        icon: <GrDiamond className="icon" />,
        text:
          planType === "free"
            ? "Switch to higher plan"
            : `You have ${getDaysRemaining(planExpirationDate)} days left`,
        onClick: () => navigate("/planCost"),
      },
      //Configuracion general
      {
        icon: <DiAptana className="icon" />,
        text: "Configuration",
        onClick: () => setIsConfiguration(true),
      },
      //Cierre de sesion
      {
        icon: <PiSignOutBold className="icon" />,
        text: "Log out",
        onClick: () => {
          localStorage.removeItem("userData");
          window.location.reload();
        },
      },
    ];

    return (
      // Contenedor principal del menu desplegable de usuario
      <section ref={ref} className="userDropdown">
        {/* Lista de opciones de usuario */}
        {itemsList.map((item, index) => (
          <button key={index} onClick={item.onClick}>
            <span>{item.text}</span>
            {item.icon}
          </button>
        ))}

        {/* Paginas desplegables dentro del menu */}
        {isProfile && <Profile />}
        {isConfiguration && <Configuration />}
      </section>
    );
  }
);

export default UserDropdown;

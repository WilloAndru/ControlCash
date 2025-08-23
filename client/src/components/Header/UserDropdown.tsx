import { forwardRef } from "react"; //soporte de ref en componentes hijos
import "./UserDropdown.css";
import { FaRegUserCircle } from "react-icons/fa";
import { GrDiamond } from "react-icons/gr";
import { DiAptana } from "react-icons/di";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getDaysRemaining } from "../../utils/getDaysRemaining "; //funcion para calcular los dias restantes del plan premium

//prop email de componente padre (Ts estricto)
interface UserDropdownProps {
  email: string;
  planType: string;
  updatePlanDate: string | null;
  planDuration: string | null;
  setIsProfile: Function;
  setIsConfiguration: Function;
}

const UserDropdown = forwardRef<HTMLDivElement, UserDropdownProps>(
  (
    {
      email,
      planType,
      updatePlanDate,
      planDuration,
      setIsProfile,
      setIsConfiguration,
    },
    ref
  ) => {
    //Estados para controlar las paginas desplegables dentro del dropdown
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
          planType === "Free"
            ? "Switch to higher plan"
            : `You have ${getDaysRemaining(
                updatePlanDate,
                planDuration
              )} days left`,
        onClick: () => navigate("/viewPlans"),
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
      <section ref={ref} className="user-drop-down">
        {/* Lista de opciones de usuario */}
        {itemsList.map((item, index) => (
          <button key={index} onClick={item.onClick}>
            <span>{item.text}</span>
            {item.icon}
          </button>
        ))}
      </section>
    );
  }
);

export default UserDropdown;

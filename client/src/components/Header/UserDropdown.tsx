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
  planExpirationDate: string | null;
}

const UserDropdown = forwardRef<HTMLElement, UserDropdownProps>(
  ({ email, planType, planExpirationDate }, ref) => {
    const navigate = useNavigate();

    //Lista de opciones de perfil
    const itemsList = [
      //Opcion de editar perfil
      {
        icon: <FaRegUserCircle className="icon" />,
        text: email,
        onClick: () => navigate("/profile"),
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
        onClick: () => navigate("/configuration"),
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
      <section ref={ref} className="userDropdown">
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

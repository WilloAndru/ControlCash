import { forwardRef } from "react"; //soporte de ref en componentes hijos
import "./UserDropdown.css";
import { FaRegUserCircle } from "react-icons/fa";
import { GrDiamond } from "react-icons/gr";
import { DiAptana } from "react-icons/di";
import { PiSignOutBold } from "react-icons/pi";

//prop email de componente padre (Ts estricto)
interface UserDropdownProps {
  email: string;
}

const UserDropdown = forwardRef<HTMLElement, UserDropdownProps>(
  ({ email }, ref) => {
    const itemsList = [
      { icon: <FaRegUserCircle className="icon" />, text: email },
      { icon: <GrDiamond className="icon" />, text: "Switch to a higher plan" },
      { icon: <DiAptana className="icon" />, text: "Configuration" },
      { icon: <PiSignOutBold className="icon" />, text: "Log out" },
    ];

    return (
      <section ref={ref} className="userDropdown">
        {itemsList.map((item, index) => (
          <div key={index}>
            <span>{item.text}</span>
            {item.icon}
          </div>
        ))}
      </section>
    );
  }
);

export default UserDropdown;

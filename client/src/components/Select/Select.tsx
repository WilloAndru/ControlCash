import { useState } from "react";
import "./Select.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

interface SelectProps {
  title: string;
  options: string[];
  action: (value: string) => void;
}

function Select({ title, options, action }: SelectProps) {
  const [isClick, setIsClick] = useState(false); //El select fue seleccionado?
  const [selected, setSelected] = useState(title); //Que opcion fue seleccionada

  return (
    <div className="select">
      {/* Select por defecto */}
      <button onClick={() => setIsClick(!isClick)}>
        <p>{selected}</p>
        <IoIosArrowDown />
      </button>

      {/* Opciones del select */}
      {isClick && (
        <div className="selectDropDown">
          {options.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                action(item);
                setSelected(item);
                setIsClick(false);
              }}
            >
              {item}
              {selected === item && <FaCheck />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;

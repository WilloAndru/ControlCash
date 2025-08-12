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
  const [isClick, setIsClick] = useState(false);
  const [selected, setSelected] = useState(title);

  return (
    <div className="select">
      <button onClick={() => setIsClick(!isClick)}>
        <p>{selected}</p>
        <IoIosArrowDown />
      </button>

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

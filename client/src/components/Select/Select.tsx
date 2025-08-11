import { useState } from "react";
import "./Select.css";
import { IoIosArrowDown } from "react-icons/io";

interface SelectProps {
  title: string;
  options: string[];
  action: (value: string) => void;
}

function Select({ title, options, action }: SelectProps) {
  const [isClick, setIsClick] = useState(false);

  return (
    <div className="select">
      <button onClick={() => setIsClick(!isClick)}>
        <p>{title}</p>
        <IoIosArrowDown />
      </button>

      {isClick && (
        <div className="selectDropDown">
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                action(item);
                setIsClick(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;

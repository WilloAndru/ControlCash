import { useState } from "react";
import { forwardRef } from "react"; //soporte de ref en componentes hijos

const Configuration = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const stored = localStorage.getItem("userData");
  const userData = stored ? JSON.parse(stored) : {};

  const [country, setCountry] = useState(userData.country || "");
  const [city, setCity] = useState(userData.city || "");
  const [income, setIncome] = useState(userData.income || "");

  const listDatas = [
    {
      title: "Which country do you live in?",
      value: country,
      onChange: setCountry,
    },
    { title: "Which city do you live in?", value: city, onChange: setCity },
    {
      title: "What is your monthly income?",
      value: income,
      onChange: setIncome,
    },
  ];

  return (
    <div className="pageDropdown">
      <section ref={ref}>
        <form className="container">
          <header className="headerpageDropdown">
            <h2>Custom your profile</h2>
            <p>
              Edit your information to get more accurate estimates and costs.
            </p>
          </header>
          <main>
            {listDatas.map((item, index) => (
              <div key={index}>
                <h3>{item.title}</h3>
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => item.onChange(e.target.value)}
                />
              </div>
            ))}
          </main>
        </form>
      </section>
    </div>
  );
});

export default Configuration;

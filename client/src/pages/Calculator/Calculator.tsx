import { useEffect } from "react";
import "./Calculator.css";
import { useProfile } from "../../context/ProfileContext";

function Calculator() {
  const storedData = localStorage.getItem("userData");
  const userData = storedData ? JSON.parse(storedData) : {};
  const isCompleteData = userData.city && userData.country && userData.savings;
  const { setIsProfile } = useProfile();

  useEffect(() => {
    !isCompleteData && setIsProfile(true);
  }, []);

  return (
    <main className="calculator">
      {isCompleteData ? (
        <section className="calculator"></section>
      ) : (
        <section className="calculator">
          <div className="havent-filled-div">
            <h1>
              You haven’t filled in your details yet:
              {!userData.city && " City,"}
              {!userData.country && " Country,"}
              {!userData.savings && " Savings"}
            </h1>
            <button
              className="style-btn-black"
              onClick={() => setIsProfile(true)}
            >
              Fill them in here
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default Calculator;

import { useParams } from "react-router-dom";
import "./PayPlan.css";

function PayPlan() {
  const { planName } = useParams();

  return <div className="pay-plan"></div>;
}

export default PayPlan;

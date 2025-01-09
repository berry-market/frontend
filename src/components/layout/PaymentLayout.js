import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const PaymentLayout = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v2/standard";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PaymentLayout;

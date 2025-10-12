import RegisterForm from "../components/register";
import { useEffect } from "react";

function Registration() {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);
  return (
    <div className="flex items-start justify-between gap-[173px]">
      <img src="/Couple.svg" alt="" />
      <RegisterForm />
    </div>
  );
}

export default Registration;

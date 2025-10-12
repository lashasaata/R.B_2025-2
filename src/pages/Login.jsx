import { useEffect } from "react";
import LoginForm from "../components/logIn";

function Login() {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);
  return (
    <div className="flex items-start justify-between gap-[173px]">
      <img src="/Couple.svg" alt="" />
      <LoginForm />
    </div>
  );
}

export default Login;

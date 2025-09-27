import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved && Object.keys(saved).length > 0) {
      setUser({ avatar: saved.avatar, name: saved.name });
    }
  }, [location]);

  return (
    <header className="w-full flex items-center justify-between px-[100px] py-[28px]">
      <div className="flex items-center gap-1" onClick={() => navigate("/")}>
        <img src="/HandEye.svg" alt="Logo" />
        <span className="text-base text-[#10151f] leading-[24px] font-semibold">
          RedSeam Clothing
        </span>
      </div>

      {user ? (
        <div className="flex items-center gap-5">
          <img src="/cart.svg" alt="Cart" />
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div>{user.name}</div>
          )}
        </div>
      ) : (
        <label
          htmlFor="LogIn"
          className="flex items-center gap-2 cursor-pointer"
          onClick={
            location.pathname === "/login"
              ? () => navigate("/register")
              : () => navigate("/login")
          }
        >
          <button id="LogIn" className="cursor-pointer">
            <img src="/user.svg" alt="" />
          </button>
          <span className="text-xs text-[#10151f] font-[500]">
            {location.pathname === "/login" ? "Sign up" : "Log in"}
          </span>
        </label>
      )}
    </header>
  );
}

export default Header;

import React, { useState } from "react";
import { FloatingInput } from "./floatingInput";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { ...formData, avatar: avatarFile });
      // Here you would typically send the data to your backend
      alert("Registration successful! Check the console for form data.");
    }
  };

  return (
    <div className="w-[554px] flex flex-col gap-12  bg-card mr-[245px] mt-[241px]">
      <div className="p-6 pb-4 space-y-1">
        <h1 className="text-[42px] text-[#10151f] leading-[63px] font-semibold">
          Log in
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="" id="login">
        <FloatingInput
          id="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange("email")}
          error={errors.email ?? ""}
        />
        <FloatingInput
          id="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange("password")}
          showPasswordToggle={true}
          error={errors.password ?? ""}
        />
      </form>
      <div className="flex flex-col gap-6 mt-[-24px]">
        <button
          type="submit"
          form="login"
          className="w-full rounded-[10px] bg-[#ff4000] py-[10px] text-sm text-[#fff] leading-[21px] cursor-pointer"
        >
          Log in
        </button>
        <p className="flex items-center gap-2 self-center text-sm text-[#3e424a] leading-[21px]">
          Not a member?{" "}
          <button
            className="text-[#ff4000] font-500 cursor-pointer"
            onClick={() => navigate("/Register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;

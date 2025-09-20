import React, { useState } from "react";
import { FloatingInput } from "./FloatingInput";
import { AvatarUpload } from "./AvatarUpload";
import { useNavigate } from "react-router";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
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

  console.log(errors, formData);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

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
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    <div className="w-[554px] flex flex-col gap-12  bg-card mr-[245px] mt-[152px]">
      <div className="p-6 pb-4 space-y-1">
        <h1 className="text-[42px] text-[#10151f] leading-[63px] font-semibold">
          Registration
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="" id="register">
        <AvatarUpload
          setAvatarFile={setAvatarFile}
          error={errors.avatar ?? ""}
          setErrors={setErrors}
        />
        <FloatingInput
          id="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange("username")}
          error={errors.username ?? ""}
        />
        <FloatingInput
          id="email"
          type="email"
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

        <FloatingInput
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange("confirmPassword")}
          showPasswordToggle={true}
          error={errors.confirmPassword ?? ""}
        />
      </form>

      <div className="flex flex-col gap-6 mt-[-24px]">
        <button
          type="submit"
          form="register"
          className="w-full rounded-[10px] bg-[#ff4000] py-[10px] text-sm text-[#fff] leading-[21px] cursor-pointer"
        >
          Register
        </button>
        <p className="flex items-center gap-2 self-center text-sm text-[#3e424a] leading-[21px]">
          Already member?{" "}
          <button
            className="text-[#ff4000] font-500 cursor-pointer"
            onClick={() => navigate("/Login")}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};
export default RegisterForm;

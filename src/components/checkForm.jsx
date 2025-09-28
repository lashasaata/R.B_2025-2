import { FloatingInput } from "./floatingInput";

function CheckForm({ formData, setFormData, errors, setErrors, preEmail }) {
  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value.trim(),
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };
  return (
    <div className="px-[47px] py-[72px] flex flex-col gap-[46px] w-[1129px] h-[645px] rounded-[16px] bg-[#f8f6f7]">
      <h3 className="text-[22px] text-[#3e424a] font-medium">Order details</h3>
      <form action="" id="checkout" className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-6 w-[578px]">
          <div className="flex-1">
            <FloatingInput
              id={"name"}
              type={"text"}
              placeholder={"Name"}
              value={formData.name}
              onChange={handleInputChange("name")}
              error={errors.name && errors.name}
            />
          </div>
          <div className="flex-1">
            <FloatingInput
              id={"surname"}
              type={"text"}
              placeholder={"Surname"}
              value={formData.surname}
              error={errors.surname && errors.surname}
              onChange={handleInputChange("surname")}
            />
          </div>
        </div>
        <div className="h-[66px] flex flex-col gap-2">
          <label
            htmlFor="email"
            className={`${
              errors.email ? "border-[#ff4000]" : "border-[#e1dfe1]"
            } w-[578px] px-3 py-[10.5px] flex items-center gap-6 rounded-[8px] border bg-[#fff] cursor-pointer`}
          >
            <div className="flex items-center gap-1">
              <img src="/email.svg" alt="" />
              <span className="text-sm text-[#3e424a]">Email</span>
            </div>
            <input
              type="email"
              value={formData.email}
              id="email"
              placeholder={preEmail}
              className="outline-none h-[21px] w-full"
              onChange={handleInputChange("email")}
            />
          </label>
          <span className="text-[10px] text-[#FF4000] font-[300] leading-[15px] ml-[6px]">
            {errors.email}
          </span>
        </div>
        <div className="flex items-center gap-6 w-[578px]">
          <div className="flex-1">
            <FloatingInput
              id={"adress"}
              type={"text"}
              placeholder={"Address"}
              value={formData.address}
              error={errors.address && errors.address}
              onChange={handleInputChange("address")}
              width={277}
            />
          </div>
          <div className="flex-1">
            <FloatingInput
              id={"zip_code"}
              type={"text"}
              placeholder={"Zip code"}
              value={formData.zip_code}
              error={errors.zip_code && errors.zip_code}
              onChange={handleInputChange("zip_code")}
              width={277}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckForm;

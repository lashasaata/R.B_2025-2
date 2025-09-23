import { FloatingInput } from "./floatingInput";
import { useState } from "react";

function Price(props) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (e) => {
    props.setPrices((prev) => ({
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

  return (
    <section className="cursor-default absolute top-[34px] right-[-16px] w-[392px] flex flex-col gap-6 p-4 border border-[#e1dfe1] rounded-[8px]">
      <h2 className="text-base text-[#10151f] leading-[26px] font-semibold">
        Select price
      </h2>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="flex-1">
            <FloatingInput
              id="from"
              type="text"
              value={props.prices.from}
              placeholder="From"
              onChange={handleInputChange("from")}
              required={false}
              width={175}
            />
          </div>
          <div className="flex-1">
            <FloatingInput
              id="to"
              type="text"
              value={props.prices.to}
              placeholder="to"
              onChange={handleInputChange("to")}
              required={false}
              width={175}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#FF4000]">
            {Object.keys(errors).length > 0 ? "Wrong value placemet" : ""}
          </span>
          <button className="bg-[#ff4000] rounded-[10px] px-[42px] py-[10px] text-sm text-[#fff] cursor-pointer">
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}

export default Price;

import { FloatingInput } from "./floatingInput";
import { useState } from "react";

function Price(props) {
  const [errors, setErrors] = useState(false);
  const [values, setValues] = useState({
    from: "",
    to: "",
  });

  const handleInputChange = (field) => (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setValues(() => ({
      ...values,
      [field]: value,
    }));

    // Clear error when user starts typing
    setErrors(false);
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (values.from == "" && values.to == "") {
      props.setModals({
        filter: false,
        sort: false,
      });
    } else {
      if (Number(values.from) > Number(values.to) && values.to != "") {
        setErrors(true);
        return;
      } else {
        setErrors(false);
      }

      props.setModals({
        filter: false,
        sort: false,
      });
      setValues({
        from: "",
        to: "",
      });
      props.setPrices(values);
    }
    props.setPage(1);
  };

  return (
    <section className="cursor-default absolute top-[34px] right-[-16px] w-[392px] flex flex-col gap-6 p-4 border border-[#e1dfe1] rounded-[8px] bg-[#fff]">
      <h2 className="text-base text-[#10151f] leading-[26px] font-semibold">
        Select price
      </h2>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="flex-1">
            <FloatingInput
              id="from"
              type="text"
              value={values.from}
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
              value={values.to}
              placeholder="to"
              onChange={handleInputChange("to")}
              required={false}
              width={175}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#FF4000]">
            {errors ? "Wrong value placemet" : ""}
          </span>
          <button
            className="bg-[#ff4000] rounded-[10px] px-[42px] py-[10px] text-sm text-[#fff] cursor-pointer"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}

export default Price;

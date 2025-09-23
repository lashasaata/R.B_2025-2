import { useState } from "react";
import Price from "./price";

function Filtering() {
  const [prices, setPrices] = useState({
    from: "",
    to: "",
  });
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-[42px] text-[#10151f] leading-[63px] font-semibold">
          Products
        </h1>
        <section className="flex items-center gap-8">
          <div className="pr-8 border-r border-[#e1dfe1] text-center">
            <span className="text-xs text-[#3e424a] leading-[18px]">
              Showing x from y results
            </span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer relative">
            <img src="/filter.svg" alt="" />
            <span className="text-base text-[#10151f] leading-[18px]">
              Filter
            </span>
            <Price prices={prices} setPrices={setPrices} />
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-base text-[#10151f] leading-[18px]">
              Sort by
            </span>
            <img src="/chevron-down.svg" alt="" />
          </div>
        </section>
      </div>
    </section>
  );
}

export default Filtering;

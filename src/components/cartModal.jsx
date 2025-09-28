import { useEffect, useState } from "react";

export default function CartModal({ setCart, items, children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const getTotalQ = () => {
    let total = 0;
    items?.forEach((element) => {
      if (element.quantity) {
        total += element.quantity;
      }
    });
    return total;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end max-h-screen overflow-scroll">
      <div
        className="absolute inset-0 bg-[#10151f] opacity-30"
        onClick={() => setCart(false)}
      ></div>
      <div className="relative flex flex-col gap-[63px] w-[540px] min-h-screen p-10 border border-[#e1dfe1] bg-[#f8f6f7]">
        {/* Close button */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-[#10151f] leading-[30px] font-semibold">
            Shopping cart ({getTotalQ()})
          </h1>
          <button
            className="text-black hover:text-gray-500 cursor-pointer"
            onClick={() => setCart(false)}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

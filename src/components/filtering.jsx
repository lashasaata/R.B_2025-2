import { useState, useRef, useEffect } from "react";
import Price from "./price";
import Sort from "./sort";

function Filtering(props) {
  const [modals, setModals] = useState({
    filter: false,
    sort: false,
  });

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // outside clicking closes the modal

      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setModals((prev) => ({ ...prev, filter: false }));
      }

      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setModals((prev) => ({ ...prev, sort: false }));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setModals]);
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[42px] text-[#10151f] leading-[63px] font-semibold">
          Products
        </h1>
        <section className="flex items-center gap-8">
          <div className="pr-8 border-r border-[#e1dfe1] text-center">
            <span className="text-xs text-[#3e424a] leading-[18px]">
              {props.meta ? (
                <>
                  Showing{" "}
                  {props.meta.from === props.meta.to
                    ? props.meta.from
                    : `${props.meta.from}-${props.meta.to}`}{" "}
                  of {props.meta.total}{" "}
                  {props.meta.total < 2 ? "result" : "results"}
                </>
              ) : (
                "Loading..."
              )}
            </span>
          </div>
          <div ref={filterRef} className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setModals({ ...modals, filter: !modals.filter })}
            >
              <img src="/filter.svg" alt="" />
              <span className="text-base text-[#10151f] leading-[18px]">
                Filter
              </span>
            </div>
            {modals.filter && (
              <Price
                prices={props.prices}
                setPrices={props.setPrices}
                setModals={setModals}
                setPage={props.setPage}
              />
            )}
          </div>
          <div ref={sortRef} className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setModals({ ...modals, sort: !modals.sort })}
            >
              <span className="text-base text-[#10151f] leading-[18px]">
                {Object.keys(props.sortValue)[0] == "default"
                  ? "Sort by"
                  : Object.keys(props.sortValue)[0]}
              </span>
              <img src="/chevron-down.svg" alt="" />
            </div>
            {modals.sort && (
              <Sort
                sortValue={props.sortValue}
                setSortValue={props.setSortValue}
                setModals={setModals}
                setPage={props.setPage}
              />
            )}
          </div>
        </section>
      </div>
      {props.prices.from || props.prices.to ? (
        <section className="flex">
          <div className="flex items-center gap-[6px] border border-[#e1dfe1] rounded-[50px] py-2 pl-4 pr-[10px]">
            <span className="text-sm text-[#3e424a] leading-[21px]">
              Price:{" "}
              {props.prices.from == props.prices.to
                ? props.prices.from
                : props.prices.from == ""
                ? "<" + props.prices.to
                : props.prices.to == ""
                ? ">" + props.prices.from
                : props.prices.from + "-" + props.prices.to}
            </span>
            <img
              src="/x-mark.svg"
              alt="Delete"
              className="cursor-pointer"
              onClick={() => {
                props.setPrices({ from: "", to: "" });
                props.setPage(1);
              }}
            />
          </div>
        </section>
      ) : (
        ""
      )}
    </section>
  );
}

export default Filtering;

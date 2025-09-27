import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../api/cart";

function Details({ product, current, setCurrent, id }) {
  const color = product?.available_colors?.[current] || null;
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(false);

  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved && Object.keys(saved)) {
      setToken(saved.token);
    }
  }, []);

  const quantityRef = useRef(null);

  useEffect(() => {
    if (product) {
      setSize(product.available_sizes?.[0] || product.size || null);
    }
  }, [product]);

  useEffect(() => {
    //closes the modal when clicked outside
    function handleClickOutside(event) {
      if (quantityRef.current && !quantityRef.current.contains(event.target)) {
        setAmount(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addItem = async () => {
    if (!size || !color || !product.quantity) {
      toast.error("Product is out of stock", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    if (!token) {
      navigate("/login");
      return;
    }
    const apiData = {
      quantity: quantity,
      color: color,
      size: size,
    };

    const result = await addToCart(apiData, id);

    if (result.status == 201) {
      toast.success("Product has added to the cart", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error(result.statusText, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-[704px] flex flex-col gap-[56px]">
      <p className="flex flex-col gap-[21px] text-[32px] text-[#10151f] font-semibold">
        <span>{product.name}</span>
        <span>{product.price}</span>
      </p>

      <aside className="flex flex-col gap-12">
        {/* colors */}
        <section className="flex flex-col gap-4">
          <p className="text-base text-[#10151f]">Color: {color || ""}</p>
          <div className="flex items-center gap-2">
            {product.available_colors?.length ? (
              product.available_colors.map((c, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer`}
                  style={{
                    border:
                      current === index && c == "White"
                        ? `1px solid #e1dfe1`
                        : current === index
                        ? `1px solid ${c}`
                        : "1px solid transparent",
                  }}
                  onClick={() => {
                    if (current != index) {
                      setCurrent(index);
                    }
                  }}
                >
                  <div
                    className={`${
                      c === "White" ? "border border-[#e1dfe1]" : ""
                    } w-[38px] h-[38px] rounded-full hover:opacity-80 hover:cursor-pointer`}
                    style={{ backgroundColor: c }}
                  ></div>
                </div>
              ))
            ) : (
              <span className="text-sm text-[#ff4000] font-medium">
                Product colors are not available
              </span>
            )}
          </div>
        </section>

        {/* sizes */}
        <section className="flex flex-col gap-4">
          <p className="text-base text-[#10151f]">Size: {size || ""}</p>
          <div className="flex items-center gap-2">
            {product.available_sizes?.length ? (
              product.available_sizes.map((s) => (
                <div
                  key={s}
                  className={`${
                    size === s
                      ? "border-[#10151f]"
                      : "opacity-80 border-[#e1dfe1]"
                  } w-[70px] h-[42px] flex items-center justify-center rounded-[10px] border hover:border-[#10151f] text-base text-[#10151f] hover:opacity-100 hover:cursor-pointer`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </div>
              ))
            ) : product.size ? (
              <div className="w-[70px] h-[42px] flex items-center justify-center rounded-[10px] border border-[#10151f] text-base text-[#10151f]">
                {product.size}
              </div>
            ) : (
              <span className="text-sm text-[#ff4000] font-medium">
                Product sizes are not available
              </span>
            )}
          </div>
        </section>

        {/* quantity */}
        <section className="flex flex-col gap-4 relative" ref={quantityRef}>
          <p className="text-base text-[#10151f]">Quantity</p>
          <div
            onClick={() => setAmount(!amount)}
            className="w-[70px] h-[42px] flex items-center justify-center gap-[10px] border border-[#e1dfe1] rounded-[10px] cursor-pointer text-base text-[#10151f] opacity-80 hover:opacity-100"
          >
            {quantity}
            <img
              src="/chevron-down.png"
              alt=""
              className={`transition-transform duration-300 ${
                amount ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          {amount && (
            <section className="absolute border border-[#e1dfe1] top-[85px] bg-[#fff] rounded-[10px] py-1">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <div
                  key={num}
                  className={`${
                    num > (product.quantity ?? 0)
                      ? "opacity-50"
                      : "opacity-70 hover:opacity-100 hover:cursor-pointer"
                  } w-[70px] flex items-center justify-center px-1 text-xl text-[#10151f] font-semibold`}
                  onClick={() => {
                    if (num <= (product.quantity ?? 0)) {
                      setQuantity(num);
                      setAmount(false);
                    }
                  }}
                >
                  {num}
                </div>
              ))}
            </section>
          )}
        </section>
      </aside>

      {/* add to cart */}
      <button
        className="flex items-center justify-center gap-[10px] py-4 rounded-[10px] bg-[#ff4000] hover:cursor-pointer hover:opacity-80"
        onClick={addItem}
      >
        <img src="/shopping-cart.svg" alt="" />
        <span className="text-xl text-[#fff] font-medium">Add to cart</span>
      </button>

      {/* product details */}
      <footer className="flex flex-col gap-2 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xl text-[#10151f] font-semibold leading-[30px]">
            Details
          </span>
          {product.brand?.image && (
            <img src={product.brand.image} alt="" className="h-[62px]" />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-base text-[#3e424a] leading-[24px]">
            Brand: {product.brand?.name || "Unknown"}
          </span>
          <p className="text-base text-[#3e424a] leading-[24px]">
            {product.description}
          </p>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default Details;

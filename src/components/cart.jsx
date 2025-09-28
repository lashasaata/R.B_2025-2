import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { checkout } from "../api/cart";

function Cart({
  items,
  setItems,
  setCart,
  formData,
  setFormData,
  setErrors,
  preEmail,
  setPaid,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const subTotal = () => {
    let sum = 0;
    items.forEach((num) => {
      sum += num.price;
    });
    return sum;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    }
    if (formData.email == "") {
      // let use registration email
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.zip_code.trim()) {
      newErrors.zip_code = "Zip code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // setIsLoading(true);
    let data = {};
    if (formData.email == "") {
      data = { ...formData, email: preEmail };
    } else {
      data = { ...formData };
    }

    const result = await checkout(data);

    console.log(result);

    if (result.status == 200) {
      setPaid(true);
      setItems([]);
      setFormData({
        name: "",
        surname: "",
        email: "",
        address: "",
        zip_code: "",
      });
    }

    console.log(result);
  };
  return (
    <section
      className={
        location.pathname === "/checkout" ? "h-full w-[460px]" : "h-full"
      }
    >
      {items?.length > 0 ? (
        <div className="flex flex-col justify-between gap-[80px]">
          <div
            className={`${
              location.pathname === "/checkout"
                ? "h-[310px] max-h-[310px]"
                : "h-[550px] max-h-[550px]"
            } flex flex-col gap-9 overflow-scroll`}
          >
            {items?.map((e) => {
              return (
                <section className="w-full flex gap-[17px]">
                  <img
                    src={e.cover_image}
                    alt="Product"
                    className="w-[100px] h-[134px] rounded-[10px] border border-[#e1dfe1]"
                  />
                  <aside className="w-full flex flex-col gap-2 py-[8.5px]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#10151f] leading-[21px] font-semibold">
                        {e.name}
                      </p>
                      <span className="text-lg text-[#10151f] leading-[27px] font-semibold">
                        $ {e.price}
                      </span>
                    </div>
                    <span className="text-xs text-[#3e424a] leading-[18px]">
                      {e.color}
                    </span>
                    <span className="text-xs text-[#3e424a] leading-[18px]">
                      {e.size}
                    </span>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[7px] px-2 py-1 rounded-[22px] border border-[#e1dfe1]">
                        <Minus className="h-4 w-4 text-[#3e424a] hover:text-red-800 hover:cursor-pointer" />
                        <span className="text-xs text-[#3e424a] leading-[18px]">
                          1
                        </span>
                        <Plus className="h-4 w-4 text-[#3e424a] hover:text-blue-800 hover:cursor-pointer" />
                      </div>
                      <span className="text-xs text-[#3e424a] leading-[18px] opacity-80 cursor-pointer hover:opacity-100">
                        Remove
                      </span>
                    </div>
                  </aside>
                </section>
              );
            })}
          </div>
          <div
            className={`${
              location.pathname === "/checkout" ? "gap-[80px]" : "gap-[102px]"
            } flex flex-col`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base text-[#3e424a] leading-[24px] ">
                  Items subtotal
                </span>
                <span className="text-base text-[#3e424a] leading-[24px] ">
                  $ {subTotal()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base text-[#3e424a] leading-[24px] ">
                  Delivery
                </span>
                <span className="text-base text-[#3e424a] leading-[24px] ">
                  $ 5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl text-[#10151f] leading-[30px] font-semibold">
                  Total
                </span>
                <span className="text-xl text-[#10151f] leading-[30px] font-semibold">
                  ${subTotal() + 5}
                </span>
              </div>
            </div>
            {location.pathname === "/checkout" ? (
              <button
                form="checkout"
                className="w-full py-4 rounded-[10px] border bg-[#ff4000] text-[#fff] text-lg font-medium cursor-pointer hover:opacity-80"
                onClick={handleSubmit}
              >
                Pay
              </button>
            ) : (
              <button
                className="w-full py-4 rounded-[10px] border bg-[#ff4000] text-[#fff] text-lg font-medium cursor-pointer hover:opacity-80"
                onClick={() => {
                  navigate("/checkout");
                  setCart(false);
                }}
              >
                Go to checkout
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[58px] mt-[88px]">
          <div className="flex flex-col items-center gap-6">
            <img src="/bigCart.svg" alt="" className="w-[170px] h-[135px]" />
            <div className="flex flex-col items-center gap-[10px]">
              <span className="text-[24px] text-[#10151F] font-semibold">
                Ooops!
              </span>
              <p className="text-sm text-[#3E424A]">
                You’ve got nothing in your cart just yet...
              </p>
            </div>
          </div>

          <button
            className="w-[214px] h-[41px] flex items-center justify-center bg-[#FF4000] rounded-[10px] text-sm text-[#fff] cursor-pointer hover:opacity-80"
            onClick={() => {
              navigate("/");
              setCart(false);
            }}
          >
            Start shopping
          </button>
        </div>
      )}
    </section>
  );
}

export default Cart;

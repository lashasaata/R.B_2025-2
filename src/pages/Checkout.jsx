import { getCart } from "../api/cart";
import Cart from "../components/cart";
import CheckForm from "../components/checkForm";
import { useState, useEffect } from "react";
import Congrats from "../components/congrats";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    zip_code: "",
  });
  const [errors, setErrors] = useState({});

  const [items, setItems] = useState([]);
  useEffect(() => {
    const request = async () => {
      const result = await getCart();
      setItems(result);
    };
    request();
  }, []);

  const [preEmail, setPreEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user.email) {
      navigate("/");
    }
    setPreEmail(user.email);
  }, []);

  const [paid, setPaid] = useState(false);
  return (
    <div className="flex flex-col gap-[42px] px-[100px] mt-[72px]">
      <h1 className="text-[42px] text-[#10151f] font-semibold">Checkout</h1>
      <div className="flex justify-between">
        <CheckForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          preEmail={preEmail}
        />
        <Cart
          items={items}
          setItems={setItems}
          formData={formData}
          setFormData={setFormData}
          setErrors={setErrors}
          preEmail={preEmail}
          setPaid={setPaid}
        />
      </div>
      {paid && <Congrats setPaid={setPaid} />}
    </div>
  );
}

export default Checkout;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartModal from "./cartModal";
import Cart from "./cart";
import { getCart, updateCart, deleteProduct } from "../api/cart";

function Header() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const saved = JSON.parse(localStorage.getItem("user"));
      if (saved && Object.keys(saved).length > 0) {
        setUser({ avatar: saved.avatar, name: saved.name });
      } else {
        setUser(null);
      }
    };

    updateUser(); // run once at start

    // listen for changes in localStorage (including DevTools)
    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);
  }, [location]);

  const [items, setItems] = useState([]);

  async function loadCart() {
    const res = await getCart();
    setItems(res);
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function changeQuantity(productId, newQty, color, size) {
    if (newQty > 0 && newQty <= 250) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === productId && item.color == color && item.size == size
            ? { ...item, quantity: newQty }
            : item
        )
      );

      try {
        await updateCart(productId, newQty, color, size);
      } catch (err) {
        console.error("Failed to update quantity:", err);
        await loadCart();
      }
    }
  }

  async function deleteItem(productId, color, size) {
    setItems((prev) =>
      prev.filter(
        (i) => i.id !== productId || i.color !== color || i.size !== size
      )
    );

    try {
      await deleteProduct(productId, color, size);
    } catch (err) {
      console.error("Failed to delete item:", err);
      setCart(items);
    }
  }

  return (
    <header className="w-full flex items-center justify-between px-[100px] py-[28px]">
      <div className="flex items-center gap-1" onClick={() => navigate("/")}>
        <img src="/HandEye.svg" alt="Logo" />
        <span className="text-base text-[#10151f] leading-[24px] font-semibold">
          RedSeam Clothing
        </span>
      </div>

      {user ? (
        <div className="flex items-center gap-5">
          <img
            src="/cart.svg"
            alt="Cart"
            className="hover:cursor-pointer"
            onClick={() => {
              if (location.pathname !== "/checkout") {
                setCart(true);
              }
            }}
          />
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div>{user.name}</div>
          )}
        </div>
      ) : (
        <label
          htmlFor="LogIn"
          className="flex items-center gap-2 cursor-pointer"
          onClick={
            location.pathname === "/login"
              ? () => navigate("/register")
              : () => navigate("/login")
          }
        >
          <button id="LogIn" className="cursor-pointer">
            <img src="/user.svg" alt="" />
          </button>
          <span className="text-xs text-[#10151f] font-[500]">
            {location.pathname === "/login" ? "Sign up" : "Log in"}
          </span>
        </label>
      )}
      {cart && (
        <CartModal setCart={setCart} items={items}>
          <Cart
            items={items}
            setCart={setCart}
            changeQuantity={changeQuantity}
            deleteItem={deleteItem}
          />
        </CartModal>
      )}
    </header>
  );
}

export default Header;

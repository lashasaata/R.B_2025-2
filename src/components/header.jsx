function Header() {
  return (
    <header className="w-full flex items-center justify-between px-[100px] py-[28px]">
      <div className="flex items-center gap-1">
        <img src="/HandEye.svg" alt="Logo" />
        <span className="text-base text-[#10151f] leading-[24px] font-semibold">
          RedSeam Clothing
        </span>
      </div>
      <label htmlFor="LogIn" className="flex items-center gap-2 cursor-pointer">
        <button id="LogIn" className="cursor-pointer">
          <img src="/user.svg" alt="" />
        </button>
        <span className="text-xs text-[#10151f] font-[500]">Log in</span>
      </label>
    </header>
  );
}

export default Header;

import { useNavigate } from "react-router";

export default function Congrats({ setPaid }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center max-h-screen overflow-scroll">
      <div className="absolute inset-0 bg-[#10151f] opacity-20"></div>
      <div className="relative flex flex-col items-center gap-[44px] w-[876px] h-[590px] p-[30px] border border-[#e1dfe1] rounded-[10px] bg-[#fff]">
        <div
          className="text-[25px] text-[#3e424a] font-bold p-[10px] tracking-[20px] self-end cursor-pointer hover:opacity-80"
          onClick={() => setPaid(false)}
        >
          x
        </div>
        <div className="flex flex-col gap-[74px]">
          <div className="flex flex-col items-center gap-10">
            <div className="px-5 py-6 bg-[#f8f6f7] rounded-full">
              <img src="/done.svg" alt="Done" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-[42px] text-[#10151f] font-semibold">
                Congrats!
              </h1>
              <p className="text-sm text-[#3e424a]">
                Your order is placed successfully!
              </p>
            </div>
          </div>
          <button
            className="w-full py-[10px] rounded-[10px] bg-[#ff4000] hover:opacity-80 text-[#fff] text-sm cursor-pointer"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}

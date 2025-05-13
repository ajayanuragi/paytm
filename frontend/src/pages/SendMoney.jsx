import { Heading } from "../components/form/Heading";
export function SendMoney() {
  return (
    <div className="min-h-screen flex items-center  justify-center bg-slate-100">
      <div className="w-1/3 border-slate-400 border shadow  shadow-black p-8 rounded-xl">
        <div className="text-center">
          <Heading text={"Send Money"} />
        </div>
        <div className="flex items-center gap-2 mt-10">
          <div className="bg-black w-10 h-10 rounded-full text-white text-xl flex items-center justify-center">
            A
          </div>
          <div className="text-2xl"> Friend's Name</div>
        </div>
        <div>Amount in (Rs)</div>
        <input
          placeholder="Enter Amount"
          className="w-full ring-1 ring-gray-500 mt-2 p-2 rounded-md"
        />
        <button className="w-full bg-black text-white mt-4 p-3 rounded-md">
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}

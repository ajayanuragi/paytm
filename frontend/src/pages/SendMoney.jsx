import { useLocation, useNavigate, useParams } from "react-router";
import { Heading } from "../components/form/Heading";
import { useState } from "react";
import api from "../api/api";
export function SendMoney() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { firstName, lastName } = location.state || {};

  const handleTransfer = async () => {
    if (!isAmountValid) {
      return;
    }
    setLoading(true);
    try {
      await api.post("/account/transfer", {
        to: id,
        amount,
      });
      alert("Transfer successful!");
      navigate(-1);
    } catch (error) {
      setError(error.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setAmount(value);
      setError("");
    }
  };

  const isAmountValid = amount && !isNaN(amount) && parseFloat(amount) > 0;

  return (
    <div className="min-h-screen flex items-center  justify-center bg-slate-100">
      <div className="w-1/3 border-slate-400 border shadow  shadow-black p-8 rounded-xl">
        <div className="text-center">
          <Heading text={"Send Money"} />
        </div>
        <div className="flex items-center gap-2 mt-10">
          <div className="bg-black w-10 h-10 rounded-full text-white text-xl flex items-center justify-center">
            {firstName?.[0]}
            {lastName?.[0]}
          </div>
          <div className="text-2xl">
            {firstName} {lastName}
          </div>
        </div>
        <div>Amount in (Rs)</div>
        <input
          placeholder="Enter Amount"
          className={`w-full mt-2 p-2 rounded-md border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-black focus:border-transparent`}
          value={amount}
          onChange={handleAmountChange}
        />

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex gap-2">
          <button
            className={`w-2/3 text-white  rounded-md mt-4 p-3 transition-colors ${
              isAmountValid
                ? "bg-black cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleTransfer}
            disabled={!isAmountValid || loading}
          >
            {loading ? "Processing..." : "Initiate Transfer"}
          </button>
          <button
            className="w-1/3 border mt-4 p-3 rounded-md cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Balance } from "../components/dashboard/Balance";
import { Navbar } from "../components/dashboard/Navbar";
import { Users } from "../components/dashboard/Users";
import api from "../api/api";

export function Dashboard() {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await api.get("/account/balance");
        setBalance(res.data.balance);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchBalance();
  }, []);
  return (
    <div>
      <Navbar />
      <Balance balance={balance} />
      <Users />
    </div>
  );
}

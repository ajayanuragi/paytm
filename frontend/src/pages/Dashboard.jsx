import { useEffect, useState } from "react";
import { Balance } from "../components/dashboard/Balance";
import { Navbar } from "../components/dashboard/Navbar";
import { Users } from "../components/dashboard/Users";
import api from "../api/api";

export function Dashboard() {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/user/me");
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchProfile();
  }, []);

  if (!currentUser) {
    return <div className="p-8 text-red-500">Failed to load user data</div>;
  }
  return (
    <div>
      <Navbar name={currentUser.firstName} />
      <Balance balance={currentUser.balance} />
      <Users userId={currentUser._id} />
    </div>
  );
}

import { Balance } from "../components/dashboard/Balance";
import { Navbar } from "../components/dashboard/Navbar";
import { Users } from "../components/dashboard/Users";

export function Dashboard() {
  return (
    <div>
      <Navbar />
      <Balance />
      <Users />
    </div>
  );
}

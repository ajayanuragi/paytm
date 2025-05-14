import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import api from "../../api/api";

export function Users({ userId }) {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const endpoint = filter ? `/user/bulk?filter=${filter}` : "/user/bulk";
      const res = await api.get(endpoint);
      const filteredUsers = res.data.users.filter(
        (user) => user._id && user._id !== userId
      );
      setUsers(filteredUsers);
    }
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    });
    return () => clearTimeout(debounceTimer);
  }, [filter, userId]);
  users.filter((user) => user._id !== userId);

  return (
    <div className="px-8 py-2">
      <h1 className="text-2xl my-2">Users</h1>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search Users..."
        className="w-full border p-2 border-gray-200 rounded-md"
      />
      <div className="my-4 ">
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          users.map((user) => <UserCard key={user._id} user={user} />)
        )}
      </div>
    </div>
  );
}

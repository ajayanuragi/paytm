import { UserCard } from "./UserCard";

export function Users() {
  return (
    <div className="px-8 py-2">
      <h1 className="text-2xl my-2">Users</h1>
      <input
        type="text"
        placeholder="Search Users..."
        className="w-full border p-2 border-gray-200 rounded-md"
      />
      <div className="my-4 ">
        <UserCard name={"John Doe"} />
        <UserCard name={"Alex Dunphy"} />
      </div>
    </div>
  );
}

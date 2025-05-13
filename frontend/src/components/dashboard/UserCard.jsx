export function UserCard({ name }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex gap-4 items-center">
        <div className="bg-gray-100 rounded-full h-14 w-14 p-4">
          {" "}
          {initials}
        </div>
        <div className="font-black"> {name}</div>
      </div>
      <button className="bg-black p-4 text-white rounded-md">
        {" "}
        Send Money
      </button>
    </div>
  );
}

import { useNavigate } from "react-router";
export function UserCard({ user }) {
  const navigate = useNavigate();
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const initials = (() => {
    const names = fullName.split(" ").filter(Boolean);
    return names.length > 0
      ? names.map((word) => word[0].toUpperCase()).join("")
      : "?";
  })();

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex gap-4 items-center">
        <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">{initials}</div>
        <div className="font-black"> {fullName}</div>
      </div>
      <button
        className="bg-black p-4 text-white rounded-md"
        onClick={() => {
          navigate(`/send/${user._id}`, {
            state:{
              firstName:user.firstName,
              lastName: user.lastName
            }
          });
        }}
      >
        Send Money
      </button>
    </div>
  );
}

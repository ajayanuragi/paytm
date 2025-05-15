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
    <div className="flex justify-between items-center md:my-2">
      <div className="flex gap-2 md:gap-4 items-center">
        <div className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center text-xs md:text-base md:h-10 md:w-10">{initials}</div>
        <div className="font-black text-sm md:text-base"> {fullName}</div>
      </div>
      <button
        className="bg-black text-xs md:text-base p-2 md:text-l my-1 text-white rounded-md"
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

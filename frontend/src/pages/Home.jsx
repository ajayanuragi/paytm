import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="text-6xl mb-6">Payments App</div>

      <div className="flex gap-4 items-center text-white text-xl">
        <div
          onClick={() => {
            navigate("/signup");
          }}
          className="bg-black px-6 py-3 rounded cursor-pointer hover:bg-gray-800 transition"
        >
          Sign Up
        </div>
        <div
          onClick={() => {
            navigate("/signin");
          }}
          className="bg-black px-6 py-3 rounded cursor-pointer hover:bg-gray-800 transition"
        >
          Sign In
        </div>
      </div>
    </div>
  );
}

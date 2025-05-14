import { useState } from "react";
import { Button } from "../components/form/Button";
import { Heading } from "../components/form/Heading";
import { SubHeading } from "../components/form/SubHeading";
import { InputBox } from "../components/form/InputBox";
import { Link, useNavigate } from "react-router";
import api from "../api/api";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleSignin() {
    setError("");
    if (!username || !password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      const res = await api.post("/user/signin", {
        username,
        password,
      });
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="p-8 shadow-xl rounded-2xl w-1/3 bg-white">
        <div className="text-center">
          <Heading text={"Sign In"} />
          <SubHeading text={"Enter your credentials to access your account"} />
        </div>

        <div className="mt-4 mb-4">
          <InputBox
            labelFor={"username"}
            name={"Username"}
            placeholder={"johndoe"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            labelFor={"password"}
            name={"Password"}
            type={"password"}
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button text={"Sign In"} onClick={handleSignin} />
          <p className="text-center mt-4 text-slate-500">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-black underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "../components/form/Button";
import { Heading } from "../components/form/Heading";
import { InputBox } from "../components/form/InputBox";
import { SubHeading } from "../components/form/SubHeading";
import { Link, useNavigate } from "react-router";
import api from "../api/api";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");

    if (!firstName || !lastName || !password || !username) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await api.post("/user/signup", {
        firstName,
        lastName,
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="p-8 shadow-xl rounded-2xl w-1/3 bg-white">
        <div className="text-center">
          <Heading text={"Sign Up"} />
          <SubHeading text={"Enter your information to create an account"} />
        </div>

        <div className="mt-4 mb-4">
          <InputBox
            labelFor={"firstName"}
            name={"First Name"}
            placeholder={"John"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            labelFor={"lastName"}
            name={"Last Name"}
            placeholder={"Doe"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <Button text={"Sign Up"} onClick={handleSignup} />
          <p className="text-center mt-4 text-slate-500">
            Already have an account? <Link to={"/signin"} className="text-black underline">Login</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

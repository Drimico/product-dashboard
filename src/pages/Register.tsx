import { useState } from "react";
import type { RegisterData } from "../api/types";
import { login, register } from "../api/requests";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUserStore } from "../stores/useUserStore";
import ImagePlaceholder from "../components/core/ImagePlaceholder";
import ToggleTheme from "@/components/core/ToggleTheme";
const Register = () => {
  const { setUser, addTokens } = useUserStore();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { validateLogin } = useAuth({
    setEmailErrorMessage,
    setPasswordErrorMessage,
    setNameErrorMessage,
  });
  const navigate = useNavigate();

  const onRegister = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setNameErrorMessage("");

    const isValid = await validateLogin(email, password, name);
    if (!isValid) return;

    setIsLoading(true);
    const payload: RegisterData = {
      email,
      name,
      password,
      avatar: avatar || "https://i.pravatar.cc/300",
      role: "customer",
    };
    try {
      const createdUser = await register(payload);
      const loginResp = await login({ email, password });

      setUser(createdUser);
      addTokens(loginResp.access_token, loginResp.refresh_token);

      navigate("/");
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        const errMessage = err.message;
        const errStatus = errMessage.includes("400");
        if (errStatus) {
          setEmailErrorMessage("Malformed request. Please check your input.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const card = e.currentTarget;
    const x = e.pageX - card.offsetLeft;
    const y = e.pageY - card.offsetTop;
    setPosition({ x, y });
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={onRegister}
        style={
          {
            "--x": `${position.x}px`,
            "--y": `${position.y}px`,
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        className="w-240 h-180 flex flex-col justify-evenly items-center rounded-3xl radial-overlay text-(--text) bg-(--gradient) border border-(--border) shadow-(--shadow-l) relative"
      >
        <div className="text-6xl font-raleway">Register</div>
        <div className="flex justify-around items-center w-full h-140">
          <div className="w-100 h-100">
            <ImagePlaceholder onImageUpload={(url) => setAvatar(url)} />
          </div>
          <div className="flex flex-col justify-evenly h-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-2xl font-raleway">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-(--bg-light) w-100 p-4 rounded-full focus:outline-none text-xl shadow-(--shadow-l) border-t-2 border-t-white"
                disabled={isLoading}
              />
              {nameErrorMessage !== "" && <span className="text-red-500">{nameErrorMessage}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-2xl font-raleway">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-100 p-4 rounded-full focus:outline-none text-xl shadow-(--shadow-l) border-t-2 border-t-white"
                disabled={isLoading}
              />
              {emailErrorMessage !== "" && (
                <span className="text-red-500">{emailErrorMessage}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-2xl font-raleway">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-100 p-4 rounded-full focus:outline-none text-xl shadow-(--shadow-l) border-t-2 border-t-white"
              />
              {passwordErrorMessage !== "" && (
                <span className="text-red-500">{passwordErrorMessage}</span>
              )}
            </div>
            <button className="text-2xl font-raleway bg-(--bg-light) text-(--text) hover:bg-(--highlight) hover:text-white/90 w-50 p-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 shadow-(--shadow-l) border-t-2 border-t-white">
              Submit
            </button>
            <div className="text-2xl flex flex-col font-raleway text-(--text-muted)">
              Have an account?{" "}
              <Link to="/login" className="text-(--secondary) underline w-fit">
                Login
              </Link>
            </div>
          </div>
        </div>
        <span className="absolute left-[40%] bottom-[7%] w-0">
          <ToggleTheme />
        </span>
      </form>
    </div>
  );
};

export default Register;

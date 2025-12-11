import { useState } from "react";
import type { LoginData } from "../api/types";
import { login } from "../api/requests";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUserStore } from "@/stores/useUserStore";
import ToggleTheme from "@/components/core/ToggleTheme";

const Login = () => {
  const { deleteTokens, addTokens } = useUserStore();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { validateLogin } = useAuth({ setEmailErrorMessage, setPasswordErrorMessage });
  const navigate = useNavigate();

  const onLogin = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setEmailErrorMessage("");
    setPasswordErrorMessage("");

    const isValid = await validateLogin(email, password);

    if (!isValid) return;
    deleteTokens();
    setIsLoading(true);
    const payload: LoginData = {
      email,
      password,
    };
    try {
      const data = await login(payload);
      addTokens(data.access_token, data.refresh_token);

      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        const errMessage = err.message;

        if (errMessage) {
          const lowerMessage = errMessage.toLowerCase();
          if (lowerMessage.includes("email")) {
            setEmailErrorMessage(errMessage);
          } else if (lowerMessage.includes("password")) {
            setPasswordErrorMessage(errMessage);
          } else {
            setEmailErrorMessage(errMessage);
          }
        }
      }
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
        onSubmit={onLogin}
        style={{ "--x": `${position.x}px`, "--y": `${position.y}px` } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        className="w-150 h-150 flex flex-col justify-evenly items-center rounded-3xl radial-overlay text-(--text) bg-(--gradient) border border-(--border) shadow-(--shadow-l) relative"
      >
        <div className="text-5xl font-raleway">Login</div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-2xl font-raleway">
            Email
          </label>

          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-100 p-4 rounded-full text-xl border-t-2 border-t-white/90"
            disabled={isLoading}
          />
          {emailErrorMessage !== "" && <span className="text-red-500">{emailErrorMessage}</span>}
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
            className=" w-100 p-4 rounded-full text-xl border-t-2 border-t-white/90"
            disabled={isLoading}
          />
          {passwordErrorMessage !== "" && (
            <span className="text-red-500">{passwordErrorMessage}</span>
          )}
        </div>
        <button className="text-2xl font-raleway bg-(--bg-light) text-(--text) hover:bg-(--highlight) hover:text-white/90 w-50 p-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 shadow-(--shadow-l) border-t-2 border-t-white">
          Submit
        </button>
        <div className="text-2xl flex flex-col font-raleway text-(--text-muted)">
          Dont have an account?{" "}
          <Link to="/register" className="text-(--secondary) underline w-fit">
            Register
          </Link>
        </div>
        <span className="absolute left-[35%] bottom-[6%] w-0">
          <ToggleTheme />
        </span>
      </form>
    </div>
  );
};

export default Login;

import { Link } from "react-router-dom";
import ToggleTheme from "@/components/buttons/ToggleTheme";
import { useRadial } from "@/hooks/useRadial";
import useLogin from "@/hooks/useLogin";

const Login = () => {
  const { handleMouseMove, position } = useRadial();
  const { errorMessages, onLogin, isLoading, loginForm, setLoginForm } = useLogin();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
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
            name="email"
            value={loginForm.email}
            onChange={handleInputChange}
            className="bg-(--bg-light) w-100 p-4 rounded-full focus:outline-none text-xl shadow-(--shadow-l) border-t-2 border-t-white/90"
          />
          {errorMessages.email !== "" && <span className="text-red-500">{errorMessages.email}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-2xl font-raleway">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleInputChange}
            className="bg-(--bg-light) w-100 p-4 rounded-full focus:outline-none text-xl shadow-(--shadow-l) border-t-2 border-t-white/90"
          />
          {errorMessages.password !== "" && <span className="text-red-500">{errorMessages.password}</span>}
        </div>
        <button
          disabled={isLoading}
          className="text-2xl font-raleway bg-(--bg-light) text-(--text) hover:bg-(--highlight) hover:transition-colors hover:duration-300 hover:ease-in-out w-50 p-2 rounded-full cursor-pointer shadow-(--shadow-l) border-t-2 border-t-white"
        >
          Submit
        </button>
        <div className="text-2xl flex flex-col font-raleway text-(--text-muted)">
          Dont have an account?{" "}
          <Link to="/register" className="text-(--secondary) underline w-fit">
            Register
          </Link>
        </div>
        <span className="absolute left-[35%] bottom-[6%] w-0">
          <ToggleTheme type="auth" />
        </span>
      </form>
    </div>
  );
};

export default Login;

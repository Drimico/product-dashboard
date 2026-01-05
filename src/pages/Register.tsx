import { Link } from "react-router-dom";

import ImagePlaceholder from "../components/core/ImagePlaceholder";
import ToggleTheme from "@/components/buttons/ToggleTheme";
import { useRadial } from "@/hooks/useRadial";
import useRegister from "@/hooks/useRegister";
const Register = () => {
  const { handleMouseMove, position } = useRadial();
  const { errorMessages, isLoading, onRegister, registerForm, setRegisterForm } = useRegister();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (url: string) => setRegisterForm((prev) => ({ ...prev, avatar: url }));

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
          <div className="relative w-100 h-100">
            <ImagePlaceholder onImageUpload={handleImageChange} />
            {errorMessages.avatar !== "" && <span className="text-red-500 absolute top-[105%] right-[35%]">{errorMessages.avatar}</span>}
          </div>
          <div className="flex flex-col justify-evenly items-center h-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-2xl font-raleway">
                Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                value={registerForm.name}
                onChange={handleInputChange}
                className="bg-(--bg-light) w-100 p-4 rounded-full focus:outline-none text-xl shadow-(--shadow-l) border-t-2 border-t-white"
              />
              {errorMessages.name !== "" && <span className="text-red-500">{errorMessages.name}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-2xl font-raleway">
                Email
              </label>
              <input
                name="email"
                type="text"
                id="email"
                value={registerForm.email}
                onChange={handleInputChange}
                className="bg-(--bg-light) w-100 p-4 rounded-full focus:outline-none text-xl shadow-(--shadow-l) border-t-2 border-t-white"
              />
              {errorMessages.email !== "" && <span className="text-red-500">{errorMessages.email}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-2xl font-raleway">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                value={registerForm.password}
                onChange={handleInputChange}
                className="bg-(--bg-light) w-100 p-4 rounded-full focus:outline-none text-xl shadow-(--shadow-l) border-t-2 border-t-white"
              />
              {errorMessages.password !== "" && <span className="text-red-500">{errorMessages.password}</span>}
            </div>
            <button
              disabled={isLoading}
              className="text-2xl font-raleway bg-(--bg-light) text-(--text) w-50 p-2 rounded-full cursor-pointer hover:bg-(--highlight) hover:transition-colors hover:duration-300 hover:ease-in-out shadow-(--shadow-l) border-t-2 border-t-white"
            >
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
          <ToggleTheme type="auth" />
        </span>
      </form>
    </div>
  );
};

export default Register;

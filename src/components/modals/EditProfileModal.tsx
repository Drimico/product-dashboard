import { useEffect, useState } from "react";
import ImagePlaceholder from "../core/ImagePlaceholder";
import { useUserStore } from "@/stores/useUserStore";
import { updateUserData } from "@/api/requests";
import { X } from "lucide-react";
interface EditProfileModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditProfileModal = ({ setIsOpen }: EditProfileModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const { user, setUser } = useUserStore();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar);
      setPassword(user.password);
    }
  }, [user]);

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setNameErrorMessage("");
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    const errors: Record<string, string> = {};
    if (!user) return;
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (location.pathname === "/register" && !name) {
      errors.name = "Name is required";
    }

    if (errors.email) {
      setEmailErrorMessage(errors.email);
    }
    if (errors.password) {
      setPasswordErrorMessage(errors.password);
    }
    if (errors.name && setNameErrorMessage) {
      setNameErrorMessage(errors.name);
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    const payload = {
      name,
      email,
      password,
      avatar: avatar || "https://i.pravatar.cc/300",
    };
    try {
      const response = await updateUserData(payload, user?.id);
      setUser(response);
      console.log(response);
    } catch (err: any) {
      console.error("Failed to update user data", err);
    }
    setIsOpen(false);
  };
  return (
    <div className="fixed flex items-center justify-center inset-0 bg-black/50 backdrop-blur-sm ">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-260 h-180 grid grid-cols-2 grid-rows-[100px_1fr] items-center place-items-center bg-(--bg) shadow-(--shadow-l) px-10 font-raleway text-(--text) "
      >
        <div className="flex justify-between text-4xl border-b-4 border-b-(--border) w-full col-span-2 ">
          <span>Edit Profile</span>
          <button onClick={() => setIsOpen(prev => !prev)} className="cursor-pointer w-fit h-fit transition-transform duration-300 hover:rotate-90">
            <X size={30} />
          </button>
        </div>
        <form
          onSubmit={updateUser}
          className="flex flex-col items-center justify-around w-100 h-full col-span-1 place-self-start"
        >
          <div className="flex flex-col justify-between  w-full h-20 text-2xl gap-2">
            <label htmlFor="name" className="w-full">
              Name
            </label>
            <input
              autoComplete="off"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-(--bg-light) w-full p-4 rounded-2xl focus:outline-none text-xl shadow-(--shadow-l) border-2 border-(--border)"
            />
            {nameErrorMessage !== "" && <span className="text-red-500">{nameErrorMessage}</span>}
          </div>
          <div className="flex flex-col  justify-between w-full h-20 text-2xl gap-2">
            <label htmlFor="email" className="w-full">
              Email
            </label>
            <input
              autoComplete="off"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-(--bg-light) w-full p-4 rounded-2xl focus:outline-none text-xl shadow-(--shadow-l) border-2 border-(--border)"
            />
            {emailErrorMessage !== "" && <span className="text-red-500">{emailErrorMessage}</span>}
          </div>
          <div className="flex flex-col  justify-between  w-full h-20 text-2xl gap-2">
            <label htmlFor="password" className="w-full">
              Password
            </label>
            <input
              autoComplete="off"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-(--bg-light) w-full p-4 rounded-2xl focus:outline-none text-xl shadow-(--shadow-l) border-2 border-(--border)"
            />
            {passwordErrorMessage !== "" && (
              <span className="text-red-500">{passwordErrorMessage}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-(--highlight) hover:bg-(--highlight-hover) hover:text-white/90 w-30 h-10 shadow-(--shadow-l) cursor-pointer text-2xl relative transition-colors ease-in-out duration-200"
          >
            Save
          </button>
        </form>
        <div className="w-110 h-110 col-span-1 self-start mt-15 ">
          <ImagePlaceholder
            initialImage={user?.avatar}
            onImageUpload={(url) => setAvatar(url)}
            type="profile"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

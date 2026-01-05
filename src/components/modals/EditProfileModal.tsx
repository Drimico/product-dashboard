import ImagePlaceholder from "../core/ImagePlaceholder";

import { X } from "lucide-react";
import useUpdateUser from "@/hooks/useUpdateUser";
import { useUserStore } from "@/stores/useUserStore";
interface EditProfileModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditProfileModal = ({ setIsOpen }: EditProfileModalProps) => {
  const { user } = useUserStore();
  const { errorMessages, isLoading, setUserForm, userForm, updateUser } = useUpdateUser({ setIsOpen });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (url: string) => setUserForm((prev) => ({ ...prev, avatar: url }));
  return (
    <div className="fixed flex items-center justify-center inset-0 bg-black/50 backdrop-blur-sm ">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-260 h-180 grid grid-cols-2 grid-rows-[100px_1fr] items-center place-items-center bg-(--bg) shadow-(--shadow-l) px-10 font-raleway text-(--text) "
      >
        <div className="flex justify-between text-4xl border-b-4 border-b-(--border) w-full col-span-2 ">
          <span>Edit Profile</span>
          <button onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer w-fit h-fit transition-transform duration-300 hover:rotate-90">
            <X size={30} />
          </button>
        </div>
        <form onSubmit={updateUser} className="flex flex-col items-center justify-around w-100 h-full col-span-1 place-self-start">
          <div className="flex flex-col justify-between  w-full h-20 text-2xl gap-2">
            <label htmlFor="name" className="w-full">
              Name
            </label>
            <input
              name="name"
              autoComplete="off"
              id="name"
              type="text"
              value={userForm.name}
              onChange={handleInputChange}
              className="bg-(--bg-light) w-full p-4 rounded-2xl focus:outline-none text-xl shadow-(--shadow-l) border-2 border-(--border)"
            />
            {errorMessages.name !== "" && <span className="text-red-500">{errorMessages.name}</span>}
          </div>
          <div className="flex flex-col  justify-between w-full h-20 text-2xl gap-2">
            <label htmlFor="email" className="w-full">
              Email
            </label>
            <input
              name="email"
              autoComplete="off"
              id="email"
              type="text"
              value={userForm.email}
              onChange={handleInputChange}
              className="bg-(--bg-light) w-full p-4 rounded-2xl focus:outline-none text-xl shadow-(--shadow-l) border-2 border-(--border)"
            />
            {errorMessages.email !== "" && <span className="text-red-500">{errorMessages.email}</span>}
          </div>
          <div className="flex flex-col  justify-between  w-full h-20 text-2xl gap-2">
            <label htmlFor="password" className="w-full">
              Password
            </label>
            <input
              name="password"
              autoComplete="off"
              id="password"
              type="password"
              value={userForm.password}
              onChange={handleInputChange}
              className="bg-(--bg-light) w-full p-4 rounded-2xl focus:outline-none text-xl shadow-(--shadow-l) border-2 border-(--border)"
            />
            {errorMessages.password !== "" && <span className="text-red-500">{errorMessages.password}</span>}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-(--highlight) hover:bg-(--highlight-hover) hover:text-white/90 w-30 h-10 shadow-(--shadow-l) cursor-pointer text-2xl relative transition-colors ease-in-out duration-200"
          >
            Save
          </button>
        </form>
        <div className="w-110 h-110 col-span-1 self-start mt-15 ">
          <ImagePlaceholder initialImage={user?.avatar} onImageUpload={handleImageChange} />
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

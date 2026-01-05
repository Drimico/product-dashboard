import { UserRound } from "lucide-react";
import ToggleTheme from "../buttons/ToggleTheme";
import Logout from "../buttons/Logout";
import { useNavigate } from "react-router-dom";
interface ProfileModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProfileModal = ({ setIsOpen }: ProfileModalProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => setIsOpen((prev) => !prev)} className="fixed inset-0 z-10" />
      <div className="absolute top-[110%] right-[7%] flex flex-col items-center justify-center w-60 h-60 bg-(--bg) font-raleway text-2xl text-(--text) px-2 shadow-(--shadow-l) border-t-white/50 border-t z-20">
        <div
          onClick={() => navigate("/profile")}
          className="w-full h-20  border-b-2 border-(--border) py-2"
        >
          <span className="flex items-center h-full hover:bg-(--highlight) cursor-pointer gap-2 px-2">
            <UserRound size={30} />
            Profile
          </span>
        </div>
        <div className="flex w-full items-center h-20 border-b-2 border-(--border) py-2 cursor-pointer">
          <ToggleTheme type="profile" />
        </div>
        <div className="flex items-center w-full h-20 py-2">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default ProfileModal;

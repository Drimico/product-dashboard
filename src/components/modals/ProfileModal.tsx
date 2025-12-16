import { UserRound } from "lucide-react";
import ToggleTheme from "../core/buttons/ToggleTheme";
import Logout from "../core/buttons/Logout";
import { useNavigate } from "react-router-dom";

const ProfileModal = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-60 h-60 bg-(--bg) font-raleway text-2xl text-(--text) px-2 shadow-(--shadow-l) border-t-white/50 border-t">
      <div
        onClick={() => navigate("/profile")}
        className="w-full h-40 gap-2 border-b-2 border-(--border) py-2"
      >
        <span className="flex items-center h-full hover:bg-(--bg-light) cursor-pointer gap-2 px-2">
          <UserRound size={30} />
          Profile
        </span>
      </div>
      <div className="flex w-full items-center h-40 gap-2 border-b-2 border-(--border) py-2 cursor-pointer">
        <ToggleTheme type="profile" />
      </div>
      <div className="w-full h-40 gap-2 py-2">
        <Logout />
      </div>
    </div>
  );
};

export default ProfileModal;

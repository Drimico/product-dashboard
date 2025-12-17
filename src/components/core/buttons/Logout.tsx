import { LogOut } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";

const Logout = () => {
  const { clearUser } = useUserStore();

  return (
    <button
      onClick={() => clearUser()}
      className="flex items-center w-full h-full hover:bg-(--bg-light) cursor-pointer gap-2 px-2"
    >
      <LogOut size={30} />
      Log Out
    </button>
  );
};

export default Logout;

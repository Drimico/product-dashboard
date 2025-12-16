import { LogOut } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";

const Logout = () => {
  const { deleteTokens } = useUserStore();

  return (
    <button
      onClick={() => deleteTokens()}
      className="flex items-center w-full h-full hover:bg-(--bg-light) cursor-pointer gap-2 px-2"
    >
      <LogOut size={30} />
      Log Out
    </button>
  );
};

export default Logout;

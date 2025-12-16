import { useUserStore } from "@/stores/useUserStore";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileModal from "../modals/ProfileModal";

const Navbar = () => {
  const location = useLocation();
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex w-full h-40 items-center justify-between font-raleway text-(--text) px-40 relative bg-(--bg) shadow-(--shadow-l)">
      <span className="text-3xl font-bold">Products List</span>

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="flex gap-4 justify-center items-center">
          <div className="flex flex-col items-end">
            <span className="font-bold">{user?.name}</span>
            <span className="text-(--text-muted)/50">{user?.email}</span>
          </div>
          <img
            className="size-15 rounded-full border-2 p-0.5 border-(--border)"
            src={user?.avatar}
          ></img>
        </div>

        <ChevronDown
          className={`transition-transform duration-400 ease-in-out transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-[110%] right-[7%] transition-transform  ">
          <ProfileModal />
        </div>
      )}
    </div>
  );
};

export default Navbar;

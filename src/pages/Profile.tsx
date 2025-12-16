import EditProfileModal from "@/components/modals/EditProfileModal";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";

const Profile = () => {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-screen h-screen flex flex-col font-raleway text-(--text) relative items-center">
      <div className="w-full h-80 relative bg-linear-(--profile-gradient) shadow-(--shadow-l)">
        <div className="absolute xxlg:top-[50%] left-[6%] p-2 rounded-3xl blur-bg xxlg:w-80 xxlg:h-80 xlg:w-60 xlg:h-60 w-50 h-50 top-[60%]">
          <img className="object-cover rounded-2xl w-full h-full" src={user?.avatar} alt="" />
        </div>
      </div>
      <div className="xxlg:w-290 xlg:w-250 lg:w-220 sm:w-150 h-180 bg-(--bg) mt-30 shadow-(--shadow-l) flex flex-col gap-15 px-20 py-5 xxlg:absolute xxlg:left-[25%] xxlg:top-[30%] xxlg:mt-10">
        <div className="text-4xl border-b-4 border-b-(--border) py-10">Profile Details</div>
        <div className="flex items-center w-auto h-20 border-b-2 border-b-(--border) text-2xl ">
          <span className="w-full">Name</span>
          <span className="w-full">{user?.name}</span>
        </div>
        <div className="flex items-center w-auto h-20 border-b-2 border-b-(--border) text-2xl ">
          <span className="w-full">Email</span>
          <span className="w-full">{user?.email}</span>
        </div>
        <div className="flex items-center w-auto h-20 border-b-2 border-b-(--border) text-2xl ">
          <span className="w-full">Password</span>
          <span className="w-full">{user?.password}</span>
        </div>
        <div className="w-full flex justify-between ">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-(--highlight) hover:bg-(--highlight-hover) hover:text-white/90 w-30 h-10 shadow-(--shadow-l) cursor-pointer text-2xl transition-colors ease-in-out duration-200"
          >
            Edit
          </button>
          <span className="text-xl text-(--text-muted)">
            Joined at: {new Date(user?.creationAt ?? "").toDateString()}
          </span>
        </div>
      </div>
      <div className="absolute left-[30%] top-[20%]">
        {isOpen && <EditProfileModal setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
};

export default Profile;

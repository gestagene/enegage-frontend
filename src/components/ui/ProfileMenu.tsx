import { userLogout } from "@/services/userLogout";
import { IoSettingsOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";

interface ProfileMenuProps {
  onLogout: () => void;
}
export default function ProfileMenu({ onLogout }: ProfileMenuProps) {
  return (
    <div className="relative z-10">
      <div className="z-1 absolute right-0 flex flex-col min-h-screen min-w-65 md:min-h-auto bg-white border-l border-b  rounded-b-lg shadow-lg border-gray-200 overflow-hidden ">
        <button className="hover:bg-gray-50 flex px-6 py-2">
          <div className="flex gap-2 items-center">
            <div></div>View Profile
          </div>
        </button>
        <button className="hover:bg-gray-50 flex px-6 py-2">
          <div className="flex gap-2 items-center">
            <IoSettingsOutline size={20} />
            Settings
          </div>
        </button>
        <button className="hover:bg-gray-50 flex px-6 py-2">
          <div className="flex gap-2 items-center">
            <GoQuestion size={20} />
            Help & Support
          </div>
        </button>
        <button
          onClick={async () => {
            await userLogout();
            onLogout();
          }}
          className="hover:bg-gray-50 flex px-6 py-2"
        >
          <div className="flex gap-2 items-center">
            <RiLogoutBoxLine size={20} />
            Log Out
          </div>
        </button>
      </div>
    </div>
  );
}

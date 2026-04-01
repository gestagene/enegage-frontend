import { userLogout } from "@/services/userLogout";
import { IoSettingsOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";

interface ProfileMenuProps {
  onLogout: () => void;
}
export default function ProfileMenu({ onLogout }: ProfileMenuProps) {
  return (
    <div className="relative">
      <div className="absolute right-0 flex flex-col min-h-screen min-w-65 md:min-h-auto bg-white border-l border-b  rounded-b-lg shadow-lg border-gray-200 overflow-hidden ">
        <button className="menu-item">
          <div className="menu-content">View Profile</div>
        </button>
        <button className="menu-item">
          <div className="menu-content">
            <IoSettingsOutline size={20} />
            Settings
          </div>
        </button>
        <button className="menu-item">
          <div className="menu-content">
            <GoQuestion size={20} />
            Help & Support
          </div>
        </button>
        <button
          onClick={async () => {
            await userLogout();
            onLogout();
          }}
          className="menu-item "
        >
          <div className="menu-content">
            <RiLogoutBoxLine size={20} />
            Log Out
          </div>
        </button>
      </div>
    </div>
  );
}

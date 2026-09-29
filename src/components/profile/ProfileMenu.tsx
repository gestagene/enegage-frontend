import { userLogout } from "@/services/authService";
import { IoSettingsOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

interface ProfileMenuProps {
  menuRef: React.Ref<HTMLDivElement | null>;
  onLogout: () => void;
}
export default function ProfileMenu({ onLogout, menuRef }: ProfileMenuProps) {
  return (
    <div
      ref={menuRef}
      className="sm:text-sm z-1 fixed right-0 top-13.5 flex flex-col min-h-screen min-w-65 md:min-h-auto bg-white border-l border-b  rounded-b-lg shadow-lg border-gray-200 overflow-hidden"
    >
      <button className="hover:bg-gray-200 hover:cursor-pointer flex px-6 py-2">
        <div className="flex gap-2 items-center">
          <div></div>View Profile
        </div>
      </button>
      <NavLink
        className={"hover:bg-gray-200 hover:cursor-pointer flex px-6 py-2"}
        to="settings"
      >
        <button>
          <div className="flex gap-2 items-center">
            <IoSettingsOutline size={20} />
            Settings
          </div>
        </button>
      </NavLink>
      <button className="hover:bg-gray-200 hover:cursor-pointer flex px-6 py-2">
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
        className="hover:bg-gray-200 hover:cursor-pointer flex px-6 py-2"
      >
        <div className="flex gap-2 items-center">
          <RiLogoutBoxLine size={20} />
          Log Out
        </div>
      </button>
    </div>
  );
}

import { RiHome2Line } from "react-icons/ri";
import { MdOutlineBarChart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: () => void;
}
export default function Sidebar({ onCollapse, isCollapsed }: SidebarProps) {
  return (
    <aside
      className={`h-screen self-start sticky top-0 font-light hidden xl:flex shrink border-r border-gray-200  bg-white transition-all duration-100 ${
        isCollapsed ? "w-10 pl-3" : "w-60 pl-3"
      }`}
    >
      {!isCollapsed && (
        <nav className="mt-5 w-full text-sm self-start sticky top-19">
          <ul className="">
            <li className="sidebar-element flex space-x-2">
              <NavLink to="/" className="flex space-x-2 w-full h-full">
                <div>
                  <RiHome2Line size={20} />
                </div>
                <div>Home</div>
              </NavLink>
            </li>
            <li className="sidebar-element flex space-x-2">
              <NavLink to="popular" className="flex space-x-2 w-full h-full">
                <div>
                  <MdOutlineBarChart size={20} />
                </div>
                <div>Popular</div>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      <button
        title={isCollapsed ? "Expand Navigation" : "Collapse Navigation"}
        onClick={onCollapse}
        className={`hover:cursor-pointer hover:bg-gray-300 self-start fixed top-19 max-w-10 max-h-8 hidden xl:block bg-white border-gray-200 rounded-full border py-1 px-1.5 shadow-2xl ${isCollapsed ? "left-5.5" : "left-56"}`}
      >
        <RxHamburgerMenu size={20} />
      </button>
    </aside>
  );
}

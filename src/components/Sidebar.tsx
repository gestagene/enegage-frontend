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
    <>
      <aside
        className={`relative font-light h-screen hidden md:flex shrink border-r border-gray-200  bg-white transition-all duration-100 ${
          isCollapsed ? "w-15 px-3" : "w-90 px-3"
        }`}
      >
        {!isCollapsed && (
          <nav className="mt-5 w-full">
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
      </aside>
      <button
        title={isCollapsed ? "Expand Navigation" : "Collapse Navigation"}
        onClick={onCollapse}
        className="hover:cursor-pointer -left-4 top-20 relative max-w-10 max-h-8 hidden md:flex bg-white border-gray-200 rounded-full border py-1 px-1.5 justify-center items-center shadow-2xl "
      >
        <RxHamburgerMenu size={20} />
      </button>
    </>
  );
}

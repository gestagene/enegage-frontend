import { RiHome2Line } from "react-icons/ri";
import { MdOutlineBarChart } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <aside className="text-sm font-light h-screen hidden lg:block overflow-hidden w-64 mx-5 shrink border-r border-gray-200">
        <nav className="mt-5 ">
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
      </aside>
    </>
  );
}

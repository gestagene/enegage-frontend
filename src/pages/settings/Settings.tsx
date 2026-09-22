import { NavLink, Outlet } from "react-router-dom";

export default function Settings() {
  return (
    <div className="relative flex flex-col gap-3 p-4">
      <div className="text-2xl font-bold">Settings</div>
      {/*Navigations*/}
      <div className="flex text-[0.8rem] gap-2">
        <NavLink
          className={({ isActive }) =>
            `${isActive && "border-b-2 border-black/75"} p-1`
          }
          to="account"
        >
          Account
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive && "border-b-2 border-black/75"} p-1`
          }
          to="profile"
        >
          Profile
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

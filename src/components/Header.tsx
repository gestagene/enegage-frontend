import { CiSearch } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { RiNotification2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

interface HeaderProps {
  query: string;
  isLoggedIn: boolean;
  onSearch: (query: string) => void;
  onLoginClick: () => void;
}

export default function Header({
  onSearch,
  isLoggedIn,
  onLoginClick,
}: HeaderProps) {
  return (
    <>
      <header className="border-b border-gray-200 sticky text-sm">
        <div className="flex justify-between items-center mx-5 my-2">
          <div className="md:hidden mr-5">
            <RxHamburgerMenu />
          </div>
          <div className="hidden md:block">
            <h1 className=" text-yellow-500/90 text-3xl font-bold font-[Outfit] subpixel-antialiased">
              enegage
            </h1>
          </div>
          <form action="" className="w-1/2 md:w-1/3">
            <label className="w-full items-center border rounded-gradient-border rounded-full p-2 flex">
              <CiSearch size={20} />
              <input
                type="search"
                placeholder="Find anything"
                className="pl-2 w-full outline-none"
                onChange={(e) => onSearch(e.target.value)}
              />
            </label>
          </form>
          <div>
            {!isLoggedIn ? (
              <button
                onClick={onLoginClick}
                className="rounded-full p-2 px-4 text-white bg-green-900/90"
              >
                Log In
              </button>
            ) : (
              <div className="flex justify-between space-x-2 items-center">
                <button
                  type="button"
                  className="hover:bg-gray-200 hover:cursor-pointer scale-100 text-[0.80rem] font-semibold flex p-1.5 rounded-full justify-center items-center"
                >
                  <IoCreateOutline size={20} className="mr-1.5 mb-0.5" />
                  Create
                </button>
                <RiNotification2Line
                  size={30}
                  className="hover:bg-gray-200 hover:cursor-pointer rounded-2xl p-1.5"
                />
                <CgProfile size={30} className="ml-2" />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
//CgProfile icon is a placeholder for the actual profile picture of the user.

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaGithub } from "react-icons/fa"; // Import icons from react-icons

const Header = () => {
  const pathName = usePathname();
  const showHeader = ["/", "/generate"].includes(pathName);

  return (
    <>
      {showHeader && (
        <header className="flex flex-col md:flex-row items-center justify-between fixed top-6 w-[80vw] right-[10vw] bg-[#F7F8FA] p-4 rounded-full shadow-lg border border-gray-200 z-50">
          {/* Logo */}
          <div className="mb-2 md:mb-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#4A4E69] text-center md:text-left">
              <Link href="/">Linkify</Link>
            </h1>
          </div>

          {/* Buttons */}
          <div className="md:flex-row gap-2 flex align-middle items-center">
            {/* hover:bg-gray-300 transition-all duration-200 */}
            <button className="px-3 m-1 py-2 h-10 text-sm lg:text-base bg-[#D3D3D3] text-[#4A4E69] font-semibold rounded-lg ">
              Log In
            </button>
            {/* hover:bg-[#6B705C] transition-all duration-200 */}
            <button className="px-3 m-1 py-2 h-10 text-sm lg:text-base bg-[#9A8C98] text-white font-semibold rounded-lg ">
              Sign Up Free
            </button>
            <Link
              href="https://github.com/surajgharpankar28/Linkify"
              target="_blank"
            >
              <button className="px-3 m-1 py-2 h-10 text-sm lg:text-base bg-dark-gray text-white font-semibold rounded-lg hover:bg-[#743223] transition-all duration-200">
                <FaGithub className="text-white text-xl " />
              </button>
            </Link>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;

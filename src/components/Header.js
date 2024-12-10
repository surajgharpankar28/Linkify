"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathName = usePathname();
  const showHeader = ["/", "/generate"].includes(pathName);

  return (
    <>
      {showHeader && (
        <header className="flex items-center justify-between fixed top-6 w-[80vw] right-[10vw] bg-[#F7F8FA] p-4 rounded-full shadow-lg border border-gray-200 z-50">
          {/* Logo */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#4A4E69]">
              <Link href="/">Linkify</Link>
            </h1>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm lg:text-base bg-[#D3D3D3] text-[#4A4E69] font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200">
              Log In
            </button>
            <button className="px-4 py-2 text-sm lg:text-base bg-[#9A8C98] text-white font-semibold rounded-lg hover:bg-[#6B705C] transition-all duration-200">
              Sign Up Free
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;

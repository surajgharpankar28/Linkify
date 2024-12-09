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
        <div className="flex items-center border border-black fixed justify-between top-10 bg-white p-2 w-[80vw] right-[10vw] rounded-full px-6">
          <div>
            <h1 className="flex items-center text-3xl poppins-semibold-italic">
              {" "}
              <Link href="/">Linkify</Link>
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="border bg-gray-300 font-semibold p-2 rounded-lg">
              Log In
            </button>
            <button className="border bg-gray-800 font-semibold text-white p-2 rounded-lg">
              Sign up free
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

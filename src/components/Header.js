import React from "react";
import { Link } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-white p-2 w-[80vw] absolute top-10 right-[10vw] rounded-full px-6">
      <div>
        <h1 className="flex items-center text-3xl poppins-semibold-italic">
          <Link className="mx-1" />
          Linkify
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
  );
};

export default Header;

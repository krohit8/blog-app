import { useAuth } from "@/context/AuthContext";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
    const { logout}  = useAuth()
  return (
    <div className="border-b flex justify-between px-4 sm:px-6 lg:px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer text-2xl sm:text-3xl lg:text-4xl font-bold"
      >
        BLOGG'R
      </Link>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link to={`/publish`}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 hover:cursor-pointer  focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-2.5 text-center"
          >
            <span className="hidden sm:inline">New</span>
            <span className="sm:hidden">+</span>
          </button>
        </Link>
        <button
          type="button"
          onClick={() => logout()}
          className="text-white bg-[#ff637e]  hover:bg-[#ffa1ad] hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-2.5 text-center"
        >
          <span className="hidden sm:inline">Logout</span>
        </button>
        <Avatar size={"big"} name="Rohit" />
      </div>
    </div>
  );
};

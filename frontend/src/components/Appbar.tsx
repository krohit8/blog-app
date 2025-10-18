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
          className="text-white sm:bg-[#ff637e]  sm:hover:bg-[#ffa1ad] hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-2.5 text-center"
        >
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden"><img src="https://imgs.search.brave.com/VK6CnPn7P-5cP8msjR18T2Wvuf57xIJCuHU4iyvm0ac/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzMzLzUwLzg2/LzM2MF9GXzE1MzM1/MDg2ODNfdTlZZ2hN/dTBZSFJ2ZXE0Tkxq/dVUwdVY2ZmNWNnQz/ZnYuanBn" className="w-11 h-11 "/></span>
        </button>
        <Avatar size={"big"} name="Rohit" />
      </div>
    </div>
  );
};

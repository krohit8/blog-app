import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: Date;
}
export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex flex-col max-w-4xl mx-auto items-center px-4 sm:px-6 lg:px-0">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="flex text-sm sm:text-base lg:text-lg h-12 items-center mt-2 w-full max-w-3xl">
          <Avatar name={authorName} />
          <p className="font-normal pl-2 sm:pl-4 py-1">
            <span className="hidden sm:inline">{authorName}.</span>
            <span className="sm:hidden">{authorName}</span>
            <span className="text-slate-600 ml-2 sm:ml-4 text-xs sm:text-sm">
              {publishedDate.toDateString()}
            </span>
          </p>
        </div>
        <div className="flex flex-col w-full max-w-3xl">
          <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl leading-tight">{title}</h1>
          <p className="py-2 font-semibold text-gray-700 text-sm sm:text-base">
            {content.slice(0, 120) + (content.length > 120 ? "..." : "")}
          </p>
        </div>
        <div className="w-full max-w-3xl text-slate-400 text-xs sm:text-sm">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
        <div className="w-full mt-6 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>
    </Link>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-semibold text-white `}
      >
        {name?.[0] || "B"}
      </span>
    </div>
  );
}

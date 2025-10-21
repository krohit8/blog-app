import { type Blog } from "@/hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="w-full h-full mt-5">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row h-full mx-auto px-4">
          <div className="flex flex-col w-full lg:w-4/5 pt-4 lg:px-18">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{blog.title}</div>
            <div className="text-base sm:text-lg lg:text-xl font-semibold text-slate-700 mt-4 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
          <div className="hidden lg:block h-screen w-px bg-gray-300 mx-6"></div>
          <div className="h-full flex w-full lg:w-1/5 pl-0 lg:pl-7 mt-8 lg:mt-0">
            <div className="flex-col w-full">
              <div className="text-xl lg:text-2xl font-semibold">Author</div>
              <div className="flex py-2">
                <div className="pr-2">
                  <Avatar name={blog.author.name || "Anonymous"} />
                </div>
                <div className="text-semibold">
                  {blog.author.name || "Anonymous"}
                </div>
              </div>
              <div className="text-gray-700 text-sm lg:text-base">
                The only way to do great work is to love what you do
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

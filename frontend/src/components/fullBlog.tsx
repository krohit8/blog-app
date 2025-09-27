import { type Blog } from "@/hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="w-full h-full mt-5">
        <div className="w-full max-w-7xl   flex h-full mx-auto px-4">
          <div className="flex flex-col w-4/5 pt-4">
            <div className="text-4xl font-bold">{blog.title}</div>
            <div className="text-xl font-semibold text-slate-700 mt-4">
              {blog.content}
            </div>
          </div>
          <div className="h-screen w-px bg-gray-300 mx-6"></div>
          <div className="h-full flex w-1.5/5 pl-7">
            <div className="flex-col mt-12 w-full">
              <div className="text-2xl font-semibold">Author</div>
              <div className="flex py-2">
                <div className="pr-2">
                  <Avatar name={blog.author.name || "Anonymous"} />
                </div>
                <div className="text-semibold">
                  {blog.author.name || "Anonymous"}
                </div>
              </div>
              <div className="text-gray-700">
                The only way to do great work is to love what you do
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

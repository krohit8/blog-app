import { Appbar } from "@/components/Appbar";
import { BlogCard } from "@/components/BlogCard";
import { BlogSkeleton } from "@/components/blogSkeleton";
import { useBlogs } from "@/hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <Appbar />
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }
  console.log(blogs[0].author.name);
  return (
    <div className=" h-screen w-full  ">
      <div className="mb-8">
        <Appbar />
      </div>
      <div>
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author ? blog.author.name : "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={new Date()}
          />
        ))}
      </div>
    </div>
  );
};

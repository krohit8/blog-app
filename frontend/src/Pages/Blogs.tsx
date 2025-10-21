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
        <div className="space-y-4">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full">
      <div className="mb-4 sm:mb-8">
        <Appbar />
      </div>
      <div className="space-y-4 sm:space-y-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author ? blog.author.name : "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={new Date(blog.createdAt)}
          />
        ))}
      </div>
    </div>
  );
};

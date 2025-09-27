import { FullBlog } from "@/components/fullBlog";
import { useBlog } from "@/hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return <div>loading....</div>;
  }
  if(!blog){
    return <div>error</div>
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};

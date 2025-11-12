import { Appbar } from "../components/Appbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type ChangeEvent, useEffect, useState } from "react";
import { useBlog, useCreateBlog, useUpdateBlog } from "@/react-query/queries";
import toast from "react-hot-toast";
import { Spinner } from "@/components/Spinner";

export default function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  const { data: existingBlog, isLoading: loadingBlog } = useBlog(editId || "");

  const { mutate: createBlog, isPending: isCreating } = useCreateBlog();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog();
  const isPending = isCreating || isUpdating;
  useEffect(() => {
    if (isEditMode && existingBlog) {
      setTitle(existingBlog.title);
      setDescription(existingBlog.content);
    }
  }, [existingBlog, isEditMode]);

  const handlePublish = () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and content are required");
      return;
    }

    if (isEditMode && editId) {
      updateBlog(
        {
          id: editId,
          title,
          content: description,
        },
        {
          onSuccess: () => {
            toast.success("Blog updated successfully!");
            navigate(`/blog/${editId}`);
          },
          onError: (error) => {
            console.error("Failed to update:", error);
            toast.error("Failed to update blog");
          },
        },
      );
    } else {
      createBlog(
        { title, content: description },
        {
          onSuccess: (data) => {
            toast.success("Blog published successfully!");
            navigate(`/blog/${data.id}`);
          },
          onError: (error) => {
            console.error("Failed to publish:", error);
            toast.error("Failed to publish blog");
          },
        },
      );
    }
  };
  if (isEditMode && loadingBlog) {
    return (
      <div>
        <Appbar />
        <div className="flex h-screen justify-center items-center">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-4 sm:pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 sm:p-2.5"
            placeholder="Title"
            value={title}
          />

          <TextEditor
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button
            onClick={handlePublish}
            disabled={isPending}
            type="submit"
            className="mt-4 inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending
              ? isEditMode
                ? "Updating"
                : "Publishing..."
              : isEditMode
                ? "Update Post"
                : "Publish post"}
          </button>

          <button
            onClick={() => navigate(-1)}
            type="button"
            className="mt-4 inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function TextEditor({
  onChange,
  value,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between border rounded-lg">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              value={value}
              id="editor"
              rows={6}
              className="focus:outline-none block w-full px-3 py-2 text-sm sm:text-base text-gray-800 bg-white border-0 rounded-lg resize-none"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

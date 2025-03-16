import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "./components/Editor";

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSave = () => {
    console.log({ title, description, content, image });
    navigate("/admin/blog");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Chỉnh sửa bài viết" : "Viết bài mới"}
        </h2>

        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="URL hình ảnh"
        />

        <label className="block text-sm font-medium text-gray-700">Nội dung bài viết</label>
        <Editor value={content} onChange={setContent} />

        <button
          onClick={handleSave}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Lưu bài viết
        </button>
      </div>
    </div>
  );
};

export default BlogForm;

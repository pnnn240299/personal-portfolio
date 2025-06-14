import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useDataCRUD from "@/lib/useDataCRUD";

const ExternalLinkForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const { createItem, updateItem, getItem, loading, error, success } = useDataCRUD("external_links");

  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    url: "",
  });

  useEffect(() => {
    if (isEditing) {
      (async () => {
        const data = await getItem(id);
        if (data) setFormData(data);
      })();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (isEditing) {
      await updateItem(id, formData);
    } else {
      await createItem(formData);
    }
    navigate("/admin/external_link");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Chỉnh sửa bài viết" : "Viết bài mới"}
        </h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Icon</label>
        <textarea
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">URL</label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="URL hình ảnh"
        />

        <button
          onClick={handleSave}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu bài viết"}
        </button>
      </div>
    </div>
  );
};

export default ExternalLinkForm;

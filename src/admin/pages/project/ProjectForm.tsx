import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFormState from "../../../hooks/useFormState";
import useDataCRUD from "../../../lib/useDataCRUD";
import Editor from "./components/Editor";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const {
    createItem,
    updateItem,
    getItem,
    loading,
    error,
  } = useDataCRUD("projects", {
    provider: import.meta.env.VITE_DATA_PROVIDER || "supabase",
  });

  const { formData, setFormData, handleChange, setField } = useFormState({
    name: "",
    skill: "",
    description: "",
    repo_url: "",
    image_url: "",
    live_url: "",
  });

  useEffect(() => {
    if (isEditing) {
      (async () => {
        const data = await getItem(id);
        if (data) setFormData(data);
      })();
    }
  }, [id]);

  const handleSave = async () => {
    if (isEditing) {
      await updateItem(id, formData);
    } else {
      await createItem(formData);
    }
    navigate("/admin/project");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <label className="block text-sm font-medium text-gray-700">Tên dự án</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Link demo</label>
        <input
          type="text"
          name="live_url"
          value={formData.live_url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <textarea
          name="skill"
          value={formData.skill}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Repo</label>
        <Editor value={formData.repo_url} onChange={(value) => setField("repo_url", value)} />

        <button
          onClick={handleSave}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;

import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFormState from "@/hooks/useFormState";
import useDataCRUD from "@/lib/useDataCRUD";
import Editor from "./components/Editor";
import Select from "react-select";
import projectModel from "@/models/supabaseQuery/project.js";
import { GetExternalLinks } from "@/types/external_links";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const {
    data: projectData,
    createItem: createProject,
    updateItem: updateProject,
    getItem: getProject,
    loading,
    error,
  } = useDataCRUD("projects", projectModel);

  const {
    data: allExternalLinks = [],
  } = useDataCRUD<GetExternalLinks>("external_links");

  const {
    createItem: addExternalLinks,
    deleteItem: removeExternalLinks,
  } = useDataCRUD("project_external_links");

  const { formData, setFormData, handleChange, setField } = useFormState({
    name: "",
    skill: "",
    description: "",
    repo_url: "",
    image_url: "",
    live_url: "",
    external_links: [],
  });

  // Load dữ liệu project khi edit
  useEffect(() => {
    if (isEditing) {
      (async () => {
        const project = await getProject(id);
        if (project) setFormData(project);
      })();
    }
  }, [id]);

  // Format options cho react-select
  const externalLinkOptions = allExternalLinks.map(link => ({
    value: link.id,
    label: link.title,
  }));

  // Xử lý cập nhật project + external_links
  const handleSave = async () => {
    const { external_links, ...projectFields } = formData;
    const selectedLinkIds = external_links.map(link => link.id);

    const savedProject = isEditing
      ? await updateProject(id, projectFields)
      : await createProject(projectFields);

    if (!savedProject) return;

    await syncProjectExternalLinks(savedProject.id, selectedLinkIds);

    // navigate("/admin/project"); // Optional
  };

  // Đồng bộ bảng project_external_links
  const syncProjectExternalLinks = useCallback(async (projectId: number, externalLinkIds: number[]) => {
    try {
      // Xóa tất cả các liên kết cũ
      await removeExternalLinks(projectId, "project_id");

      // Chèn các external_link mới
      if (externalLinkIds.length > 0) {
        const dataToInsert = externalLinkIds.map(linkId => ({
          project_id: projectId,
          external_link_id: linkId,
        }));
        const { error: insertError } = await addExternalLinks(dataToInsert);
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error("Lỗi khi lưu external links:", error);
    }
  }, [addExternalLinks, removeExternalLinks]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        {/* Tên dự án */}
        <label className="block text-sm font-medium text-gray-700">Tên dự án</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Mô tả */}
        <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Ảnh đại diện */}
        <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Link demo */}
        <label className="block text-sm font-medium text-gray-700">Link demo</label>
        <input
          type="text"
          name="live_url"
          value={formData.live_url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Kỹ năng */}
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <textarea
          name="skill"
          value={formData.skill}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Repo */}
        <label className="block text-sm font-medium text-gray-700">Repo</label>
        <Editor value={formData.repo_url} onChange={(value) => setField("repo_url", value)} />

        {/* External Links */}
        <label className="block text-sm font-medium text-gray-700 mt-4">External Links</label>
        <Select
          isMulti
          name="external_links"
          options={externalLinkOptions}
          value={externalLinkOptions.filter(opt =>
            formData.external_links.some(link => link.id === opt.value)
          )}
          onChange={(selectedOptions) => {
            const selectedLinks = allExternalLinks.filter(link =>
              selectedOptions.map(opt => opt.value).includes(link.id)
            );
            setField("external_links", selectedLinks);
          }}
          className="mb-4"
          classNamePrefix="select"
        />

        {/* Save button */}
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

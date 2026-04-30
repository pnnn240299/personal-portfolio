'use client'

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import useDataCRUD from "@/lib/useDataCRUD";
import ProjectForm from "../../components/ProjectForm";
import slugify from 'slugify';

const ProjectEdit = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { updateItem, getItem, loading, error, success } = useDataCRUD("projects");
  const id = use(params).id;

  const [initialData, setInitialData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getItem(id);
        if (data) {
          // Load selected technologies for this project via API
          const response = await fetch(`/api/admin/project-external-links?projectId=${id}`);
          const projectTechnologies = await response.json();
          const selectedTechIds = projectTechnologies.map((pt: any) => pt.external_link_id);
          
          // Load existing media for this project
          const mediaResponse = await fetch(`/api/admin/media?entityId=${id}&entityType=project&type=thumbnail`);
          const mediaData = await mediaResponse.json();
          const imageMediaId = mediaData.length > 0 ? mediaData[0].media_id : null;
          
          // Get image URL from media data (mediaData already contains media details)
          let imageUrl = '';
          if (mediaData.length > 0 && mediaData[0].media) {
            imageUrl = mediaData[0].media.file_path || '';
          }
          
          setInitialData({
            ...data,
            selectedTechnologies: selectedTechIds,
            image_media_id: imageMediaId,
            image_url: imageUrl
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleSubmit = async (formData: any) => {
    try {
      // Process form data for API
      const processedData = {
        ...formData,
        selectedTechnologies: formData.selectedTechnologies || [],
        slug: formData.slug || slugify(formData.name, {
          lower: true,
          strict: true,
          trim: true
        }),
        status: formData.status,
        image_media_id: formData.image_media_id,
        image_file: formData.image_file,
      };

      await updateItem(id, processedData);
      
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successDiv.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 00016zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L6.586 13l-1.293 1.293a1 1 0 001.414 1.414L9 15.414l2.293 2.293a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 11.586l2.293-2.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 001.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>Dự án đã được cập nhật thành công!</span>
        </div>
      `;
      successDiv.style.opacity = '0';
      successDiv.style.transition = 'opacity 0.3s ease-in-out';
      document.body.appendChild(successDiv);
      
      // Fade in
      setTimeout(() => {
        successDiv.style.opacity = '1';
      }, 100);
      
      // Fade out and remove
      setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(successDiv)) {
            document.body.removeChild(successDiv);
          }
        }, 300); // Wait for fade out animation
      }, 3000);
      
      // Redirect after showing success message
      setTimeout(() => {
        router.push("/admin/project");
      }, 1500);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <p className="text-gray-500">Đang tải thông tin dự án...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProjectForm
      mode="edit"
      title="Chỉnh sửa Dự án"
      submitText="Lưu thay đổi"
      cancelHref="/admin/project"
      initialData={initialData}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      success={success}
    />
  );
};

export default ProjectEdit;
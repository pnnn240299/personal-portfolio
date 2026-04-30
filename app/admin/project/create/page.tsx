'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import useDataCRUD from "@/lib/useDataCRUD";
import ProjectForm from "../components/ProjectForm";
import slugify from 'slugify';

const ProjectCreate = () => {
  const router = useRouter();
  const { createItem, loading, error, success } = useDataCRUD("projects");

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
      };

      await createItem(processedData);
      
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successDiv.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 00016zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L6.586 13l-1.293 1.293a1 1 0 001.414 1.414L9 15.414l2.293 2.293a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 11.586l2.293-2.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 001.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>Dự án đã được tạo thành công!</span>
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
      console.error("Error creating project:", error);
    }
  };

  return (
    <ProjectForm
      mode="create"
      title="Tạo Dự án Mới"
      submitText="Tạo dự án"
      cancelHref="/admin/project"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      success={success}
    />
  );
};

export default ProjectCreate;

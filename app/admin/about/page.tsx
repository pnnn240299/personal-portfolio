'use client'

import * as React from "react";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const About = () => {
  const [aboutData, setAboutData] = useState({
    title: "About Us",
    content: "This is our about page content.",
    image: "",
  });

  useEffect(() => {
    // Lấy dữ liệu từ localStorage hoặc API
    const savedData = JSON.parse(localStorage.getItem("aboutPage") || "{}");
    if (Object.keys(savedData).length > 0) {
      setAboutData(savedData);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setAboutData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("aboutPage", JSON.stringify(aboutData));
    alert("About page updated successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Edit About Page</h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={aboutData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={aboutData.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {aboutData.image && (
              <img
                src={aboutData.image}
                alt="About"
                className="mt-4 w-full max-w-md h-auto rounded-md"
              />
            )}
          </div>

          {/* Save Button */}
          <div>
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(About), { 
  ssr: false 
});
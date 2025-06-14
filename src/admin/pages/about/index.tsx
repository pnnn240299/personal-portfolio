import React, { useState, useEffect } from "react";

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
    <div className="p-4 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">Manage About Page</h1>
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={aboutData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 font-medium">Content:</label>
          <textarea
            name="content"
            value={aboutData.content}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={5}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium">Image:</label>
          <input type="file" onChange={handleImageUpload} className="w-full border p-2 rounded" />
          {aboutData.image && <img src={aboutData.image} alt="About Preview" className="mt-2 h-32" />}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Save About Page
        </button>
      </div>
    </div>
  );
};

export default About;

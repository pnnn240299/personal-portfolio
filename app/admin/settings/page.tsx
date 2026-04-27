'use client'

import React, { useState, useEffect } from "react";

const Settings = () => {
  // Mock dữ liệu settings
  const [settings, setSettings] = useState({
    siteName: "My Website",
    siteLogo: "",
    contactEmail: "admin@example.com",
    maintenanceMode: false,
  });

  useEffect(() => {
    // Giả sử lấy dữ liệu từ API hoặc local storage
    const savedSettings = JSON.parse(localStorage.getItem("settings") || "{}");
    if (Object.keys(savedSettings).length > 0) {
      setSettings(savedSettings);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    // Lưu settings vào local storage hoặc gọi API lưu vào database
    localStorage.setItem("settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Settings</h2>

        <div className="space-y-6">
          {/* Site Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Maintenance Mode */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Maintenance Mode
              </span>
            </label>
          </div>

          {/* Save Button */}
          <div>
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
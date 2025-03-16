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
    const { name, value, type, checked } = e.target;
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
    <div className="p-4 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">Website Settings</h1>
      <div className="space-y-4">
        {/* Site Name */}
        <div>
          <label className="block text-gray-700 font-medium">Site Name:</label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-gray-700 font-medium">Site Logo:</label>
          <input
            type="file"
            name="siteLogo"
            onChange={(e) =>
              setSettings({ ...settings, siteLogo: URL.createObjectURL(e.target.files?.[0]!) })
            }
            className="w-full border p-2 rounded"
          />
          {settings.siteLogo && (
            <img src={settings.siteLogo} alt="Logo Preview" className="mt-2 h-16" />
          )}
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-gray-700 font-medium">Contact Email:</label>
          <input
            type="email"
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Maintenance Mode */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700 font-medium">Enable Maintenance Mode</label>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;

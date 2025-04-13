import Banner from "./components/Banner";
import { useState } from "react";

const ProfilePage = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/nhan",
    linkedin: "https://linkedin.com/in/nhan",
    twitter: "https://twitter.com/nhan",
    github: "https://github.com/nhan",
  });

  const handleChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen shadow rounded-lg">
      <div className="w-full flex h-fit flex-col">
        <div className="col-span-4 lg:!mb-0">
          <Banner socialLinks={socialLinks} />
        </div>

        {/* Form chỉnh sửa */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cập Nhật Liên Kết Mạng Xã Hội</h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Facebook</label>
                <input
                  type="url"
                  name="facebook"
                  value={socialLinks.facebook}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={socialLinks.linkedin}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={socialLinks.twitter}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={socialLinks.github}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Lưu Thay Đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

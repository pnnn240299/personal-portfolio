import avatar from "@/admin/assets/img/avatars/avatar11.png";
import banner from "@/admin/assets/img/profile/banner.png";
import Card from "@/admin/components/card";
import { useState } from "react";
import SocialLinks from "./SocialLinks";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Banner = () => {
  const [profile, setProfile] = useState({
    name: "Pham Nguyen Ngoc Nhan",
    email: "nhan@example.com",
    avatar: avatar,
    role: "Product Manager",
    socialLinks: [
      { platform: "Facebook", url: "https://facebook.com/nhan", icon: <FaFacebook size={24} /> },
      { platform: "Twitter", url: "https://twitter.com/nhan", icon: <FaTwitter size={24} /> },
      { platform: "LinkedIn", url: "https://linkedin.com/in/nhan", icon: <FaLinkedin size={24} /> },
      { platform: "GitHub", url: "https://github.com/nhan", icon: <FaGithub size={24} /> },
    ],
  });

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={profile.avatar} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">{profile.name}</h4>
        <p className="text-base font-normal text-gray-600">{profile.role}</p>
      </div>

      {/* Social Links */}
      <SocialLinks links={profile.socialLinks} />

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
          <p className="text-sm font-normal text-gray-600">Posts</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">9.7K</p>
          <p className="text-sm font-normal text-gray-600">Followers</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">434</p>
          <p className="text-sm font-normal text-gray-600">Following</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;

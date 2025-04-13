const SocialLinks = ({ links }) => {
  return (
    <div className="mt-4 flex gap-4">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy-700 dark:text-white hover:text-blue-500 transition"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;

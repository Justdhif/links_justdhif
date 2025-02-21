import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaravel, faPhp, faJs, faReact } from "@fortawesome/free-brands-svg-icons";

const icons = [
  { href: "https://laravel.com/", icon: faLaravel, color: "text-red-500" },
  { href: "https://www.php.net/", icon: faPhp, color: "text-blue-500" },
  { href: "https://www.javascript.com/", icon: faJs, color: "text-yellow-400" },
  { href: "https://reactjs.org/", icon: faReact, color: "text-blue-400" },
];

const SocialIcons = () => {
  return (
    <div className="flex justify-center space-x-6">
      {icons.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
        >
          <FontAwesomeIcon icon={item.icon} className="w-10 h-10" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;

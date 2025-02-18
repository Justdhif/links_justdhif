// components/SocialIcons.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaravel, faPhp, faJs, faReact } from '@fortawesome/free-brands-svg-icons';

const SocialIcons = () => {
  return (
    <div className="flex justify-center space-x-6">
      <a
        href="https://laravel.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-500 hover:text-purple-400 transition duration-300"
      >
        <FontAwesomeIcon icon={faLaravel} className="w-10 h-10" />
      </a>
      <a
        href="https://www.php.net/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-500 hover:text-purple-400 transition duration-300"
      >
        <FontAwesomeIcon icon={faPhp} className="w-10 h-10" />
      </a>
      {/* <a
        href="https://tailwindcss.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-500 hover:text-purple-400 transition duration-300"
      >
        <img src="/icons/tailwind.png" alt="Tailwind CSS" className="w-15 h-8 object-cover" />
      </a> */}
      <a
        href="https://www.javascript.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-500 hover:text-purple-400 transition duration-300"
      >
        <FontAwesomeIcon icon={faJs} className="w-10 h-10" />
      </a>
      <a
        href="https://reactjs.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-500 hover:text-purple-400 transition duration-300"
      >
        <FontAwesomeIcon icon={faReact} className="w-10 h-10" />
      </a>
    </div>
  );
};

export default SocialIcons;

// components/ContactIcons.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhatsapp,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const ContactIcons = () => {
  return (
    <div className="space-y-4 w-full">
      {/* WhatsApp */}
      <a
        href="https://wa.me/6282113285557?text=Hai%20Justdhif!" // Nomor diperbaiki tanpa '+'
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-green-500/80 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7 mr-3" />
        WhatsApp
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/justdhif.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-purple-500/90 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        <FontAwesomeIcon icon={faInstagram} className="w-7 h-7 mr-3" />
        Instagram
      </a>

      {/* GitHub */}
      <a
        href="https://github.com/Justdhif"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-gray-800/80 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        <FontAwesomeIcon icon={faGithub} className="w-7 h-7 mr-3" />
        GitHub
      </a>
    </div>
  );
};

export default ContactIcons;

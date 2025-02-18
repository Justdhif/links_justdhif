// components/ContactIcons.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

const ContactIcons = () => {
  return (
    <div className="space-y-4 w-full">
      <a
        href="https://wa.me/+6282113285557" // Ganti dengan nomor WhatsApp Anda
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6 mr-2" />
        WhatsApp
      </a>
      <a
        href="https://www.instagram.com/justdhif.dev" // Ganti dengan username Instagram Anda
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
      >
        <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 mr-2" />
        Instagram
      </a>
      <a
        href="https://github.com/Justdhif" // Ganti dengan username GitHub Anda
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
      >
        <FontAwesomeIcon icon={faGithub} className="w-6 h-6 mr-2" />
        GitHub
      </a>
    </div>
  );
};

export default ContactIcons;

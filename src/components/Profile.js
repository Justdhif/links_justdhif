import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Profile = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(textRef.current, {
      strings: [
        'Hello! My name is Nadhif.',
        'A student at SMK Taruna Bhakti.',
        'A Web Developer.',
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/files/CV_Nadhif.pdf'; // Path file CV (store in public/files/)
    link.download = 'CV_Nadhif.pdf';
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Profile Image with Animation */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative w-24 h-24 sm:w-32 sm:h-32 group rounded-full overflow-hidden border-4 border-transparent transition-all duration-300"
      >
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-cyan-500 shadow-lg group-hover:border-cyan-600 transition-all duration-300"
        />
      </motion.div>

      {/* Username with Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
      >
        Justdhif
      </motion.h1>

      {/* Typing Text */}
      <div className="relative flex items-center">
        <span
          ref={textRef}
          className="text-md text-gray-300 hover:text-gray-200 transition-colors duration-300 inline-block"
        ></span>
      </div>

      {/* Download CV Button */}
      <button
        onClick={handleDownloadCV}
        className="px-4 py-2 flex items-center gap-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
      >
        {/* Radar Animation */}
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-full h-full bg-cyan-400 rounded-full"></div>
        </div>

        CV is available for download
      </button>
    </div>
  );
};

export default Profile;

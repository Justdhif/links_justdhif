import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import ThemeToggle from './ThemeToggle';

const Profile = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(textRef.current, {
      strings: ['Halo! Nama saya Nadhif.', 'Seorang siswa SMK Taruna Bhakti.', 'Seorang Web Developer.'],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Gambar Profil dengan Animasi */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative w-24 h-24 sm:w-32 sm:h-32 group rounded-full overflow-hidden border-4 border-transparent transition-all duration-300"
      >
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-blue-500 shadow-lg group-hover:border-blue-900 transition-all duration-300 dark:border-purple-400 dark:group-hover:border-white"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-500/60 via-transparent to-purple-500/60 z-0 pointer-events-none"
        ></motion.div>
      </motion.div>

      {/* Nama User dengan Animasi */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold text-blue-500 dark:text-purple-400 hover:text-blue-600 dark:hover:text-purple-500 transition-colors duration-300"
      >
        Justdhif
      </motion.h1>

      {/* Teks dengan efek typing */}
      <p
        className="text-md text-gray-500 text-center hover:text-gray-700 transition-colors duration-300 dark:text-gray-300 dark:hover:text-gray-100 inline-block"
      >
        <span ref={textRef}></span>
      </p>

      <ThemeToggle />
    </div>
  );
};

export default Profile;

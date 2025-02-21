import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Profile = () => {
  const fullText = 'Hai semuanya, saya Nadhif.';
  const fullText2 = 'Seorang siswa SMK Taruna Bhakti.';

  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  const [text2, setText2] = useState('');
  const [textIndex2, setTextIndex2] = useState(0);

  useEffect(() => {
    if (textIndex < fullText.length) {
      const typeEffect = setTimeout(() => {
        setText((prev) => prev + fullText[textIndex]);
        setTextIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(typeEffect);
    } else {
      // Setelah teks pertama selesai, mulai teks kedua dengan jeda 1 detik
      setTimeout(() => {
        if (textIndex2 < fullText2.length) {
          const typeEffect2 = setTimeout(() => {
            setText2((prev) => prev + fullText2[textIndex2]);
            setTextIndex2((prev) => prev + 1);
          }, 50);
          return () => clearTimeout(typeEffect2);
        }
      }, 50);
    }
  }, [textIndex, textIndex2]); // Tambahkan dependency agar efek berjalan dengan benar

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
          className="rounded-full object-cover border-2 border-purple-500 shadow-lg group-hover:border-white transition-all duration-300"
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
        className="text-2xl font-bold text-purple-500 hover:text-white transition-colors duration-300"
      >
        Justdhif
      </motion.h1>

      {/* Teks dengan efek typing */}
      <p className="text-sm text-gray-400 text-center hover:text-gray-200 transition-colors duration-300">
        {text}
      </p>
      <p className="text-sm text-gray-400 text-center hover:text-gray-200 transition-colors duration-300">
        {text2}
      </p>
    </div>
  );
};

export default Profile;

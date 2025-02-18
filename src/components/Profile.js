// components/Profile.js
import Image from 'next/image';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-24 h-24 group rounded-full overflow-hidden"
      >
        {/* Gambar Profil */}
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-purple-500 group-hover:border-purple-300 transition-all duration-300 z-10"
        />

        {/* Efek Cahaya */}
        <motion.div
          initial={{ x: '-100%', y: '-100%' }}
          whileHover={{ x: '100%', y: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-purple-500/80 via-purple-300/80 to-purple-500/80 z-0 pointer-events-none"
        ></motion.div>
      </motion.div>

      {/* Teks Profil */}
      <h1 className="text-2xl font-bold text-purple-500 hover:text-white transition-colors duration-300">Justdhif</h1>
      <p className="text-sm text-gray-400 text-center hover:text-gray-200 transition-colors duration-300">
        Hai semuanya, saya Nadhif.
      </p>
      <p className="text-sm text-gray-400 text-center hover:text-gray-200 transition-colors duration-300">
        Seorang siswa SMK Taruna Bhakti
      </p>
    </div>
  );
};

export default Profile;

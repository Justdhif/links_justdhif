'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const CommentItem = ({ comment = {}, index = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  if (!comment) {
    return null;
  }

  // Pastikan nama selalu ada
  const name = comment.name || 'Anonymous';

  // UI Avatars
  const profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-100 p-4 rounded-lg flex items-start mb-3 last:mb-0 gap-3 border border-gray-300 shadow-md transition-all duration-300 hover:shadow-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:shadow-purple-500"
    >
      {/* Gambar Profil */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.4, ease: 'backOut' } }}
      >
        <Image
          src={profileImage}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full border-2 border-blue-500 object-cover dark:border-purple-500"
        />
      </motion.div>

      {/* Konten Komentar */}
      <div className="flex flex-col">
        <strong className="text-blue-600 text-lg dark:text-purple-500">{name}</strong>
        <p className="text-gray-700 mt-1 dark:text-gray-200">
          {comment.comment || 'No comment provided.'}
        </p>
        {comment.timestamp && (
          <p className="text-xs text-gray-500 mt-2">
            {new Date(comment.timestamp.toDate()).toLocaleString()}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default CommentItem;

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const CommentItem = ({ comment, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.3, // Elemen akan terdeteksi saat 30% terlihat
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }} // Hilang saat keluar viewport
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800 p-4 rounded-lg flex items-start gap-3"
    >
      <Image
        src="/images/default_profile.png"
        alt="Profile"
        width={50}
        height={50}
        className="rounded-full border-2 border-purple-500 object-cover"
      />
      <div className="flex flex-col">
        <strong className="text-purple-500 text-lg">{comment.name}</strong>
        <p className="text-gray-300 mt-1">{comment.comment}</p>
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

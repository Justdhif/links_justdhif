'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Profile from '../components/Profile';
import TechStack from '../components/TechStack';
import ContactIcons from '../components/ContactIcons';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  // Simpan komentar ke Firestore
  const handleCommentSubmit = async (newComment) => {
    try {
      await addDoc(collection(db, 'comments'), {
        ...newComment,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  // Variants untuk animasi masuk
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Hook untuk mendeteksi scroll
  const useScrollAnimation = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ threshold: 0.3 });

    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);

    return { ref, controls };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:p-10 sm:p-4 text-gray-900 dark:text-gray-200 transition-colors duration-300">
      {/* Konten Utama */}
      <motion.div
        className="relative max-w-xl w-full p-6 space-y-6 bg-white dark:bg-gray-800 shadow-md rounded-lg"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        {/* Profile */}
        <motion.div {...useScrollAnimation()}>
          <Profile />
        </motion.div>

        {/* Ikon Sosial */}
        <motion.div {...useScrollAnimation()}>
          <TechStack />
        </motion.div>

        {/* Kontak */}
        <motion.div {...useScrollAnimation()}>
          <ContactIcons />
        </motion.div>

        {/* Judul Komentar */}
        <motion.h1
          className="font-bold text-lg text-gray-700 dark:text-gray-300 border-b border-gray-400 pb-2"
          {...useScrollAnimation()}
        >
          Comments
        </motion.h1>

        {/* Daftar Komentar */}
        <motion.div {...useScrollAnimation()}>
          <CommentList />
        </motion.div>

        {/* Form Komentar */}
        <motion.div {...useScrollAnimation()}>
          <CommentForm onCommentSubmit={handleCommentSubmit} />
        </motion.div>
      </motion.div>
    </div>
  );
}

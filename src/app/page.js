'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Profile from '../components/Profile';
import SocialIcons from '../components/SocialIcons';
import ContactIcons from '../components/ContactIcons';
import ProjectCarousel from '../components/ProjectCarousel';
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
    hidden: { opacity: 0, y: 50 },
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
      } else {
        controls.start('hidden');
      }
    }, [controls, inView]);

    return { ref, controls };
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 relative overflow-hidden">
      {/* Efek Background Gradient Futuristic */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-black opacity-50"></div>

      {/* Lingkaran Animasi */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-500/30 blur-3xl rounded-full"
        animate={{ x: [0, 100, -100, 0], y: [0, -100, 100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '10%' }}
      ></motion.div>

      <motion.div
        className="absolute w-80 h-80 bg-purple-500/30 blur-3xl rounded-full"
        animate={{ x: [0, -100, 100, 0], y: [0, 100, -100, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '10%' }}
      ></motion.div>

      {/* Konten Utama */}
      <motion.div
        className="max-w-lg w-full p-8 space-y-6 bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl relative border border-purple-500/30"
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
          <SocialIcons />
        </motion.div>

        {/* Kontak */}
        <motion.div {...useScrollAnimation()}>
          <ContactIcons />
        </motion.div>

        {/* Carousel Proyek */}
        <motion.div {...useScrollAnimation()}>
          <ProjectCarousel />
        </motion.div>

        {/* Judul Komentar */}
        <motion.h1
          className="font-bold text-lg text-purple-400 border-b border-purple-500 pb-2"
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

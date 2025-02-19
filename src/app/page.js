'use client';

import { useEffect, useState } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);

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

  // Variants untuk animasi masuk dan keluar layar
  const fadeInOutVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Hook untuk mendeteksi saat elemen terlihat di viewport
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

  // Animasi untuk setiap elemen
  const profileAnim = useScrollAnimation();
  const socialAnim = useScrollAnimation();
  const contactAnim = useScrollAnimation();
  const projectAnim = useScrollAnimation();
  const titleAnim = useScrollAnimation();
  const listAnim = useScrollAnimation();
  const formAnim = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-10 relative overflow-hidden">
      {/* Bulatan Animasi */}
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>

      {/* Konten Utama dengan Animasi Scroll */}
      <motion.div className="max-w-md w-full p-6 space-y-6 bg-gray-900/50 backdrop-blur-md rounded-lg shadow-lg relative z-10">
        <motion.div
          ref={profileAnim.ref}
          variants={fadeInOutVariants}
          initial="hidden"
          animate={profileAnim.controls}
        >
          <Profile />
        </motion.div>

        <motion.div
          ref={socialAnim.ref}
          variants={fadeInOutVariants}
          initial="hidden"
          animate={socialAnim.controls}
        >
          <SocialIcons />
        </motion.div>

        <motion.div
          ref={contactAnim.ref}
          variants={fadeInOutVariants}
          initial="hidden"
          animate={contactAnim.controls}
        >
          <ContactIcons />
        </motion.div>

        <motion.div
          ref={projectAnim.ref}
          variants={fadeInOutVariants}
          initial="hidden"
          animate={projectAnim.controls}
        >
          <ProjectCarousel />
        </motion.div>

        <motion.div
          ref={titleAnim.ref}
          variants={fadeInOutVariants}
          initial="hidden"
          animate={titleAnim.controls}
        >
          <h1 className="font-bold text-lg border-b-2 border-purple-500 pb-1 px-1 inline-block">
            Comment
          </h1>
        </motion.div>

        <motion.div
          ref={listAnim.ref}
          variants={fadeInOutVariants}
          initial="hidden"
          animate={listAnim.controls}
        >
          <CommentList />
        </motion.div>

        <motion.div
          ref={formAnim.ref}
          variants={fadeInOutVariants}
          initial="hidden"
          animate={formAnim.controls}
        >
          <CommentForm onCommentSubmit={handleCommentSubmit} />
        </motion.div>
      </motion.div>
    </div>
  );
}

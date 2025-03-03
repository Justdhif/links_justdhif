'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Profile from '../components/Profile';
import TechStack from '../components/TechStack';
import EncryptedText from '../components/EncryptedText';
import ContactIcons from '../components/ContactIcons';
import RandomWords from '../components/RandomWords';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import Location from '../components/Location';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  // Save comments to Firestore
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

  // Variants for fade-in animation
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Hook for scroll animation detection
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
    <div className="min-h-screen flex flex-col items-center justify-center md:p-10 sm:p-4 text-gray-200 bg-gray-900 transition-colors duration-300">
      {/* Main Content */}
      <motion.div
        className="relative max-w-xl w-full p-12 md:p-6 space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        {/* Profile */}
        <motion.div {...useScrollAnimation()}>
          <Profile />
        </motion.div>

        {/* Social Icons */}
        <motion.div {...useScrollAnimation()}>
          <TechStack />
        </motion.div>

        <motion.div {...useScrollAnimation()}>
          <EncryptedText text="WEB DEVELOPER" />
        </motion.div>

        {/* Contact */}
        <motion.div {...useScrollAnimation()}>
          <ContactIcons />
        </motion.div>

        <motion.div {...useScrollAnimation()}>
          <RandomWords />
        </motion.div>

        {/* Comment Title */}
        <motion.h1
          className="font-bold text-lg text-gray-300 border-b border-gray-600 pb-2"
          {...useScrollAnimation()}
        >
          Comments
        </motion.h1>

        {/* Comment List */}
        <motion.div {...useScrollAnimation()}>
          <CommentList />
        </motion.div>

        {/* Comment Form */}
        <motion.div {...useScrollAnimation()}>
          <CommentForm onCommentSubmit={handleCommentSubmit} />
        </motion.div>

        <motion.div {...useScrollAnimation()}>
          <Location />
        </motion.div>
      </motion.div>
    </div>
  );
}

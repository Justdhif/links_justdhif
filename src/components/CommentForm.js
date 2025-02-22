'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return; // Cegah input kosong

    setLoading(true);
    try {
      await addDoc(collection(db, 'comments'), {
        name,
        comment,
        timestamp: serverTimestamp(),
      });

      setName('');
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
      }}
    >
      {/* Input Nama */}
      <motion.input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded bg-gray-100 text-gray-900 border border-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        whileFocus={{ scale: 1.02 }}
      />

      {/* Textarea Komentar */}
      <motion.textarea
        placeholder="Tulis komentar..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-3 rounded bg-gray-100 text-gray-900 border border-gray-400 outline-none resize-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        whileFocus={{ scale: 1.02 }}
      />

      {/* Tombol Submit */}
      <motion.button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow-md transition-all"
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? 'Mengirim...' : 'Kirim'}
      </motion.button>
    </motion.form>
  );
};

export default CommentForm;

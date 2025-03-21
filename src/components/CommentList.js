'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import CommentItem from './CommentItem'; // Import komponen CommentItem

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const commentsCollection = query(
      collection(db, 'comments'),
      orderBy('timestamp', 'desc') // Urutkan berdasarkan timestamp terbaru
    );

    const unsubscribe = onSnapshot(commentsCollection, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="relative max-h-80 overflow-y-auto">
      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600"
        >
          Memuat komentar...
        </motion.p>
      ) : comments.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600"
        >
          Belum ada komentar.
        </motion.p>
      ) : (
        <AnimatePresence>
          {comments.map((comment, index) => (
            <CommentItem key={comment.id} comment={comment} index={index} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CommentList;

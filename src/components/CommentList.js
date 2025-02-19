'use client';

import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import CommentItem from './CommentItem'; // Import komponen baru

const CommentList = () => {
  const [comments, setComments] = useState([]);

  // Ambil komentar dari Firestore (real-time)
  useEffect(() => {
    const commentsCollection = collection(db, 'comments');
    const unsubscribe = onSnapshot(commentsCollection, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4 overflow-y-auto max-h-64 pr-2">
      <AnimatePresence>
        {comments.map((comment, index) => (
          <CommentItem key={comment.id} comment={comment} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CommentList;

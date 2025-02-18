"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  // Ambil komentar dari Firestore
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCollection = collection(db, "comments");
        const commentsSnapshot = await getDocs(commentsCollection);
        const commentsList = commentsSnapshot.docs.map((doc) => ({
          id: doc.id, // Menambahkan ID unik dari Firestore
          ...doc.data(),
        }));
        setComments(commentsList);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="space-y-4 overflow-y-auto max-h-64 pr-2">
      <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-4 rounded-lg flex gap-3"
          >
            <Image
              src="/images/default_profile.png"
              alt="Profile"
              width={53}
              height={50}
              className="rounded-full border-2 border-purple-500 object-cover"
              style={{ objectFit: "cover" }} // Memastikan gambar tidak terdistorsi
            />
            <div className="flex flex-col">
              <strong className="text-purple-500 text-lg">{comment.name}</strong>
              <p className="text-gray-300 mt-1">{comment.comment}</p>
            </div>
            {comment.timestamp && (
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(comment.timestamp.toDate()).toLocaleString()}
                </p>
              )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CommentList;

// components/CommentList.js
"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CommentList = ({ comments }) => {
  return (
    <div className="space-y-4 overflow-y-auto max-h-24 pr-2">
      <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-4 rounded-lg flex gap-2"
          >
            <Image
              src="/images/default_profile.png"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full border-2 border-purple-500 object-cover mr-1"
            />
            <div>
              <strong className="text-purple-500">{comment.name}</strong>
              <p className="text-gray-300">{comment.comment}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CommentList;

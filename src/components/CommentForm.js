'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentForm = ({ onCommentSubmit }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const recipientPhone = '6282113285557';
  const fonnteToken = 'hXNueQDGZjiKKJCZ58WN';
  const commentsURL = 'https://links-justdhif.vercel.app/';

  // Function to send WhatsApp message via Fonnte API
  const sendWhatsAppMessage = async (name, comment) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const message =
      `📢 *New Comment Received!*\n\n` +
      `👤 *Name:* ${name}\n` +
      `💬 *Comment:* "${comment}"\n\n` +
      `📅 *Time:* ${formattedDate}\n\n` +
      `🚀 _Check the latest comments now!_\n🔗 ${commentsURL}`;

    try {
      const response = await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: {
          Authorization: fonnteToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target: recipientPhone,
          message: message,
        }),
      });

      const data = await response.json();
      console.log('Fonnte API Response:', data);

      if (!data.status) {
        throw new Error(data.message || 'Failed to send message');
      }

      toast.success('📩 Comment successfully sent to WhatsApp!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      toast.error('❌ Failed to send comment to WhatsApp.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name.trim() || !comment.trim()) {
      toast.warn('⚠️ Name and comment cannot be empty!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return;
    }

    setLoading(true);

    try {
      // Save comment to Firestore
      const newComment = {
        name,
        comment,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, 'comments'), newComment);

      // Send WhatsApp notification
      await sendWhatsAppMessage(name, comment);

      // Notify parent component (if needed)
      if (onCommentSubmit) {
        onCommentSubmit(newComment);
      }

      // Show success message
      toast.success('✅ Comment successfully added!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });

      // Reset form
      setName('');
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('❌ Failed to add comment!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
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
        {/* Name Input */}
        <motion.input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          whileFocus={{ scale: 1.02 }}
        />

        {/* Comment Textarea */}
        <motion.textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 outline-none resize-none focus:ring-2 focus:ring-blue-500 transition-all"
          whileFocus={{ scale: 1.02 }}
          rows={4}
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow-md transition-all"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Sending...' : 'Submit'}
        </motion.button>
      </motion.form>
    </>
  );
};

export default CommentForm;

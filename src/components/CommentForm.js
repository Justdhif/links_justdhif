'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const recipientPhone = '6282113285557';
  const fonnteToken = 'hXNueQDGZjiKKJCZ58WN';

  const sendWhatsAppMessage = async (name, comment) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const message =
      `📢 *Komentar Baru Masuk!*\n\n` +
      `👤 *Nama:* ${name}\n` +
      `💬 *Komentar:* "${comment}"\n\n` +
      `📅 *Waktu:* ${formattedDate}\n\n` +
      `🚀 _Cek komentar terbaru sekarang!_`;

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
        throw new Error(data.message || 'Gagal mengirim pesan');
      }

      alert('Komentar berhasil dikirim ke WhatsApp!');
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      alert('Gagal mengirim komentar ke WhatsApp.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return; // Cegah input kosong

    setLoading(true);
    try {
      // Simpan komentar ke Firestore
      await addDoc(collection(db, 'comments'), {
        name,
        comment,
        timestamp: serverTimestamp(),
      });

      // Kirim pesan ke WhatsApp melalui Fonnte
      await sendWhatsAppMessage(name, comment);

      // Reset form
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

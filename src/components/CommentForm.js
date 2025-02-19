'use client';
import { useState } from 'react';
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
        timestamp: serverTimestamp(), // Tambahkan timestamp agar komentar bisa diurutkan
      });

      setName('');
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
      />
      <textarea
        placeholder="Tulis komentar..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 resize-none"
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Mengirim...' : 'Kirim'}
      </button>
    </form>
  );
};

export default CommentForm;

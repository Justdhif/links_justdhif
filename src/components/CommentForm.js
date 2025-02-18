// components/CommentForm.js
"use client";
import { useState } from "react";

const CommentForm = ({ onCommentSubmit }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return; // Jangan kirim jika kosong
    onCommentSubmit({ name, comment });
    setName("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nama Anda"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <textarea
        placeholder="Komentar Anda"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />
      <button
        type="submit"
        className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
      >
        Kirim Komentar
      </button>
    </form>
  );
};

export default CommentForm;

'use client';

import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Star, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialPage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(1);
  const [testimonials, setTestimonials] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      setTestimonials(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    const docRef = await addDoc(collection(db, 'testimonials'), {
      name,
      message,
      rating,
      timestamp: serverTimestamp(),
    });

    setTestimonials((prev) => [
      { id: docRef.id, name, message, rating, timestamp: new Date() },
      ...prev,
    ]);

    setName('');
    setMessage('');
    setRating(1);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center md:p-10 sm:p-4 text-gray-200 bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header dengan Icon Arrow */}
      <motion.div
        className="flex items-center mt-12 md:mt-6 space-x-3 mb-4 cursor-pointer"
        onClick={() => router.push('/')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft size={24} className="text-white" />
        <motion.h1
          className="text-xl font-bold text-white md:text-2xl sm:text-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Add Your Testimonial
        </motion.h1>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="relative max-w-xl w-full p-12 md:p-6 md:pt-0 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={name}
          onChange={(e) => setName(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          required
        />
        <motion.textarea
          placeholder="Your Testimonial"
          className="resize-none w-full p-3 rounded bg-gray-800 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          required
        />

        {/* Star Rating */}
        <motion.div
          className="flex items-center justify-center space-x-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              fill={star <= rating ? 'currentColor' : 'none'}
              className={`cursor-pointer transition ${
                star <= rating ? 'text-yellow-400' : 'text-gray-500'
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg text-white font-semibold text-lg transition shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>

      <motion.div
        className="relative max-w-xl w-full p-12 pt-0 md:p-6 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold text-white mb-4 md:2xl sm:text-lg">
          All Testimonials
        </h2>
        {testimonials.length === 0 ? (
          <p className="text-gray-400">No testimonials yet.</p>
        ) : (
          testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700 flex items-start space-x-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              {/* Avatar */}
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-bold">
                {testimonial.name.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-lg text-white font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-gray-400 text-sm">
                  {new Date(
                    testimonial.timestamp?.seconds * 1000
                  ).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-gray-300 mt-2">{testimonial.message}</p>

                {/* Star Rating */}
                <div className="flex space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < testimonial.rating ? 'currentColor' : 'none'}
                      className={
                        i < testimonial.rating
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      }
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}

export default TestimonialPage;
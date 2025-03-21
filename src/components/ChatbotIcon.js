import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const ChatbotIcon = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [key, setKey] = useState(0);
  const [showMessage, setShowMessage] = useState(false); // State untuk menampilkan pesan

  // Daftar pesan sesuai urutan
  const messages = [
    'Hello! 👋',
    'Need help?',
    'Ask me anything!',
    'I’m here to assist!',
    'Let’s chat!',
  ];

  // Fungsi untuk mengubah pesan sesuai urutan
  const getNextMessage = (index) => {
    return messages[index % messages.length];
  };

  // Set pesan sesuai urutan setiap 3 detik
  useEffect(() => {
    // Tunda munculnya pesan pertama kali selama 3 detik
    const initialDelay = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    const interval = setInterval(() => {
      setCurrentMessage(getNextMessage(key));
      setKey((prevKey) => prevKey + 1); // Update key untuk trigger animasi dan urutan pesan
    }, 3000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [key]);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-10 z-50"
    >
      <Link href="/chatbot">
        <div className="relative flex justify-center items-center">
          {/* Pesan dengan Animasi Pergantian */}
          <AnimatePresence mode="wait">
            {showMessage && ( // Hanya tampilkan pesan jika `showMessage` true
              <motion.div
                key={key} // Kunci unik untuk setiap perubahan teks
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute -top-11 bg-gray-800 text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap overflow-hidden"
              >
                {currentMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ikon Robot */}
          <div className="bg-cyan-500 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-cyan-600 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            >
              <path d="M12 2a2 2 0 012 2v1h4a2 2 0 012 2v4a2 2 0 01-2 2h-1v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1H6a2 2 0 01-2-2V7a2 2 0 012-2h4V4a2 2 0 012-2zM6 7v4h4v1a2 2 0 01-2 2H6v4h4a2 2 0 012 2v1h4v-4a2 2 0 012-2h4v-4h-4a2 2 0 01-2-2V7h-4V4h4v4h4V7h-4V4h-4v3H6z" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ChatbotIcon;

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()-+=<>?/';

function getRandomText(length) {
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join('');
}

const EncryptedText = ({ text, duration = 5000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setDisplayText(getRandomText(text.length));
  }, [text.length]);

  useEffect(() => {
    let interval;
    let timeout;

    if (!isDecrypted) {
      interval = setInterval(() => {
        setDisplayText(getRandomText(text.length));
      }, 50);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayText(text);
        setIsDecrypted(true);
      }, duration);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isDecrypted, text, duration]);

  if (!hydrated) return null; // Mencegah hydration error

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Button Lock/Unlock */}
      <motion.button
        className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all"
        onClick={() => setIsDecrypted(!isDecrypted)}
        whileTap={{ scale: 0.9 }}
      >
        {isDecrypted ? (
          <Unlock size={32} color="cyan" />
        ) : (
          <Lock size={32} color="cyan" />
        )}
      </motion.button>

      {/* Encrypted Text */}
      <motion.p
        className="text-cyan-400 text-3xl font-mono tracking-widest mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {displayText}
      </motion.p>
    </div>
  );
}

export default EncryptedText;

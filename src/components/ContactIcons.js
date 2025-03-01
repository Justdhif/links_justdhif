'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhatsapp,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const contacts = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/6282113285557?text=Hai%20Justdhif!',
    bgColor: 'bg-gradient-to-r from-green-500 to-green-700',
    halfBg: 'bg-gradient-to-r from-green-400 to-green-600',
    textColor: 'text-green-100',
    icon: faWhatsapp,
    username: 'Justdhif',
    followers: '500+ kontak',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/justdhif.dev',
    bgColor: 'bg-gradient-to-r from-pink-500 to-purple-700',
    halfBg: 'bg-gradient-to-r from-pink-400 to-purple-600',
    textColor: 'text-pink-100',
    icon: faInstagram,
    username: '@justdhif.dev',
    followers: '600 followers',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Justdhif',
    bgColor: 'bg-gradient-to-r from-gray-900 to-gray-700',
    halfBg: 'bg-gradient-to-r from-gray-600 to-gray-800',
    textColor: 'text-gray-100',
    icon: faGithub,
    username: 'Justdhif',
    followers: '20 Repositories',
  },
];

const ContactTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full mx-auto mt-10">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-3 mb-6">
        {contacts.map((contact, index) => (
          <button
            key={index}
            className={`relative px-5 py-2 font-semibold rounded-lg border-2 border-gray-800 dark:border-gray-200 transition-all duration-300 overflow-hidden flex items-center`}
            onClick={() => setActiveTab(index)}
          >
            {/* Background animasi setengah dengan ujung kanan melengkung */}
            {activeTab === index && (
              <motion.span
                className={`absolute left-0 top-0 h-full w-1/2 ${contact.halfBg}`}
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ duration: 0.3 }}
                style={{
                  clipPath:
                    'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)',
                }}
              />
            )}

            {/* Icon dengan animasi dari kiri */}
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={
                activeTab === index
                  ? { x: 0, opacity: 1 }
                  : { x: -20, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <FontAwesomeIcon icon={contact.icon} />
            </motion.span>

            <motion.span
              initial={{ x: 0 }}
              animate={activeTab === index ? { x: 10 } : { x: -5 }}
              transition={{ duration: 0.3 }}
              className="mr-2 relative z-10"
            >
              {contact.name}
            </motion.span>
          </button>
        ))}
      </div>

      {/* Animated Card Profile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col items-center justify-center w-full p-6 rounded-xl shadow-lg transition-all bg-gray-200 dark:bg-gray-800"
        >
          {/* Background 1/4 Card */}
          <div
            className={`absolute top-0 left-0 w-1/4 h-full ${contacts[activeTab].bgColor} rounded-r-full`}
          />

          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-full mb-3">
            <FontAwesomeIcon
              icon={contacts[activeTab].icon}
              className="w-8 h-8"
            />
          </div>

          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {contacts[activeTab].username}
          </span>
          <span className="text-sm opacity-70 mt-2 text-gray-700 dark:text-gray-300">
            {contacts[activeTab].followers}
          </span>

          <a
            href={contacts[activeTab].url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-5 py-2 rounded-lg font-semibold shadow-md transition-all bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-100"
          >
            Visit
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ContactTabs;

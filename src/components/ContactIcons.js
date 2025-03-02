'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhatsapp,
  faInstagram,
  faTelegram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const contacts = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/6282113285557?text=Hai%20Justdhif!',
    bgColor:
      'bg-gradient-to-r from-green-600 to-green-900 dark:from-green-400 dark:to-green-700',
    halfBg:
      'bg-gradient-to-r from-green-500 to-green-800 dark:from-green-300 dark:to-green-600',
    textColor: 'text-green-100',
    icon: faWhatsapp,
    username: 'Justdhif',
    followers: '500+ kontak',
    profilePic: 'images/profile.jpg',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/justdhif.dev',
    bgColor:
      'bg-gradient-to-r from-pink-600 to-purple-900 dark:from-pink-400 dark:to-purple-700',
    halfBg:
      'bg-gradient-to-r from-pink-500 to-purple-800 dark:from-pink-300 dark:to-purple-600',
    textColor: 'text-pink-100',
    icon: faInstagram,
    username: '@justdhif.dev',
    followers: '600 followers',
    profilePic: 'images/profile-ig.jpg',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/Justdhif',
    bgColor:
      'bg-gradient-to-r from-blue-600 to-blue-900 dark:from-blue-400 dark:to-blue-700',
    halfBg:
      'bg-gradient-to-r from-blue-500 to-blue-800 dark:from-blue-300 dark:to-blue-600',
    textColor: 'text-blue-100',
    icon: faTelegram,
    username: 'Justdhif',
    followers: '300 members',
    profilePic: 'images/profile-telegram.jpg',
  },
];

const ContactTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full mx-auto mt-10">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-2 md:space-x-3 mb-6">
        {contacts.map((contact, index) => (
          <button
            key={index}
            className={`relative px-3 py-2 md:px-5 md:py-2 font-semibold text-sm md:text-base lg:text-lg rounded-lg border-2 border-gray-800 dark:border-gray-200 transition-all duration-300 overflow-hidden flex items-center`}
            onClick={() => setActiveTab(index)}
          >
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

            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={
                activeTab === index
                  ? { x: -3, opacity: 1 }
                  : { x: -20, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <FontAwesomeIcon icon={contact.icon} />
            </motion.span>

            <motion.span
              initial={{ x: 0 }}
              animate={activeTab === index ? { x: 3 } : { x: -5 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
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
          className="relative flex flex-col items-center justify-center w-full p-6 rounded-2xl shadow-lg transition-all bg-gray-200 dark:bg-gray-800 overflow-hidden"
        >
          {/* Background 1/4 Card */}
          <div
            className={`absolute top-0 left-0 w-full h-2/6 ${contacts[activeTab].bgColor}`}
          />

          {/* Profile Picture */}
          <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-900 border-2 border-gray-800 dark:border-gray-200 rounded-full mb-3 overflow-hidden">
            <img
              src={contacts[activeTab].profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {contacts[activeTab].username}
          </span>

          {/* Followers/Repositories */}
          <span className="text-sm opacity-70 mt-2 text-gray-700 dark:text-gray-300">
            {contacts[activeTab].followers}
          </span>

          {/* Visit Button */}
          <a
            href={contacts[activeTab].url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${contacts[activeTab].bgColor} text-gray-100 hover:bg-gray-100`}
          >
            Visit {contacts[activeTab].name}
          </a>
        </motion.div>
      </AnimatePresence>

      {/* GitHub Section */}
      <div className="mt-5 p-2 rounded-2xl shadow-lg bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-500 dark:to-gray-700 flex items-center gap-4 md:gap-10">
        <img
          src="/images/profile-github.jpg"
          alt="GitHub"
          className="w-24 h-24 rounded-[8px]"
        />
        <div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faGithub}
              className="text-xl text-gray-100"
            />
            <h2 className="text-lg font-bold text-gray-100">
              Justdhif
            </h2>
          </div>
          <p className="text-sm opacity-70 my-2 text-gray-300">
            20 Repositories
          </p>
          <a
            href="https://github.com/Justdhif"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg font-semibold shadow-md text-xs transition-all bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:brightness-110"
          >
            Visit GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactTabs;

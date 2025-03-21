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
import { QRCodeCanvas } from 'qrcode.react';

const contacts = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/6282113285557?text=Hello%20Justdhif!',
    bgColor: 'bg-gradient-to-r from-green-400 to-green-700',
    halfBg: 'bg-gradient-to-r from-green-300 to-green-600',
    textColor: 'text-green-100',
    icon: faWhatsapp,
    username: 'Justdhif',
    followers: '500+ contacts',
    profilePic: 'images/profile.jpg',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/justdhif.dev',
    bgColor: 'bg-gradient-to-r from-pink-400 to-purple-700',
    halfBg: 'bg-gradient-to-r from-pink-300 to-purple-600',
    textColor: 'text-pink-100',
    icon: faInstagram,
    username: '@justdhif.dev',
    followers: '600 followers',
    profilePic: 'images/profile-ig.jpg',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/Justdhif',
    bgColor: 'bg-gradient-to-r from-blue-400 to-blue-700',
    halfBg: 'bg-gradient-to-r from-blue-300 to-blue-600',
    textColor: 'text-blue-100',
    icon: faTelegram,
    username: 'Justdhif',
    followers: '300 members',
    profilePic: 'images/profile-telegram.jpg',
  },
];

const githubUrl = 'https://github.com/Justdhif';

const ContactTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full mx-auto mt-10">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-2 md:space-x-3 mb-6">
        {contacts.map((contact, index) => (
          <button
            key={index}
            className={`relative px-3 py-2 md:px-5 md:py-2 font-semibold text-sm md:text-base lg:text-lg rounded-lg border-2 border-gray-200 transition-all duration-300 overflow-hidden flex items-center`}
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
              className="relative z-10 font-bold text-xs md:text-sm "
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
          className="relative flex flex-col items-center justify-center w-full p-6 rounded-2xl shadow-lg transition-all bg-gray-800 overflow-hidden"
        >
          {/* Background 1/4 Card */}
          <div
            className={`absolute top-0 left-0 w-full h-2/6 ${contacts[activeTab].bgColor}`}
          />
          {/* QR Code (Ganti dari Foto Profil) */}
          <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-white border-4 border-gray-200 rounded-lg mb-3 overflow-hidden shadow-lg">
            <QRCodeCanvas
              value={contacts[activeTab].url}
              size={90}
              bgColor="#ffffff"
              fgColor="#000000"
              className="rounded-lg"
              imageSettings={{
                src: contacts[activeTab].profilePic,
                height: 30,
                width: 30,
                excavate: true,
              }}
            />
          </div>

          {/* Name */}
          <span className="text-xl font-bold text-gray-100">
            {contacts[activeTab].username}
          </span>

          {/* Followers/Repositories */}
          <span className="text-sm opacity-70 mt-2 text-gray-300">
            {contacts[activeTab].followers}
          </span>

          {/* Visit Button */}
          <a
            href={contacts[activeTab].url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${contacts[activeTab].bgColor} text-gray-100 hover:brightness-110`}
          >
            Visit {contacts[activeTab].name}
          </a>
        </motion.div>
      </AnimatePresence>

      {/* GitHub Section */}
      <div className="mt-5 p-4 rounded-2xl shadow-lg bg-gradient-to-r from-gray-500 to-gray-700 flex items-center gap-4">
        {/* QR Code */}
        <div className="p-2 border-4 border-gray-900 rounded-lg shadow-lg bg-white inline-block">
          <QRCodeCanvas
            value={githubUrl}
            size={100}
            bgColor="#ffffff"
            fgColor="#000000"
            imageSettings={{
              src: '/images/profile-github.jpg',
              height: 30,
              width: 30,
              excavate: true,
            }}
          />
        </div>
        <div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faGithub}
              className="text-xl text-gray-100"
            />
            <h2 className="text-lg font-bold text-gray-100">Justdhif</h2>
          </div>
          <p className="text-sm opacity-70 mt-1 mb-2 text-gray-300">
            20 Repositories
          </p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg font-semibold shadow-md text-xs transition-all bg-gray-900 text-gray-100 hover:brightness-110"
          >
            Visit GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactTabs;

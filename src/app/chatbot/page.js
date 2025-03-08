'use client';

import { useState, useEffect } from 'react';
import {
  Send,
  ArrowLeft,
  Square,
  Trash,
  Github,
  Linkedin,
  Mail,
  Star,
  Crown,
  Plus,
} from 'lucide-react'; // Impor ikon tambahan
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; // Impor framer-motion

// Ikon Bot SVG
const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-indigo-500"
  >
    <path d="M12 2a2 2 0 012 2v1h4a2 2 0 012 2v4a2 2 0 01-2 2h-1v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1H6a2 2 0 01-2-2V7a2 2 0 012-2h4V4a2 2 0 012-2zM6 7v4h4v1a2 2 0 01-2 2H6v4h4a2 2 0 012 2v1h4v-4a2 2 0 012-2h4v-4h-4a2 2 0 01-2-2V7h-4V4h4v4h4V7h-4V4h-4v3H6z" />
  </svg>
);

// Respons bot dalam berbagai bahasa
const botResponses = {
  en: {
    hello: 'Hello! How can I assist you?',
    mainMenu: [
      { text: 'About Me', response: 'I am a chatbot designed to help you.' },
      {
        text: 'Contact Info',
        response: 'You can contact me via email at chatbot@example.com.',
      },
      { text: 'Price List', response: 'Here is our price list:' },
      { text: 'Help', response: 'How can I assist you today?' },
    ],
    priceList: [
      { plan: 'Basic Plan', price: '$10/month', icon: <Star size={16} /> },
      { plan: 'Pro Plan', price: '$20/month', icon: <Plus size={16} /> },
      { plan: 'Premium Plan', price: '$30/month', icon: <Crown size={16} /> },
    ],
    shortcuts: ['About', 'Contact', 'Price', 'Help'], // Shortcut saat mengetik
  },
  id: {
    hello: 'Halo! Bagaimana saya bisa membantu?',
    mainMenu: [
      {
        text: 'Tentang Saya',
        response: 'Saya adalah chatbot yang dirancang untuk membantu Anda.',
      },
      {
        text: 'Info Kontak',
        response:
          'Anda dapat menghubungi saya melalui email di chatbot@example.com.',
      },
      { text: 'Daftar Harga', response: 'Berikut daftar harga kami:' },
      {
        text: 'Bantuan',
        response: 'Bagaimana saya bisa membantu Anda hari ini?',
      },
    ],
    priceList: [
      {
        plan: 'Paket Basic',
        price: 'Rp150.000/bulan',
        icon: <Star size={16} />,
      },
      { plan: 'Paket Pro', price: 'Rp300.000/bulan', icon: <Plus size={16} /> },
      {
        plan: 'Paket Premium',
        price: 'Rp450.000/bulan',
        icon: <Crown size={16} />,
      },
    ],
    shortcuts: ['Tentang', 'Kontak', 'Harga', 'Bantuan'], // Shortcut saat mengetik
  },
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [typingMessage, setTypingMessage] = useState('');
  const [typingIntervalId, setTypingIntervalId] = useState(null);
  const [showStartButton, setShowStartButton] = useState(true); // State untuk tombol Start
  const [filteredShortcuts, setFilteredShortcuts] = useState([]); // State untuk shortcut yang difilter

  useEffect(() => {
    // Ambil pesan dari localStorage saat komponen dimuat
    const savedMessages =
      JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(savedMessages);

    // Set bahasa berdasarkan preferensi pengguna
    const userLanguage = navigator.language.split('-')[0];
    setLanguage(userLanguage === 'id' ? 'id' : 'en');

    // Sembunyikan tombol Start jika sudah ada pesan
    if (savedMessages.length > 0) {
      setShowStartButton(false);
    }
  }, []);

  useEffect(() => {
    // Simpan pesan ke localStorage setiap kali messages berubah
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Scroll ke pesan terbaru setiap kali messages berubah
    const lastMessageElement = document.getElementById(
      `message-${messages.length - 1}`
    );
    if (lastMessageElement) {
      lastMessageElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]); // Hapus pesan dari state
    localStorage.removeItem('chatMessages'); // Hapus pesan dari localStorage
    setShowStartButton(true); // Tampilkan tombol Start setelah chat dihapus
  };

  const stopTyping = () => {
    if (typingIntervalId) {
      clearInterval(typingIntervalId);
      setTypingIntervalId(null);
    }
    if (typingMessage) {
      setMessages((prev) => [
        ...prev,
        { text: typingMessage, sender: 'bot', timestamp: new Date() },
      ]);
    }
    setTypingMessage('');
    setIsLoading(false);
  };

  const sendMessage = (text, response) => {
    if (!text.trim()) return;

    const newMessages = [
      ...messages,
      { text, sender: 'user', timestamp: new Date() },
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const loadingDuration = Math.min(Math.max(text.length * 50, 800), 3000);

    setTimeout(() => {
      const botResponse =
        typeof response === 'function' ? response(language) : response;

      let typedMessage = '';
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < botResponse.length) {
          typedMessage += botResponse[index];
          setTypingMessage(typedMessage);
          index++;
        } else {
          clearInterval(intervalId);
          setMessages((prev) => [
            ...prev,
            { text: botResponse, sender: 'bot', timestamp: new Date() },
          ]);
          setTypingMessage('');
          setIsLoading(false);
        }
      }, 50);
      setTypingIntervalId(intervalId);
    }, loadingDuration);
  };

  const handleSendMessage = () => {
    sendMessage(input, botResponses[language].hello);
  };

  const handleStartChat = () => {
    setShowStartButton(false); // Sembunyikan tombol Start
    sendMessage('Start', botResponses[language].hello); // Mulai percakapan dengan pesan pembuka

    // Tampilkan main menu sebagai bagian dari respon bot
    setTimeout(() => {
      const mainMenuResponse = `Here are some options you can choose:`;
      sendMessage('Menu', mainMenuResponse);
    }, 1000);
  };

  const handleShortcutClick = (shortcut) => {
    setInput(shortcut); // Set shortcut ke input teks
    setFilteredShortcuts([]); // Sembunyikan shortcut setelah diklik
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Filter shortcut berdasarkan input
    if (value.length > 0) {
      const filtered = botResponses[language].shortcuts.filter((shortcut) =>
        shortcut.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredShortcuts(filtered);
    } else {
      setFilteredShortcuts([]);
    }
  };

  // Fungsi untuk memformat pesan bot dengan link dan tombol sosial media
  const formatBotResponse = (text) => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts = text.split(linkRegex);

    return parts.map((part, index) => {
      if (index % 3 === 1) {
        // Ini adalah teks link
        const url = parts[index + 1];
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 underline hover:text-indigo-600"
          >
            {part}
          </a>
        );
      } else if (index % 3 === 2) {
        // Ini adalah URL, skip
        return null;
      } else {
        // Ini adalah teks biasa
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 px-0 md:px-80">
      {/* Header */}
      <div className="flex items-center justify-start p-4 shadow-sm">
        <Link href="/" className="p-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={20} className="text-indigo-500" />
        </Link>
        <h1 className="text-xl font-bold text-indigo-500 flex items-center gap-2">
          <BotIcon /> JustChat
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <div className="h-full flex flex-col justify-center items-center">
            <BotIcon className="w-16 h-16 text-indigo-500 mb-4" />
            <h2 className="text-2xl font-bold text-indigo-500">JustChat</h2>
            <p className="text-gray-600">Ask me anything...</p>
          </div>
        )}
        {messages.map((message, index) => (
          <motion.div
            key={index}
            id={`message-${index}`}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start`}
            initial={{ opacity: 0, y: 20 }} // Animasi awal
            animate={{ opacity: 1, y: 0 }} // Animasi saat muncul
            transition={{ duration: 0.3 }} // Durasi animasi
          >
            {message.sender === 'bot' && (
              <div className="flex-shrink-0">
                <BotIcon />
              </div>
            )}
            <div
              className={`max-w-xs rounded-xl text-sm mb-4 ${
                message.sender === 'user'
                  ? 'bg-indigo-500 text-white rounded-br-none p-3'
                  : 'text-gray-300 p-1 pl-2'
              }`}
            >
              {message.sender === 'bot' ? (
                <div className="flex flex-col gap-2">
                  {formatBotResponse(message.text)}
                  {/* Tombol Menu */}
                  {message.text.includes('options you can choose') && (
                    <div className="flex flex-col gap-2 mt-2">
                      {botResponses[language].mainMenu.map((menuItem, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            sendMessage(menuItem.text, menuItem.response)
                          }
                          className="p-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                        >
                          {menuItem.text}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Tombol Price List */}
                  {message.text.includes('price list') && (
                    <div className="flex flex-col gap-2 mt-2">
                      {botResponses[language].priceList.map(
                        (priceItem, idx) => (
                          <button
                            key={idx}
                            className="p-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2"
                          >
                            {priceItem.icon} {priceItem.plan} -{' '}
                            {priceItem.price}
                          </button>
                        )
                      )}
                    </div>
                  )}
                  {/* Tombol Contact Info */}
                  {message.text.includes('contact me via email') && (
                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        onClick={() =>
                          (window.location.href = 'mailto:chatbot@example.com')
                        }
                        className="p-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2"
                      >
                        <Mail size={16} /> Send Email
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                message.text
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start items-start">
            <div className="flex-shrink-0">
              <BotIcon />
            </div>
            <div className="p-1 pl-2 max-w-xs rounded-xl text-sm text-gray-300">
              {typingMessage}
              <span className="animate-blink">|</span>
            </div>
          </div>
        )}
      </div>

      {/* Clear Chat Button */}
      <div className="flex justify-center p-2">
        <button
          onClick={clearChat}
          className="p-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
        >
          <Trash size={16} /> Clear Chat
        </button>
      </div>

      {/* Shortcut saat mengetik */}
      <AnimatePresence>
        {filteredShortcuts.length > 0 && (
          <motion.div
            className="flex gap-2 p-4 justify-start overflow-x-auto"
            initial={{ opacity: 0, y: -10 }} // Animasi awal
            animate={{ opacity: 1, y: 0 }} // Animasi saat muncul
            exit={{ opacity: 0, y: -10 }} // Animasi saat hilang
            transition={{ duration: 0.2 }} // Durasi animasi
          >
            {filteredShortcuts.map((shortcut, index) => (
              <button
                key={index}
                onClick={() => handleShortcutClick(shortcut)}
                className="p-2 px-4 bg-indigo-500 text-white rounded-lg whitespace-nowrap hover:bg-indigo-600"
              >
                {shortcut}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Chat atau Tombol Start */}
      <div className="flex flex-col gap-2 p-4 mb-4 bg-gray-800 rounded-2xl">
        {showStartButton ? (
          <button
            onClick={handleStartChat}
            className="p-3 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600"
          >
            Start Chat
          </button>
        ) : (
          <>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent focus:outline-none mb-4 text-white"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center px-4 py-2 border border-gray-600 rounded-full font-bold text-white">
                JustChat
              </div>
              <button
                onClick={isLoading ? stopTyping : handleSendMessage}
                className="p-3 bg-indigo-500 rounded-full hover:bg-indigo-600"
              >
                {isLoading ? (
                  <Square
                    size={20}
                    className="text-white"
                    fill="currentColor"
                  />
                ) : (
                  <Send size={20} className="text-white" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;

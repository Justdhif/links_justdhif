'use client';

import { useState, useEffect } from 'react';
import {
  Send,
  ArrowLeft,
  Menu,
  Plus,
  X,
  Github,
  Linkedin,
  Mail,
  Trash,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; // Impor AnimatePresence untuk animasi

// Ikon Bot SVG
const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-cyan-400"
  >
    <path d="M12 2a2 2 0 012 2v1h4a2 2 0 012 2v4a2 2 0 01-2 2h-1v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1H6a2 2 0 01-2-2V7a2 2 0 012-2h4V4a2 2 0 012-2zM6 7v4h4v1a2 2 0 01-2 2H6v4h4a2 2 0 012 2v1h4v-4a2 2 0 012-2h4v-4h-4a2 2 0 01-2-2V7h-4V4h4v4h4V7h-4V4h-4v3H6z" />
  </svg>
);

// Biodata pembuat (Anda)
const creatorBio = {
  name: 'Nadhif Rahman',
  role: 'Full Stack Developer',
  description: {
    en: 'A web developer experienced in building modern applications using the latest technologies.',
    id: 'Seorang pengembang web yang berpengalaman dalam membangun aplikasi modern menggunakan teknologi terkini.',
  },
  contact: {
    email: 'nadhif@example.com',
    github: 'https://github.com/nadhif',
    linkedin: 'https://linkedin.com/in/nadhif',
  },
};

// Format biodata ke dalam string
const formatBio = (bio, language) => `
**${bio.name}**
Role: ${bio.role}
Description: ${bio.description[language]}
Contact:
- GitHub: ${bio.contact.github}
- LinkedIn: ${bio.contact.linkedin}
- Email: ${bio.contact.email}
`;

// Respons bot dalam berbagai bahasa
const botResponses = {
  en: {
    hello: 'Hello! How can I assist you?',
    quickMessages: [
      { text: 'Hi!', response: 'Hi! How can I help you?' },
      { text: 'How are you?', response: 'I am good, how about you?' },
      {
        text: 'What is this app?',
        response: 'This is an interactive chatbot application.',
      },
      {
        text: 'Thank you!',
        response: 'You are welcome! If you have more questions, just ask.',
      },
      {
        text: 'Who created this?',
        response: (language) => formatBio(creatorBio, language), // Menampilkan biodata pembuat
      },
    ],
  },
  id: {
    hello: 'Halo! Bagaimana saya bisa membantu?',
    quickMessages: [
      { text: 'Halo!', response: 'Halo! Bagaimana saya bisa membantu?' },
      { text: 'Apa kabar?', response: 'Saya baik, bagaimana denganmu?' },
      {
        text: 'Apa aplikasi ini?',
        response: 'Ini adalah aplikasi chatbot interaktif.',
      },
      {
        text: 'Terima kasih!',
        response: 'Sama-sama! Jika ada pertanyaan lain, tanyakan saja.',
      },
      {
        text: 'Siapa yang membuat ini?',
        response: (language) => formatBio(creatorBio, language), // Menampilkan biodata pembuat
      },
    ],
  },
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // Default bahasa Inggris
  const [sessionId, setSessionId] = useState(null);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [typingMessage, setTypingMessage] = useState(''); // Pesan yang sedang diketik oleh bot

  useEffect(() => {
    // Generate atau ambil session ID dari localStorage
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
    }
    setSessionId(sessionId);

    // Ambil chat sessions dari localStorage
    const sessions =
      JSON.parse(localStorage.getItem(`chatSessions_${sessionId}`)) || [];

    // Jika tidak ada chat session, buat default chat
    if (sessions.length === 0) {
      const defaultChatId = Math.random().toString(36).substr(2, 9);
      const defaultChat = {
        id: defaultChatId,
        title: 'New Chat',
        timestamp: new Date(),
        isDefault: true,
      };
      const updatedSessions = [defaultChat];
      setChatSessions(updatedSessions);
      localStorage.setItem(
        `chatSessions_${sessionId}`,
        JSON.stringify(updatedSessions)
      );

      // Set default chat sebagai chat aktif
      setCurrentChatId(defaultChatId);
      setMessages([]);
      localStorage.setItem(`chat_${defaultChatId}`, JSON.stringify([]));
    } else {
      // Set chat terakhir sebagai chat aktif
      setChatSessions(sessions);
      setCurrentChatId(sessions[0].id);
      const chatMessages =
        JSON.parse(localStorage.getItem(`chat_${sessions[0].id}`)) || [];
      setMessages(chatMessages);
    }

    // Mendeteksi bahasa perangkat
    const userLanguage = navigator.language.split('-')[0]; // Ambil kode bahasa (misalnya, 'id' atau 'en')
    setLanguage(userLanguage === 'id' ? 'id' : 'en'); // Set bahasa sesuai yang terdeteksi
  }, []);

  useEffect(() => {
    // Fungsi untuk mengecek apakah layar lebih besar dari 768px
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Panggil saat komponen pertama kali dimuat
    checkScreenSize();

    // Event listener untuk resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup listener saat komponen unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const startNewChat = () => {
    const newChatId = Math.random().toString(36).substr(2, 9);
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      timestamp: new Date(),
      isDefault: false,
    };

    // Simpan chat session baru
    const updatedSessions = [newChat, ...chatSessions];
    setChatSessions(updatedSessions);
    localStorage.setItem(
      `chatSessions_${sessionId}`,
      JSON.stringify(updatedSessions)
    );

    // Set chat baru sebagai chat aktif
    setCurrentChatId(newChatId);
    setMessages([]);
    localStorage.setItem(`chat_${newChatId}`, JSON.stringify([]));
  };

  const sendMessage = async (text, response) => {
    if (!text.trim()) return;

    // Jika tidak ada chat aktif, gunakan default chat
    if (!currentChatId) {
      const defaultChatId = chatSessions[0].id; // Ambil ID dari default chat
      setCurrentChatId(defaultChatId);
    }

    const newMessages = [
      ...messages,
      { text, sender: 'user', timestamp: new Date() },
    ];
    setMessages(newMessages);
    localStorage.setItem(`chat_${currentChatId}`, JSON.stringify(newMessages));

    setInput('');
    setIsLoading(true); // Mulai loading

    // Simulasikan durasi loading berdasarkan panjang pesan
    const loadingDuration = Math.min(Math.max(text.length * 50, 800), 3000); // Durasi antara 800ms - 3000ms

    setTimeout(() => {
      const botResponse =
        typeof response === 'function' ? response(language) : response;

      // Efek typing untuk pesan bot
      let typedMessage = '';
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < botResponse.length) {
          typedMessage += botResponse[index];
          setTypingMessage(typedMessage);
          index++;
        } else {
          clearInterval(typingInterval);
          setTypingMessage(''); // Reset pesan typing
          const updatedMessages = [
            ...newMessages,
            { text: botResponse, sender: 'bot', timestamp: new Date() },
          ];
          setMessages(updatedMessages);
          localStorage.setItem(
            `chat_${currentChatId}`,
            JSON.stringify(updatedMessages)
          );
          setIsLoading(false);

          // Update judul chat jika ini adalah pesan pertama
          if (messages.length === 0) {
            const updatedSessions = chatSessions.map((chat) =>
              chat.id === currentChatId ? { ...chat, title: text } : chat
            );
            setChatSessions(updatedSessions);
            localStorage.setItem(
              `chatSessions_${sessionId}`,
              JSON.stringify(updatedSessions)
            );
          }
        }
      }, 50); // Kecepatan typing (ms per karakter)
    }, loadingDuration);
  };

  const handleSendMessage = () => {
    let response = botResponses[language].hello; // Default response

    // Deteksi kata kunci "nadhif" atau variasi lainnya
    if (input.toLowerCase().includes('nadhif')) {
      response = formatBio(creatorBio, language); // Tampilkan biodata jika kata kunci terdeteksi
    }

    sendMessage(input, response);
  };

  const deleteChat = (chatId) => {
    // Cek apakah chat adalah default chat
    const chatToDelete = chatSessions.find((chat) => chat.id === chatId);
    if (chatToDelete?.isDefault) {
      alert('Default chat cannot be deleted.');
      return;
    }

    const updatedSessions = chatSessions.filter((chat) => chat.id !== chatId);
    setChatSessions(updatedSessions);
    localStorage.setItem(
      `chatSessions_${sessionId}`,
      JSON.stringify(updatedSessions)
    );

    if (chatId === currentChatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  return (
    <div className="h-screen flex bg-gray-900">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -260 }}
        animate={{ x: showSidebar || isDesktop ? 0 : -260 }}
        transition={{ duration: 0.3 }}
        className="fixed md:relative top-0 left-0 h-full w-64 bg-gray-800 p-4 z-50 md:block"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <BotIcon /> Chat
          </h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden text-white"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="h-[75%] overflow-y-auto">
          {chatSessions.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 cursor-pointer rounded-lg text-gray-300 ${
                chat.id === currentChatId ? 'bg-cyan-600' : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={chat.title} // Gunakan judul sebagai key untuk memicu animasi
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      setCurrentChatId(chat.id);
                      const chatMessages =
                        JSON.parse(localStorage.getItem(`chat_${chat.id}`)) ||
                        [];
                      setMessages(chatMessages);
                      setShowSidebar(false);
                    }}
                  >
                    {chat.title}
                  </motion.span>
                </AnimatePresence>
                {!chat.isDefault && ( // Hanya tampilkan tombol hapus jika bukan default chat
                  <button
                    onClick={() => deleteChat(chat.id)}
                    className="p-1 text-gray-300 hover:text-red-500"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={startNewChat}
          className="w-full mt-4 p-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 flex items-center justify-center gap-2"
        >
          <Plus size={20} /> New Chat
        </button>
      </motion.div>

      {/* Chat Container */}
      <div className="flex flex-col w-full h-full">
        {/* Header Chat */}
        <div className="flex items-center gap-3 bg-gray-900 p-4 shadow-md">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden"
          >
            <Menu size={24} className="text-cyan-400" />
          </button>
          <Link href="/" className="p-2 rounded-lg hover:bg-gray-700">
            <ArrowLeft size={20} className="text-cyan-400" />
          </Link>
          <h1 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            JustChat
          </h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
            <div className="h-full flex flex-col justify-center items-center">
              <BotIcon className="w-16 h-16 text-cyan-400 mb-4" />
              <h2 className="text-2xl font-bold text-cyan-400">JustChat</h2>
              <p className="text-gray-300">Ask me anything...</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-center`}
            >
              {message.sender === 'bot' && <BotIcon />}
              <div
                className={`p-3 max-w-xs rounded-xl text-sm ${
                  message.sender === 'user'
                    ? 'bg-cyan-500 text-white rounded-br-none'
                    : 'bg-gray-700 text-gray-300 rounded-bl-none ml-2'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Pesan yang sedang diketik oleh bot */}
          {isLoading && (
            <div className="flex justify-start items-center">
              <BotIcon />
              <div className="p-3 max-w-xs rounded-xl text-sm bg-gray-700 text-gray-300 rounded-bl-none ml-2">
                {typingMessage}
                <span className="animate-blink">|</span> {/* Kursor berkedip */}
              </div>
            </div>
          )}
        </div>

        {/* Quick Messages */}
        <div className="flex gap-2 p-4 justify-start overflow-x-auto">
          {botResponses[language].quickMessages.map(({ text, response }) => (
            <button
              key={text}
              onClick={() =>
                sendMessage(
                  text,
                  typeof response === 'function' ? response(language) : response
                )
              }
              className="p-2 px-4 bg-gray-700 text-white rounded-lg whitespace-nowrap hover:bg-gray-600"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Input Chat */}
        <div className="flex gap-2 p-4 bg-gray-900">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-3 rounded-lg bg-gray-700 text-gray-300 outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-cyan-500 rounded-lg hover:bg-cyan-600"
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;

'use client';

import { useState, useEffect } from 'react';
import { Send, ArrowLeft, Menu, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

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
    ],
  },
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // Default bahasa Inggris

  useEffect(() => {
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

  useEffect(() => {
    const chatRef = collection(db, 'chats');
    const q = query(chatRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatSessions(chatData);
      if (!currentChatId && chatData.length > 0) {
        setCurrentChatId(chatData[0].id);
      }
    });

    return () => unsubscribe();
  }, [currentChatId]);

  useEffect(() => {
    if (!currentChatId) return;
    const messagesRef = collection(db, `chats/${currentChatId}/messages`);
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [currentChatId]);

  const sendMessage = async (text, response) => {
    if (!text.trim()) return;

    let chatId = currentChatId;
    if (!chatId) {
      const newChatRef = await addDoc(collection(db, 'chats'), {
        title: text,
        timestamp: new Date(),
      });
      chatId = newChatRef.id;
      setCurrentChatId(chatId);
    }

    await addDoc(collection(db, `chats/${chatId}/messages`), {
      text,
      sender: 'user',
      timestamp: new Date(),
    });

    setInput('');
    setIsLoading(true); // Mulai loading

    // Simulasikan durasi loading berdasarkan panjang pesan
    const loadingDuration = Math.min(Math.max(text.length * 50, 800), 3000); // Durasi antara 800ms - 3000ms

    setTimeout(async () => {
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      });
      setIsLoading(false);
    }, loadingDuration);
  };

  const handleSendMessage = () => {
    const response = botResponses[language].hello; // Ambil respons sesuai bahasa
    sendMessage(input, response);
  };

  const startNewChat = async () => {
    const newChatRef = await addDoc(collection(db, 'chats'), {
      title: 'New Chat',
      timestamp: new Date(),
    });
    setCurrentChatId(newChatRef.id);
  };

  return (
    <div className="h-screen flex bg-gray-900">
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

        <ul className="h-[85%] overflow-y-auto">
          {chatSessions.map((chat) => (
            <li
              key={chat.id}
              onClick={() => {
                setCurrentChatId(chat.id);
                setShowSidebar(false);
              }}
              className={`p-2 cursor-pointer rounded-lg text-gray-300 ${
                chat.id === currentChatId ? 'bg-cyan-600' : 'hover:bg-gray-700'
              }`}
            >
              {chat.title}
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
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-center`}
            >
              {message.sender === 'bot' && <BotIcon />}
              <div
                className={`p-3 max-w-xs rounded-xl text-sm ${message.sender === 'user' ? 'bg-cyan-500 text-white rounded-br-none' : 'bg-gray-700 text-gray-300 rounded-bl-none ml-2'}`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start items-center">
              <BotIcon />
              <div className="p-3 max-w-xs rounded-xl text-sm bg-gray-700 text-gray-300 rounded-bl-none ml-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Messages */}
        <div className="flex gap-2 p-4 justify-start overflow-x-auto">
          {botResponses[language].quickMessages.map(({ text, response }) => (
            <button
              key={text}
              onClick={() => sendMessage(text, response)}
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
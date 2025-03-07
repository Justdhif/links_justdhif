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
} from 'lucide-react';
import Link from 'next/link';

// Ikon Bot SVG
const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-teal-500"
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
      {
        text: 'Who created this?',
        response:
          'This app was created by Nadhif Rahman, a Full Stack Developer. You can find more about me on [GitHub](https://github.com/nadhif) or [LinkedIn](https://linkedin.com/in/nadhif).',
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
        response:
          'Aplikasi ini dibuat oleh Nadhif Rahman, seorang Full Stack Developer. Anda dapat menemukan lebih banyak tentang saya di [GitHub](https://github.com/nadhif) atau [LinkedIn](https://linkedin.com/in/nadhif).',
      },
    ],
  },
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [typingMessage, setTypingMessage] = useState('');
  const [typingIntervalId, setTypingIntervalId] = useState(null);

  useEffect(() => {
    // Ambil pesan dari localStorage saat komponen dimuat
    const savedMessages =
      JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(savedMessages);

    // Set bahasa berdasarkan preferensi pengguna
    const userLanguage = navigator.language.split('-')[0];
    setLanguage(userLanguage === 'id' ? 'id' : 'en');
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
            className="text-teal-500 underline hover:text-teal-600"
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
    <div className="h-screen flex flex-col bg-gray-900 px-80">
      {/* Header */}
      <div className="flex items-center justify-start p-4 shadow-sm">
        <Link href="/" className="p-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={20} className="text-teal-500" />
        </Link>
        <h1 className="text-xl font-bold text-teal-500 flex items-center gap-2">
          <BotIcon /> JustChat
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <div className="h-full flex flex-col justify-center items-center">
            <BotIcon className="w-16 h-16 text-teal-500 mb-4" />
            <h2 className="text-2xl font-bold text-teal-500">JustChat</h2>
            <p className="text-gray-600">Ask me anything...</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            id={`message-${index}`} // Tambahkan id unik
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start`}
          >
            {message.sender === 'bot' && (
              <div className="flex-shrink-0">
                <BotIcon />
              </div>
            )}
            <div
              className={`max-w-xs rounded-xl text-sm ${
                message.sender === 'user'
                  ? 'bg-teal-500 text-white rounded-br-none p-3'
                  : 'text-gray-300 p-1 pl-2'
              }`}
            >
              {message.sender === 'bot' ? (
                <div className="flex flex-col gap-2">
                  {formatBotResponse(message.text)}
                  {/* Tombol Sosial Media */}
                  {message.text.includes('GitHub') && (
                    <a
                      href="https://github.com/nadhif"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                  {message.text.includes('LinkedIn') && (
                    <a
                      href="https://linkedin.com/in/nadhif"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  )}
                  {message.text.includes('Email') && (
                    <a
                      href="mailto:nadhif@example.com"
                      className="flex items-center gap-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <Mail size={16} /> Email
                    </a>
                  )}
                </div>
              ) : (
                message.text
              )}
            </div>
          </div>
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

      {/* Quick Messages */}
      <div className="flex gap-2 p-4 justify-start overflow-x-auto">
        {botResponses[language].quickMessages.map(({ text, response }) => (
          <button
            key={text}
            onClick={() => sendMessage(text, response)}
            className="p-2 px-4 bg-teal-500 text-white rounded-lg whitespace-nowrap hover:bg-teal-600"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Input Chat */}
      <div className="flex flex-col gap-2 p-4 mb-4 bg-gray-800 rounded-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent focus:outline-none mb-4 text-white"
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center px-4 py-2 border border-gray-600 rounded-full font-bold text-white">
            JustChat
          </div>
          <button
            onClick={isLoading ? stopTyping : handleSendMessage}
            className="p-3 bg-teal-500 rounded-full hover:bg-teal-600"
          >
            {isLoading ? (
              <Square size={20} className="text-white" fill="currentColor" />
            ) : (
              <Send size={20} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;

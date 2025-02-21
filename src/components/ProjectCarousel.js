'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import icon dari lucide-react

const projects = [
  {
    id: 1,
    title: 'Justnews',
    description:
      'A modern social media platform built with Laravel & Tailwind CSS.',
    image: '/images/projects/justnews.png',
  },
  {
    id: 2,
    title: 'Justlink',
    description: 'An interactive linktree website using React.',
    image: '/images/projects/justlink.png',
  },
];

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 untuk next, -1 untuk prev

  const nextProject = () => {
    setDirection(1); // Geser ke kiri
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1); // Geser ke kanan
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">My Projects</h2>

      <div className="relative overflow-hidden h-80">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={projects[currentIndex].id}
            initial={{ x: direction * 100, opacity: 0 }} // Geser sesuai arah masuk
            animate={{ x: 0, opacity: 1 }} // Muncul di tengah
            exit={{ x: direction * -100, opacity: 0 }} // Pergi ke arah lawan
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex flex-col items-center"
          >
            <img
              src={projects[currentIndex].image}
              alt={projects[currentIndex].title}
              className="w-full h-[220px] object-cover"
            />
            <h3 className="text-lg font-semibold text-white mt-3">
              {projects[currentIndex].title}
            </h3>
            <p className="text-gray-300 text-sm">
              {projects[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tombol Navigasi */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevProject}
          className="flex items-center justify-center w-10 h-10 bg-purple-500/80 rounded-full shadow-md hover:bg-purple-400 transition-all duration-300"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={nextProject}
          className="flex items-center justify-center w-10 h-10 bg-purple-500/80 rounded-full shadow-md hover:bg-purple-400 transition-all duration-300"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;

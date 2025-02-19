"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Justnews",
    description: "A modern social media platform built with Laravel & Tailwind CSS.",
    image: "/images/projects/justnews.png",
  },
  {
    id: 2,
    title: "Justlink",
    description: "An interactive linktree website using React.",
    image: "/images/projects/justlink.png",
  },
];

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">My Projects</h2>

      <div className="relative overflow-hidden h-72">
        <AnimatePresence mode="wait">
          <motion.div
            key={projects[currentIndex].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex flex-col items-center"
          >
            <img
              src={projects[currentIndex].image}
              alt={projects[currentIndex].title}
              className="w-full h-52 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold text-white mt-3">{projects[currentIndex].title}</h3>
            <p className="text-gray-300 text-sm">{projects[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button onClick={prevProject} className="bg-purple-500 text-white px-4 py-2 rounded-lg">
          Prev
        </button>
        <button onClick={nextProject} className="bg-purple-500 text-white px-4 py-2 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
}

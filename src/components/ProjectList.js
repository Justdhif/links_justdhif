'use client';

import Link from 'next/link';

const projects = [
  {
    name: '💌 Secret Compliments',
    url: 'https://secret-compliments.vercel.app/',
    description: 'Website berisi pujian rahasia ❤️',
    gradient: 'from-pink-500 to-red-500',
  },
  {
    name: '🏫 Class Portfolio',
    url: 'https://class-porto-next.vercel.app/',
    description: 'Website portofolio kelas yang elegan 🎓',
    gradient: 'from-blue-500 to-indigo-500',
  },
];

const ProjectList = () => {
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center mt-8 gap-4">
      <h1 className="text-2xl font-bold text-center">🎉 Projects 🎉</h1>

      {projects.map((project, index) => (
        <Link
          key={index}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className='w-full'
        >
          <button
            className={`py-4 px-6 w-full rounded-xl text-white font-semibold shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r ${project.gradient}`}
          >
            <p className="text-lg">{project.name}</p>
            <p className="text-sm opacity-80">{project.description}</p>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;

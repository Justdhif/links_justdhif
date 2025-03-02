'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaravel,
  faPhp,
  faJs,
  faReact,
  faHtml5,
  faCss3,
  faBootstrap,
  faGithub,
  faGitlab,
  faFigma,
} from '@fortawesome/free-brands-svg-icons';

const techStacks = [
  { id: 1, icon: faCss3, name: 'CSS3', color: '#1572B6' },
  { id: 2, icon: faBootstrap, name: 'Bootstrap', color: '#7952B3' },
  { id: 3, icon: faLaravel, name: 'Laravel', color: '#FF2D20' },
  { id: 4, icon: faPhp, name: 'PHP', color: '#777BB3' },
  { id: 5, icon: faJs, name: 'JavaScript', color: '#F7DF1E' },
  { id: 6, icon: faReact, name: 'React', color: '#61DAFB' },
  { id: 7, icon: faHtml5, name: 'HTML5', color: '#E34F26' },
  { id: 8, icon: faGithub, name: 'GitHub', color: '#181717' },
  { id: 9, icon: faGitlab, name: 'Gitlab', color: '#F05032' },
  { id: 10, icon: faFigma, name: 'Figma', color: '#181717' },
];

const TechIcons = () => {
  return (
    <div className="w-full justify-center">
      <h1 className="text-2xl font-bold text-center">⚒️ Tech stack ⚒️</h1>
      <p className='text-center'>Web development tech stack</p>

      <div className="relative w-full py-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-28 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

        <div className="w-full flex flex-col gap-5">
          {/* Baris pertama (kanan ke kiri) */}
          <div className="flex w-full overflow-hidden relative">
            <div className="flex animate-marquee">
              {[...techStacks, ...techStacks].map((item, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 py-2 px-4 flex items-center justify-center gap-2 rounded-full shadow-md mx-3"
                  style={{ backgroundColor: item.color }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="w-6 h-6 text-white"
                  />
                  <p className="text-md font-semibold text-white">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Baris kedua (kiri ke kanan) */}
          <div className="flex w-full overflow-hidden relative">
            <div className="flex animate-marquee-reverse mt-2">
              {[...techStacks, ...techStacks].map((item, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 py-2 px-4 flex items-center justify-center gap-2 rounded-full shadow-md mx-3"
                  style={{ backgroundColor: item.color }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="w-6 h-6 text-white"
                  />
                  <p className="text-md font-semibold text-white">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechIcons;

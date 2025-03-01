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
} from '@fortawesome/free-brands-svg-icons';

const icons = [
  { icon: faLaravel, color: '#FF2D20', name: 'Laravel' },
  { icon: faPhp, color: '#777BB4', name: 'PHP' },
  { icon: faJs, color: '#F7DF1E', name: 'JavaScript' },
  { icon: faReact, color: '#61DAFB', name: 'React' },
  { icon: faHtml5, color: '#E34F26', name: 'HTML5' },
  { icon: faCss3, color: '#1572B6', name: 'CSS3' },
  { icon: faBootstrap, color: '#7952B3', name: 'Bootstrap' },
];

const TechIcons = () => {
  return (
    <div className="grid grid-cols-4 gap-6 place-items-center text-center">
      {icons.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="w-16 h-16 flex items-center justify-center rounded-lg shadow-md"
            style={{ backgroundColor: item.color }}
          >
            <FontAwesomeIcon icon={item.icon} className="w-8 h-8 text-white" />
          </div>
          <span className="mt-2 text-sm font-semibold">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TechIcons;

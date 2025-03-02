'use client';

import { useState, useRef } from 'react';
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

const initialIcons = [
  { id: 1, icon: faCss3, color: '#1572B6', name: 'CSS3', x: 20, y: 30 },
  {
    id: 2,
    icon: faBootstrap,
    color: '#7952B3',
    name: 'Bootstrap',
    x: 150,
    y: 30,
  },
  { id: 3, icon: faLaravel, color: '#FF2D20', name: 'Laravel', x: 50, y: 100 },
  { id: 4, icon: faJs, color: '#F7DF1E', name: 'JavaScript', x: 200, y: 100 },
  { id: 5, icon: faReact, color: '#61DAFB', name: 'React', x: 120, y: 160 },
  { id: 6, icon: faPhp, color: '#777BB4', name: 'PHP', x: 20, y: 210 },
  { id: 7, icon: faHtml5, color: '#E34F26', name: 'HTML5', x: 200, y: 210 },
];

const TechIcons = () => {
  const [icons, setIcons] = useState(initialIcons);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = (e, id) => {
    const icon = icons.find((icon) => icon.id === id);
    if (icon) {
      setDragging(id);
      setOffset({
        x: e.clientX - icon.x,
        y: e.clientY - icon.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging !== null) {
      setIcons((prevIcons) =>
        prevIcons.map((icon) =>
          icon.id === dragging
            ? { ...icon, x: e.clientX - offset.x, y: e.clientY - offset.y }
            : icon
        )
      );
    }
  };

  const handleMouseUp = () => {
    if (dragging !== null) {
      const container = containerRef.current?.getBoundingClientRect();
      const icon = icons.find((icon) => icon.id === dragging);

      if (icon && container) {
        const isOutside =
          icon.x < container.left ||
          icon.x > container.right ||
          icon.y < container.top ||
          icon.y > container.bottom;

        if (isOutside) {
          // Kembalikan ke posisi awal jika di luar kontainer
          setIcons((prevIcons) =>
            prevIcons.map((i) =>
              i.id === dragging
                ? initialIcons.find((init) => init.id === i.id) // Kembali ke posisi awal
                : i
            )
          );
        }
      }
    }
    setDragging(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[350px] h-[280px] flex flex-wrap justify-center items-center mx-auto"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {icons.map((item) => (
        <div
          key={item.id}
          onMouseDown={(e) => handleMouseDown(e, item.id)}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            backgroundColor: item.color,
            cursor: 'grab',
            transition:
              dragging === item.id ? 'none' : 'transform 0.3s ease-in-out',
          }}
          className="flex items-center justify-center rounded-full shadow-md py-3 px-5 active:cursor-grabbing select-none"
        >
          <FontAwesomeIcon icon={item.icon} className="w-5 h-5 text-white" />
          <span className="text-sm font-semibold text-white ml-2">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TechIcons;

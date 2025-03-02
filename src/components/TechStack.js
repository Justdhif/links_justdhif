'use client';

import { useState, useRef, useEffect } from 'react';
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

const initialIcons = [
  { id: 1, icon: faCss3, color: '#1572B6', name: 'CSS3', x: 20, y: 15 },
  {
    id: 2,
    icon: faBootstrap,
    color: '#7952B3',
    name: 'Bootstrap',
    x: 185,
    y: 15,
  },
  { id: 3, icon: faLaravel, color: '#FF2D20', name: 'Laravel', x: 90, y: 80 },
  { id: 4, icon: faJs, color: '#F7DF1E', name: 'JavaScript', x: 290, y: 80 },
  { id: 5, icon: faReact, color: '#61DAFB', name: 'React', x: 20, y: 140 },
  { id: 6, icon: faPhp, color: '#777BB4', name: 'PHP', x: 200, y: 140 },
  { id: 7, icon: faHtml5, color: '#E34F26', name: 'HTML5', x: 95, y: 195 },
  { id: 8, icon: faGithub, color: '#181717', name: 'GitHub', x: 390, y: 15 },
  { id: 9, icon: faGitlab, color: '#FC6D26', name: 'GitLab', x: 390, y: 140 },
  { id: 11, icon: faFigma, color: '#181717', name: 'Figma', x: 295, y: 195 },
];

const TechIcons = () => {
  const [icons, setIcons] = useState(initialIcons);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [smoothReset, setSmoothReset] = useState(false);
  const containerRef = useRef(null);

  // Mulai drag (Mouse & Touch)
  const handleStart = (e, id) => {
    const isTouch = e.type === 'touchstart';
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    const icon = icons.find((icon) => icon.id === id);
    if (icon) {
      setDragging(id);
      setOffset({
        x: clientX - icon.x,
        y: clientY - icon.y,
      });
      setSmoothReset(false); // Hapus efek transisi saat mulai drag
    }
  };

  // Saat drag (Mouse & Touch)
  const handleMove = (e) => {
    if (dragging !== null) {
      const isTouch = e.type === 'touchmove';
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      setIcons((prevIcons) =>
        prevIcons.map((icon) =>
          icon.id === dragging
            ? { ...icon, x: clientX - offset.x, y: clientY - offset.y }
            : icon
        )
      );

      e.preventDefault(); // Mencegah scroll saat drag di mobile
    }
  };

  // Selesai drag (Mouse & Touch)
  const handleEnd = () => {
    if (dragging !== null) {
      const container = containerRef.current?.getBoundingClientRect();
      const icon = icons.find((icon) => icon.id === dragging);

      if (icon && container) {
        const isOutside =
          icon.x < 0 ||
          icon.x > container.width - 50 ||
          icon.y < 0 ||
          icon.y > container.height - 50;

        if (isOutside) {
          // Aktifkan transisi sebelum mengembalikan ke posisi awal
          setSmoothReset(true);
          setIcons((prevIcons) =>
            prevIcons.map((i) =>
              i.id === dragging
                ? initialIcons.find((init) => init.id === i.id)
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
      className="relative w-full h-[250px] flex justify-center mx-auto"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {icons.map((item) => (
        <div
          key={item.id}
          onMouseDown={(e) => handleStart(e, item.id)}
          onTouchStart={(e) => handleStart(e, item.id)}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            backgroundColor: item.color,
            cursor: 'grab',
            transition: smoothReset
              ? 'left 0.5s ease-out, top 0.5s ease-out'
              : 'none',
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

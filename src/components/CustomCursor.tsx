import { useState, useEffect, useCallback } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX - 6, y: e.clientY - 6 });
    setRingPos({ x: e.clientX - 20, y: e.clientY - 20 });
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, handleMouseMove]);

  if (isMobile) return null;

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: pos.x,
          top: pos.y,
          transform: isHovering ? 'scale(2.5)' : 'scale(1)',
          opacity: isHovering ? 0.8 : 1,
        }}
      />
      <div
        className="custom-cursor-ring"
        style={{
          left: ringPos.x,
          top: ringPos.y,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          borderColor: isHovering ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.5)',
        }}
      />
    </>
  );
}

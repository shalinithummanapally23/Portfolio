import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.15)',
  borderColor = 'rgba(56, 189, 248, 0.25)',
  tiltIntensity = 12,
  ...props
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const normalX = (x / width) * 2 - 1;
    const normalY = (y / height) * 2 - 1;

    setRotateX(-normalY * tiltIntensity);
    setRotateY(normalX * tiltIntensity);
    setGlarePosition({
      x: (x / width) * 100,
      y: (y / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="perspective-1000 w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 250,
          mass: 0.1,
        }}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 20px 40px -15px ${glowColor}, 0 0 20px 1px ${glowColor}`
            : '0 10px 30px -15px rgba(0,0,0,0.5)',
        }}
        className={`relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 transition-colors duration-300 overflow-hidden ${className}`}
        {...props}
      >
        {/* Dynamic Glare Reflection */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(circle 250px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.08), transparent 70%)`,
            }}
          />
        )}

        {/* Dynamic Border Glow on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl border transition-all duration-300"
            style={{ borderColor }}
          />
        )}

        {/* Card Content with 3D depth */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-20">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

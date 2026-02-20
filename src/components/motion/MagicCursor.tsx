import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function MagicCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });
  let particleId = 0;

  useEffect(() => {
    setIsMobile('ontouchstart' in window);
  }, []);

  const handleMove = useCallback((x: number, y: number) => {
    cursorX.set(x);
    cursorY.set(y);

    const id = particleId++;
    setParticles(prev => [...prev.slice(-15), { id, x, y }]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile, handleMove]);

  useEffect(() => {
    if (!isMobile) return;

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    };
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => window.removeEventListener('touchmove', onTouch);
  }, [isMobile, handleMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Glow cursor (desktop only) */}
      {!isMobile && (
        <motion.div
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            x: springX,
            y: springY,
            background: 'radial-gradient(circle, hsl(345 55% 42% / 0.4), transparent 70%)',
            boxShadow: '0 0 20px 8px hsl(345 55% 42% / 0.15)',
          }}
        />
      )}

      {/* Sparkle trail */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: -20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          {...{
            style: {
              left: p.x,
              top: p.y,
              background: Math.random() > 0.5
                ? 'hsl(345 55% 55%)'
                : 'hsl(38 70% 60%)',
            },
          }}
        />
      ))}
    </div>
  );
}

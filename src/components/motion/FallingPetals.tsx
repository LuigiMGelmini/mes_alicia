import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function FallingPetals() {
  const petals = useMemo(() =>
    Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      opacity: 0.1 + Math.random() * 0.15,
    })),
  []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute will-change-transform"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            width: petal.size,
            height: petal.size,
            borderRadius: '50% 0 50% 50%',
            background: `hsl(345 55% ${40 + Math.random() * 20}% / ${petal.opacity})`,
            rotate: petal.rotation,
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            y: { repeat: Infinity, duration: petal.duration, ease: 'linear', delay: petal.delay },
            rotate: { repeat: Infinity, duration: petal.duration, ease: 'linear', delay: petal.delay },
          }}
        />
      ))}
    </div>
  );
}

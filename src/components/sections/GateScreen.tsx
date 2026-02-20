import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import img6 from '@/assets/img6.jpeg';

interface GateScreenProps {
  onUnlock: () => void;
}

const UNLOCK_DATE = new Date('2026-02-24T00:00:00');

function calculateTimeLeft() {
  const now = new Date();
  const diff = UNLOCK_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-display text-4xl md:text-6xl text-gradient-rose"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <p className="font-body text-sm text-muted-foreground tracking-[0.2em] uppercase mt-1">
        {label}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 📸  PERSONALIZE AQUI — Foto da tela de bloqueio
// ═══════════════════════════════════════════════════════════
// Importe sua foto e ajuste objectPosition para enquadrar:
// import gatePhoto from '@/assets/sua-foto.jpg';
const gatePhoto: string | null = img6; // Substitua por sua foto importada
const gatePhotoPosition = '50% 60%'; // Ajuste: '50% 20%' = mais pra cima, '50% 80%' = mais pra baixo

export default function GateScreen({ onUnlock }: GateScreenProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = calculateTimeLeft();
      if (!t) {
        clearInterval(interval);
        setUnlocking(true);
        setTimeout(() => onUnlock(), 2500);
      } else {
        setTimeLeft(t);
      }
    }, 1000);

    if (!calculateTimeLeft()) {
      setUnlocking(true);
      setTimeout(() => onUnlock(), 2500);
    }

    return () => clearInterval(interval);
  }, [onUnlock]);

  return (
    <AnimatePresence>
      {!unlocking ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center px-6"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div className="relative z-10 max-w-lg w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              {/* Foto do casal */}
              <motion.div
                className="w-28 h-28 md:w-36 md:h-36 rounded-full mx-auto mb-8 overflow-hidden border-2 border-primary/30 glow-rose"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                {gatePhoto ? (
                  <img src={gatePhoto} alt="Nós" className="w-full h-full object-cover" style={{ objectPosition: gatePhotoPosition }} />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="font-body text-sm text-muted-foreground tracking-widest uppercase">Foto</span>
                  </div>
                )}
              </motion.div>

              <motion.p
                className="text-accent font-body text-sm tracking-[0.4em] uppercase mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                hehehe
              </motion.p>

              <motion.h2
                className="font-display text-3xl md:text-5xl text-gradient-rose mb-4 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Tenho algo preparado para você
              </motion.h2>

              <motion.p
                className="text-muted-foreground font-body text-lg mb-12 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Em breve você descobrira...
              </motion.p>
            </motion.div>

            {/* Countdown */}
            {timeLeft && (
              <motion.div
                className="flex items-center justify-center gap-4 md:gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <CountdownUnit value={timeLeft.days} label="Dias" />
                <span className="font-display text-2xl md:text-4xl text-primary/30 self-start mt-1">:</span>
                <CountdownUnit value={timeLeft.hours} label="Horas" />
                <span className="font-display text-2xl md:text-4xl text-primary/30 self-start mt-1">:</span>
                <CountdownUnit value={timeLeft.minutes} label="Min" />
                <span className="font-display text-2xl md:text-4xl text-primary/30 self-start mt-1">:</span>
                <CountdownUnit value={timeLeft.seconds} label="Seg" />
              </motion.div>
            )}

            <motion.p
              className="font-body text-base text-muted-foreground mt-10 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
            </motion.p>
            
            {/* Botão temporário para preview */}
            <motion.button
              onClick={() => { setUnlocking(true); setTimeout(() => onUnlock(), 800); }}
              className="mt-8 px-6 py-2 rounded-full border border-primary/30 text-primary/60 font-body text-sm tracking-widest uppercase hover:bg-primary/10 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              Pular para preview →
            </motion.button>

          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          onAnimationComplete={onUnlock}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.p
              className="font-display text-3xl text-gradient-rose"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Bem-vinda, Alicia ♥
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

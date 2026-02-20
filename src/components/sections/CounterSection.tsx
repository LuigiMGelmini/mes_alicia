import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

// Start date (local time) - adjust as needed
// 24/01/2026 (month is 0-indexed: 0 = January)
const START_DATE = new Date(2026, 0, 24, 0, 0, 0);

function calculateTimeTogether() {
  const now = new Date();
  const diff = now.getTime() - START_DATE.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function CounterUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-display text-4xl md:text-6xl lg:text-7xl text-gradient-rose"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <p className="font-body text-sm md:text-base text-muted-foreground tracking-[0.2em] uppercase mt-2">
        {label}
      </p>
    </div>
  );
}

export default function CounterSection() {
  const [time, setTime] = useState(calculateTimeTogether());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeTogether());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-romantic" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-6"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart className="w-6 h-6 text-primary fill-primary" />
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl text-gradient-gold mb-12">
            Anotei cada segundo ao seu lado
          </h2>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6 md:gap-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <CounterUnit value={time.days} label="Dias" />
          <span className="font-display text-3xl md:text-5xl text-primary/40 self-start mt-2">:</span>
          <CounterUnit value={time.hours} label="Horas" />
          <span className="font-display text-3xl md:text-5xl text-primary/40 self-start mt-2">:</span>
          <CounterUnit value={time.minutes} label="Min" />
          <span className="font-display text-3xl md:text-5xl text-primary/40 self-start mt-2">:</span>
          <CounterUnit value={time.seconds} label="Seg" />
        </motion.div>

        <motion.p
          className="font-body text-xl text-foreground/50 italic mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          ...parece anos e não apenas 1 mês kkkkk
        </motion.p>
      </div>
    </section>
  );
}

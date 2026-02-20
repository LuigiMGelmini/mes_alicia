import { motion } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';

const ConfettiExplosion = lazy(() => import('@/components/motion/ConfettiExplosion'));

const reasons = [
  "Sua entrega e temor a Cristo",
  "Sua maturidade e como lida com as coisas",
  "Seu jeito meio bobo",
  "Seu sorriso lindo",
  "Sua humildade",
  "Seus abraços",
  "Sua identidade firmada",
  "Sua inteligência e sabedoria",
  "Seus olhos",
  "VOCÊ TODAAAAAAAAA",
];

export default function ReasonsSection() {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [allRevealed, setAllRevealed] = useState(false);

  function toggleReveal(index: number) {
    setRevealed(prev => {
      const next = prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
      if (next.length === reasons.length && !allRevealed) {
        setAllRevealed(true);
      }
      return next;
    });
  }

  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(38,70%,10%)] to-background opacity-40" />

      <Suspense fallback={null}>
        <ConfettiExplosion trigger={allRevealed} />
      </Suspense>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
            Declaração
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-gold mb-4">
            10 coisas que admiro em você
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Toque em cada item para revelar
          </p>
        </motion.div>

        <div className="space-y-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="cursor-pointer"
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              onClick={() => toggleReveal(i)}
            >
              <motion.div
                className={`relative p-5 rounded-xl border transition-all duration-500 ${
                  revealed.includes(i)
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-border/20 bg-card/30 hover:border-primary/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl text-gradient-gold w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <motion.p
                    className="font-body text-xl"
                    animate={{
                      opacity: revealed.includes(i) ? 1 : 0.3,
                      filter: revealed.includes(i) ? 'blur(0px)' : 'blur(6px)',
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-foreground/90">{reason}</span>
                  </motion.p>

                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

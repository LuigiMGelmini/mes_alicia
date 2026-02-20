import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import finalBg from '@/assets/final-bg.jpg';
import img13 from '@/assets/img13.jpeg';

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="text-primary">|</motion.span>
      )}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// 📸  PERSONALIZE AQUI — Foto da seção final
// ═══════════════════════════════════════════════════════════
// import finalPhoto from '@/assets/foto-final.jpg';
const finalPhoto: string | null = img13;
const finalPhotoPosition = '50% 30%';

export default function FinalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={finalBg} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background" />
      </div>

      <motion.div style={{ scale, opacity }} className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Foto final */}
          <motion.div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-8 overflow-hidden border-2 border-primary/30 glow-rose"
          >
            {finalPhoto ? (
              <img src={finalPhoto} alt="Nós" className="w-full h-full object-cover" style={{ objectPosition: finalPhotoPosition }} />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="font-body text-xs text-muted-foreground tracking-wider">Foto</span>
              </div>
            )}
          </motion.div>

          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient-rose mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Te Amo minha Gatinha
          </motion.h2>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="font-body text-xl md:text-2xl text-foreground/80 leading-relaxed italic">
              <TypewriterText
                text="Você é a mulher que eu escolhi para passar o resto da minha vida, que foi Deus quem nos direcionou a esse relacionamento, a mulher que me motiva todos os dias, e a escolha, que se eu perdesse a memoria, eu faria todos os dias sem pensar duas vezes."
                delay={1}
              />
            </p>

            <p className="font-body text-lg md:text-xl text-foreground/60 leading-relaxed">
              De primeira do fã clube a pisar no meu pé e profetizar, nos tornamos lideres juntos, e hoje, somos um casal, em que tenho muito a te agradecer, por me ensinar todos os dias, e, por escolher me amar e aturar kkkkkkk, e com toda a certeza do mundo eu te digo, Alicia, eu vou me casar com você futuramente.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent">
              Com Amor
            </p>
            <p className="font-display text-3xl md:text-4xl text-gradient-gold">
              Alicio.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

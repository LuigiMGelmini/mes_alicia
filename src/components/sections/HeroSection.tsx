import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.jpg';
import img6 from '@/assets/img6.jpeg';
// ═══════════════════════════════════════════════════════════
// 📸  PERSONALIZE AQUI — Foto e fundo do Hero
// ═══════════════════════════════════════════════════════════
// import heroPhoto from '@/assets/sua-foto-hero.jpg';
const heroPhoto: string | null = img6;
const heroPhotoPosition = '100% 50%'; // Ajuste o enquadramento

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-8 overflow-hidden border-2 border-primary/30 glow-rose"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            {heroPhoto ? (
              <img src={heroPhoto} alt="Nós" className="w-full h-full object-cover" style={{ objectPosition: heroPhotoPosition }} />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="font-body text-sm text-muted-foreground tracking-widest uppercase">foto</span>
              </div>
            )}
          </motion.div>

          <motion.p
            className="text-rose-soft font-body text-lg md:text-xl tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Fiz isso como um presentinho
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-rose leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Pra minha gatinha
          </motion.h1>

          <motion.p
            className="font-body text-xl md:text-2xl text-foreground/80 italic leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            "Eu escolho te amar todos os dias da minha vida, mesmo que esse sentimento seja culpa sua, ninguém mandou pisar no meu pé, eu te amo meu amor"
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}

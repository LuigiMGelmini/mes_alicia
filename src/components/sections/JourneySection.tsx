import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import img7 from '@/assets/img7.jpeg';
import img8 from '@/assets/img8.jpeg';
import img9 from '@/assets/img9.jpeg';

interface StoryMoment {
  title: string;
  subtitle: string;
  text: string;
  accent: string;
  // 📸 Substitua null pela foto importada e ajuste objectPosition
  photo: string | null;
  photoPosition: string;
}

// ═══════════════════════════════════════════════════════════
// 📸  PERSONALIZE AQUI — Fotos de cada momento
// ═══════════════════════════════════════════════════════════
// import fotoFaClube from '@/assets/foto-fa-clube.jpg';
// import fotoPisada from '@/assets/foto-pisada.jpg';
// import fotoReishit from '@/assets/foto-reishit.jpg';

const moments: StoryMoment[] = [
  {
    title: "A Pisada Profética",
    subtitle: "Deuteronômio 11:24",
    text: "'Todo o lugar que pisar a planta do vosso pé será vosso;' E assim é o inicio da nosso namoro, onde uma mulher chamada Alicia, pisou no meu pé e profetizou que estaria comigo, e deu certo parabanes profeta, me senti um patinho na sua mão.",
    accent: "from-primary to-rose-soft",
    photo: img7,
    photoPosition: '50% 100%',
  },
  {
    title: "Célula Reishit",
    subtitle: "Tiago 1:18",
    text: "A intensificação da nossa aproximação espirital e natural, onde já tinhamos uma amizade, porém foi onde fomos forjados e aproximados, e ainda somos, onde fomos elevados a outro nivel juntos e onde aprendemos diariamente como ajudar um ao outro tanto no natural quanto no espiritual.",
    accent: "from-gold to-gold-soft",
    photo: img8,
    photoPosition: '50% 40%',
  },
  {
    title: "O Pedido",
    subtitle: "1 Corintios 13:4-7",
    text: "'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade.' dia 24 de Janeiro de 2026, o dia que tive a certeza de que era você a pessoa que iria passar o resto de minha vida, e um dos dias mais felizes da minha vida.",
    accent: "from-rose-glow to-primary",
    photo: img9,
    photoPosition: '50% 30%',
  },
];

function StoryCard({ moment, index }: { moment: StoryMoment; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? '' : 'md:flex-row-reverse'
      }`}
    >
      <div className="flex-shrink-0">
        <motion.div
          className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/30 glow-rose"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {moment.photo ? (
            <img src={moment.photo} alt={moment.title} className="w-full h-full object-cover" style={{ objectPosition: moment.photoPosition }} />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${moment.accent} opacity-30 flex items-center justify-center`}>
              <span className="font-body text-sm text-foreground/60 tracking-wider text-center px-2">Foto</span>
            </div>
          )}
        </motion.div>
      </div>

      <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
        <motion.p
          className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {moment.subtitle}
        </motion.p>
        <h3 className="font-display text-3xl md:text-5xl text-gradient-rose mb-4">
          {moment.title}
        </h3>
        <p className="font-body text-lg md:text-xl text-foreground/75 leading-relaxed max-w-xl mx-auto md:mx-0">
          {moment.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 px-6 bg-gradient-romantic">
      <motion.div
        className="text-center mb-24 md:mb-32"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
          Inicio da nossa jornada
        </p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-rose">
          Momentos importantes na nossa história
        </h2>
      </motion.div>


      <div className="max-w-4xl mx-auto space-y-24 md:space-y-40">
        {moments.map((moment, i) => (
          <StoryCard key={i} moment={moment} index={i} />
        ))}
      </div>
    </section>
  );
}

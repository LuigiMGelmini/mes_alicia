import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useState } from 'react';
import memoryBg from '@/assets/memory-bg.jpg';
import img1 from '@/assets/img1.jpeg';
import img2 from '@/assets/img2.jpeg';
import img3 from '@/assets/img3.jpeg';
import img4 from '@/assets/img4.jpeg';
import img5 from '@/assets/img5.jpeg';
import img6 from '@/assets/img6.jpeg';
import img7 from '@/assets/img7.jpeg';
import img8 from '@/assets/img8.jpeg';
import img9 from '@/assets/img9.jpeg';
import img10 from '@/assets/img10.jpeg';
import img11 from '@/assets/img11.jpeg';
import img12 from '@/assets/img12.jpeg';
import img13 from '@/assets/img13.jpeg';

interface MemoryCard {
  id: number;
  title: string;
  text: string;
  // 📸 Substitua null pela foto importada
  photo: string | null;
  photoPosition: string;
}

// ═══════════════════════════════════════════════════════════
// 📸  PERSONALIZE AQUI — Fotos dos cartões de memória
// ═══════════════════════════════════════════════════════════
// import foto1 from '@/assets/memoria-1.jpg';
// etc.

const memories: MemoryCard[] = [
  { id: 1, title: "Jantar de Noivinhos", text: "Como eu queria sumir esse dia, foi tipo dia top vergonhas, onde estavamos já oficialmente namorando e ninguem sabia ainda, E FOMOS ASSUNTO NA MESA DO PASTOR POR UM TEMPO, quase tive um AVC paulista, mas foi legal pois eu estava com você", photo: img12, photoPosition: '50% 30%' },
  { id: 2, title: "A Valsa", text: "Acho que nem tem muito o que comentar kkkkkkkkkkkk, era dois envergonhados dançando, parecia que estavamos nos evitando kkkkkk, mas eu amei poder dança com você em um momento tão especial", photo: img10, photoPosition: '50% 40%' },
  { id: 3, title: "Festa de Formatura", text: "O Dia do pedido, onde era pra eu ir ai depois não era depois era de novo depois não dava e no fim meu sogrão fortaleceu no convite.", photo: img4, photoPosition: '50% 30%' },
  { id: 4, title: "Sua colação", text: "Onde praticamente nos assumimos como um casal oficialmente (só pq tinha bastante gente da igreja lá).", photo: img2, photoPosition: '50% 30%' },
  { id: 5, title: "Papos no Carro", text: "Lembro como se fosse a alguns dias atrás em que ficavamos batendo longos papos no carro (foi a alguns dias mesmo kkkk)", photo: img3, photoPosition: '50% 50%' },
];

function DraggableCard({ card, index, totalCards, onDismiss }: {
  card: MemoryCard; index: number; totalCards: number; onDismiss: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const stackOffset = (totalCards - 1 - index) * 4;
  const stackScale = 1 - (totalCards - 1 - index) * 0.03;
  const isTop = index === totalCards - 1;

  function handleDragEnd(_: any, info: PanInfo) {
    if (Math.abs(info.offset.x) > 120) onDismiss();
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x: isTop ? x : 0, rotate: isTop ? rotate : 0, opacity: isTop ? opacity : 1, zIndex: index }}
      initial={{ y: stackOffset, scale: stackScale }}
      animate={{ y: stackOffset, scale: stackScale }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileHover={isTop ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="w-full h-full rounded-2xl border border-border/30 backdrop-romantic overflow-hidden flex flex-col items-center justify-center p-8 md:p-12 text-center">
        {/* Foto do cartão */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary/30 mb-6">
          {card.photo ? (
            <img src={card.photo} alt={card.title} className="w-full h-full object-cover" style={{ objectPosition: card.photoPosition }} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center">
              <span className="font-body text-xs text-muted-foreground tracking-wider">Foto</span>
            </div>
          )}
        </div>
        <h4 className="font-display text-2xl md:text-3xl text-gradient-gold mb-4">{card.title}</h4>
        <p className="font-body text-lg text-foreground/75 leading-relaxed max-w-sm">{card.text}</p>
        {isTop && (
          <p className="mt-8 text-muted-foreground text-sm font-body tracking-wider">← arraste para o lado →</p>
        )}
      </div>
    </motion.div>
  );
}

export default function MemoryDeck() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const visibleCards = memories.filter((c) => !dismissed.includes(c.id));

  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={memoryBg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">Memórias</p>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-rose mb-4">Alguns momentos nosso</h2>
          <p className="font-body text-lg text-muted-foreground">Arraste os cartões para o lado</p>
        </motion.div>

        <div className="relative w-full max-w-md mx-auto aspect-[3/4]">
          {visibleCards.length > 0 ? (
            visibleCards.map((card, i) => (
              <DraggableCard key={card.id} card={card} index={i} totalCards={visibleCards.length} onDismiss={() => setDismissed(prev => [...prev, card.id])} />
            ))
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-display text-2xl text-gradient-gold mb-6">Cada memória é um tesouro</p>
              <button onClick={() => setDismissed([])} className="font-body text-primary border border-primary/30 px-6 py-3 rounded-full hover:bg-primary/10 transition-colors tracking-wider">
                Ver novamente
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

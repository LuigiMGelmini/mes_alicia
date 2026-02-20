import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════
// 📸  PERSONALIZE AQUI — Fotos das citações
// ═══════════════════════════════════════════════════════════
// import quotePhoto1 from '@/assets/quote-1.jpg';

const quotes = [
  { text: "Você é a razão dos meus sorrisos mais sinceros.", photo: null as string | null, photoPosition: '50% 30%' },
  { text: "Cada segundo ao seu lado vale uma eternidade.", photo: null as string | null, photoPosition: '50% 40%' },
  { text: "Meu coração encontrou seu lar em você.", photo: null as string | null, photoPosition: '50% 50%' },
  { text: "Você transformou meu mundo em poesia.", photo: null as string | null, photoPosition: '50% 30%' },
];

export default function LoveQuotesSection() {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(345,45%,12%)] to-background" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">Sussurros</p>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-rose">Palavras do Coração</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quotes.map((quote, i) => (
            <motion.div
              key={i}
              className="group relative p-8 rounded-2xl border border-border/20 backdrop-romantic overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Foto */}
              <div className="w-14 h-14 rounded-full overflow-hidden border border-primary/20 mb-4">
                {quote.photo ? (
                  <img src={quote.photo} alt="" className="w-full h-full object-cover" style={{ objectPosition: quote.photoPosition }} />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center">
                    <span className="font-body text-[10px] text-muted-foreground">Foto</span>
                  </div>
                )}
              </div>

              <p className="font-body text-xl md:text-2xl text-foreground/80 italic leading-relaxed">
                "{quote.text}"
              </p>

              <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-primary/20 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-primary/20 rounded-bl-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2 } from 'lucide-react';

// Coloque o .mp3 dentro de /public. Usar BASE_URL faz funcionar
// tanto em dev quanto se o site estiver hospedado em subpasta.
const MUSIC_URL = `${import.meta.env.BASE_URL}gt.mp3`;

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  async function toggleMusic() {
    setShowHint(false);

    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }

    // Alguns navegadores só permitem iniciar áudio se o elemento for criado/acionado via clique.
    if (!audioRef.current) {
      const audio = new Audio(MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.2;
      audioRef.current = audio;
    }

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (err) {
      // Se falhar (autoplay policy, arquivo não encontrado, etc.), não finge que está tocando.
      setPlaying(false);
      // Ajuda no debug pelo DevTools.
      console.warn('Não foi possível tocar a música:', err);
    }
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[110] flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-card/80 backdrop-blur-md border border-border/30 rounded-full px-4 py-2"
          >
            <p className="text-sm font-body text-foreground/70 whitespace-nowrap">
              🎵 Toque a música
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMusic}
        className="relative w-14 h-14 rounded-full bg-card/60 backdrop-blur-md border border-primary/30 flex items-center justify-center hover:bg-card/80 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {playing ? (
          <>
            <Volume2 className="w-5 h-5 text-primary" />
            {/* Animated music bars */}
            <div className="absolute -top-1 -right-1 flex gap-[2px]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-primary rounded-full"
                  animate={{ height: ['4px', '12px', '4px'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <Music className="w-5 h-5 text-muted-foreground" />
        )}
      </motion.button>
    </motion.div>
  );
}

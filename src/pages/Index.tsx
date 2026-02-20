import { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GateScreen = lazy(() => import('@/components/sections/GateScreen'));
const HeroSection = lazy(() => import('@/components/sections/HeroSection'));
const JourneySection = lazy(() => import('@/components/sections/JourneySection'));
const LoveQuotesSection = lazy(() => import('@/components/sections/LoveQuotesSection'));
const MemoryDeck = lazy(() => import('@/components/sections/MemoryDeck'));
const ReasonsSection = lazy(() => import('@/components/sections/ReasonsSection'));
const CounterSection = lazy(() => import('@/components/sections/CounterSection'));
const FinalSection = lazy(() => import('@/components/sections/FinalSection'));
const MusicPlayer = lazy(() => import('@/components/motion/MusicPlayer'));
const FallingPetals = lazy(() => import('@/components/motion/FallingPetals'));


function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-primary font-display text-2xl"
      >
        ♥
      </motion.div>
    </div>
  );
}

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          {!unlocked && (
            <GateScreen key="gate" onUnlock={() => setUnlocked(true)} />
          )}
        </AnimatePresence>

        <MusicPlayer />

        {unlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            
            <FallingPetals />
            <HeroSection />
            <JourneySection />
            
            <MemoryDeck />
            <ReasonsSection />
            <CounterSection />
            <FinalSection />
          </motion.div>
        )}
      </Suspense>
    </div>
  );
};

export default Index;

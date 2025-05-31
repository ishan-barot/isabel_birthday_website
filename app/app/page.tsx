
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingScene from '@/components/landing-scene';
import TreeAnimation from '@/components/tree-animation';
import BirthdayCountdown from '@/components/birthday-countdown';
import BirthdayMessage from '@/components/birthday-message';
import WordleGame from '@/components/wordle-game';

type AnimationPhase = 'landing' | 'bar' | 'tree' | 'countdown' | 'message' | 'complete';

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>('landing');
  const [musicStarted, setMusicStarted] = useState(false);

  const startMusic = () => {
    if (!musicStarted) {
      // Note: In a real implementation, you would add an audio file here
      // For now, we'll just track that music should be playing
      setMusicStarted(true);
    }
  };

  const handlePhaseTransition = (nextPhase: AnimationPhase) => {
    setCurrentPhase(nextPhase);
  };

  const handleStartJourney = () => {
    startMusic();
    setCurrentPhase('bar');
    
    // Sequence the animations
    setTimeout(() => setCurrentPhase('tree'), 1000);
    setTimeout(() => setCurrentPhase('countdown'), 8000);
    setTimeout(() => setCurrentPhase('message'), 12000);
    setTimeout(() => setCurrentPhase('complete'), 16000);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
      {/* Background Music (placeholder for actual audio file) */}
      {musicStarted && (
        <div className="hidden">
          {/* <audio autoPlay loop>
            <source src="/soft-instrumental.mp3" type="audio/mpeg" />
          </audio> */}
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentPhase === 'landing' && (
          <LandingScene key="landing" onStart={handleStartJourney} />
        )}
        
        {(currentPhase === 'bar' || currentPhase === 'tree') && (
          <TreeAnimation 
            key="tree" 
            phase={currentPhase}
            onPhaseComplete={handlePhaseTransition}
          />
        )}
        
        {currentPhase === 'countdown' && (
          <BirthdayCountdown 
            key="countdown"
            onComplete={() => handlePhaseTransition('message')}
          />
        )}
        
        {currentPhase === 'message' && (
          <BirthdayMessage 
            key="message"
            onComplete={() => handlePhaseTransition('complete')}
          />
        )}
        
        {currentPhase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-4"
          >
            <div className="max-w-4xl w-full">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl md:text-6xl font-bold script-font text-rose-pink mb-4">
                  Welcome to Your Special Day! 🎀
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Now that you've experienced your magical birthday journey, 
                  why not play today's special Wordle game? 
                  It's filled with all the beautiful words that remind me of you! 💕
                </p>
              </motion.div>
              
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <WordleGame />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

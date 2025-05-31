
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { ISABEL_BIRTH_DATE } from '@/lib/constants';

interface BirthdayCountdownProps {
  onComplete: () => void;
}

export default function BirthdayCountdown({ onComplete }: BirthdayCountdownProps) {
  const [daysSinceBirth, setDaysSinceBirth] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const today = new Date();
    const actualDays = differenceInDays(today, ISABEL_BIRTH_DATE);
    setDaysSinceBirth(actualDays);

    // Animate the counter
    let start = 0;
    const increment = actualDays / 100; // Animate over 100 steps
    const timer = setInterval(() => {
      start += increment;
      if (start >= actualDays) {
        setAnimatedCount(actualDays);
        clearInterval(timer);
        setTimeout(onComplete, 2000); // Wait 2 seconds before moving to next phase
      } else {
        setAnimatedCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Background floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-bold script-font text-rose-pink mb-8"
          animate={{
            textShadow: [
              '0 0 10px rgba(255, 182, 193, 0.5)',
              '0 0 20px rgba(255, 182, 193, 0.8)',
              '0 0 10px rgba(255, 182, 193, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          You've been amazing for
        </motion.h1>

        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring' }}
        >
          <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-pink via-cherry-blossom to-sunset-gold mb-4">
            {animatedCount.toLocaleString()}
          </div>
          
          <motion.div
            className="text-2xl md:text-3xl script-font text-gray-600"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            wonderful days
          </motion.div>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-gray-600 mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          May 31st, 2005 - The day you came into this world 👼✨
        </motion.p>

        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="text-4xl">🌸</div>
          </motion.div>
        </div>

        <div className="absolute -bottom-10 -right-10">
          <motion.div
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="text-4xl">🦋</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-sunset-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

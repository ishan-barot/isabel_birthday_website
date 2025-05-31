
'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface BirthdayMessageProps {
  onComplete: () => void;
}

export default function BirthdayMessage({ onComplete }: BirthdayMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Magical background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {Math.random() > 0.5 ? (
              <Heart className="w-4 h-4 text-rose-pink fill-current" />
            ) : (
              <Sparkles className="w-3 h-3 text-sunset-gold" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Message */}
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, type: 'spring' }}
      >
        <motion.div
          className="mb-8"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <div className="text-8xl mb-4">🥭🍰</div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold script-font text-transparent bg-clip-text bg-gradient-to-r from-rose-pink via-cherry-blossom to-sunset-gold mb-8"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Happy Birthday Isabel
        </motion.h1>

        <motion.div
          className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-rose-pink/30 shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <motion.p
            className="text-2xl md:text-3xl script-font text-gray-700 leading-relaxed"
            animate={{
              textShadow: [
                '0 0 5px rgba(255, 182, 193, 0.3)',
                '0 0 15px rgba(255, 182, 193, 0.6)',
                '0 0 5px rgba(255, 182, 193, 0.3)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            You make every day brighter
            <br />
            <span className="text-rose-pink">just by being you</span>
            <br />
            Happy birthday beautiful 💗
          </motion.p>

          {/* Decorative hearts around the message */}
          <motion.div
            className="absolute -top-4 -left-4"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Heart className="w-8 h-8 text-rose-pink fill-current" />
          </motion.div>

          <motion.div
            className="absolute -top-4 -right-4"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
          >
            <Heart className="w-8 h-8 text-cherry-blossom fill-current" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
            }}
          >
            <Heart className="w-8 h-8 text-sunset-gold fill-current" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -right-4"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1.5,
            }}
          >
            <Heart className="w-8 h-8 text-lavender fill-current" />
          </motion.div>
        </motion.div>

        <motion.button
          onClick={onComplete}
          className="mt-12 magical-button bg-gradient-to-r from-rose-pink to-cherry-blossom text-white px-8 py-4 rounded-full text-xl font-semibold script-font"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Continue the Magic ✨
        </motion.button>
      </motion.div>

      {/* Floating petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`message-petal-${i}`}
            className="absolute w-3 h-4 bg-cherry-blossom rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

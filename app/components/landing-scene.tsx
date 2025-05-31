
'use client';

import { motion } from 'framer-motion';
import { Heart, Star, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LandingSceneProps {
  onStart: () => void;
}

export default function LandingScene({ onStart }: LandingSceneProps) {
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number;
    type: 'heart' | 'star' | 'balloon';
    x: number;
    y: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate random floating elements
    const elements = [];
    for (let i = 0; i < 20; i++) {
      elements.push({
        id: i,
        type: ['heart', 'star', 'balloon'][Math.floor(Math.random() * 3)] as 'heart' | 'star' | 'balloon',
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
      });
    }
    setFloatingElements(elements);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: element.delay,
            }}
          >
            {element.type === 'heart' && (
              <Heart className="w-6 h-6 text-rose-pink fill-current animate-heart-pulse" />
            )}
            {element.type === 'star' && (
              <Star className="w-4 h-4 text-sunset-gold fill-current animate-sparkle" />
            )}
            {element.type === 'balloon' && (
              <div className="w-8 h-10 bg-gradient-to-b from-pastel-pink to-rose-pink rounded-full relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-6 bg-gray-400"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute top-10 right-10"
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      >
        <Moon className="w-16 h-16 text-purple-200 fill-current" />
      </motion.div>

      {/* Main Content */}
      <div className="text-center z-20 px-4 relative">
        <h1 className="text-5xl md:text-7xl font-bold script-font text-pink-400 mb-6 animate-pulse">
          Isabel's Magical Day
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Today is all about celebrating you 🌸
        </p>

        <button
          onClick={onStart}
          className="magical-button bg-gradient-to-r from-pink-300 to-pink-400 text-white px-8 py-4 rounded-full text-xl font-semibold script-font hover:scale-105 transition-transform"
        >
          Click Me! 🎀 Birthday Princess!
        </button>
      </div>

      {/* Floating Petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute w-3 h-4 bg-cherry-blossom rounded-full opacity-70"
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
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
}

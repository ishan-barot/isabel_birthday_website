
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface TreeAnimationProps {
  phase: 'bar' | 'tree';
  onPhaseComplete: (nextPhase: 'countdown' | 'message' | 'complete') => void;
}

export default function TreeAnimation({ phase, onPhaseComplete }: TreeAnimationProps) {
  const [showBar, setShowBar] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [showAnimals, setShowAnimals] = useState(false);
  const [dailyCompliment, setDailyCompliment] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load daily compliment when client is ready
  useEffect(() => {
    if (!isClient) return;

    const loadCompliment = async () => {
      try {
        const { getTodaysCompliment } = await import('@/lib/daily-compliments');
        setDailyCompliment(getTodaysCompliment());
      } catch (error) {
        console.log('Error loading daily compliment:', error);
        setDailyCompliment("You're absolutely amazing and loved! 💕");
      }
    };

    loadCompliment();
  }, [isClient]);

  useEffect(() => {
    if (phase === 'bar') {
      setShowBar(true);
      setTimeout(() => {
        setShowTree(true);
        setTimeout(() => {
          setShowAnimals(true);
          setTimeout(() => {
            onPhaseComplete('countdown');
          }, 3000);
        }, 3000);
      }, 2000);
    }
  }, [phase, onPhaseComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
    >
      {/* Growing Bar Animation */}
      {showBar && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-rose-pink to-pastel-pink"
          initial={{ height: 0 }}
          animate={{ height: '20%' }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          {/* Sparkles on the bar */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
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
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Beautiful Tree Image */}
      {showTree && (
        <motion.div
          className="relative z-10 flex flex-col justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 2 }}
        >
          <div className="relative w-96 h-96 bg-gradient-to-b from-pink-100 to-pink-50 rounded-full flex items-center justify-center mb-8">
            <Image
              src="https://i.pinimg.com/originals/4c/cb/fa/4ccbfa4c270d340117750c16027c6406.jpg"
              alt="Beautiful magical cherry blossom tree"
              fill
              className="object-cover rounded-full"
              style={{ filter: 'brightness(1.1) saturate(1.2)' }}
            />
            
            {/* Floating petals around the tree */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`tree-petal-${i}`}
                  className="absolute w-2 h-3 bg-cherry-blossom rounded-full opacity-80"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, 400],
                    x: [0, Math.random() * 100 - 50],
                    rotate: [0, 360],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Daily Compliment Section */}
          {isClient && dailyCompliment && (
            <motion.div
              className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-6 border border-rose-pink/30 shadow-2xl max-w-md mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1.5 }}
            >
              <motion.div
                className="text-center"
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
                <h3 className="text-xl font-bold script-font text-rose-pink mb-3 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 fill-current" />
                  Today's Love Note
                  <Heart className="w-5 h-5 fill-current" />
                </h3>
                <p className="text-lg script-font text-gray-700 leading-relaxed">
                  "{dailyCompliment}"
                </p>
              </motion.div>

              {/* Decorative hearts around the compliment */}
              <motion.div
                className="absolute -top-2 -left-2"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Heart className="w-6 h-6 text-rose-pink fill-current" />
              </motion.div>

              <motion.div
                className="absolute -top-2 -right-2"
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
                <Heart className="w-6 h-6 text-cherry-blossom fill-current" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2"
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
                <Heart className="w-6 h-6 text-sunset-gold fill-current" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -right-2"
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
                <Heart className="w-6 h-6 text-lavender fill-current" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Animated Animals */}
      {showAnimals && (
        <div className="absolute bottom-20 left-10 right-10">
          {/* Bunny */}
          <motion.div
            className="absolute left-20 bottom-0"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="text-4xl">🐰</div>
          </motion.div>

          {/* Deer */}
          <motion.div
            className="absolute right-32 bottom-0"
            animate={{
              x: [0, 20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <div className="text-4xl">🦌</div>
          </motion.div>

          {/* Additional cute animals */}
          <motion.div
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <div className="text-3xl">🐿️</div>
          </motion.div>
        </div>
      )}

      {/* Glowing Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-sunset-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

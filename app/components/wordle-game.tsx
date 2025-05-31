
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

interface Cell {
  letter: string;
  state: LetterState;
}

interface GameState {
  guesses: Cell[][];
  currentRow: number;
  gameState: 'playing' | 'won' | 'lost';
  keyboardState: Record<string, LetterState>;
  targetWord: string;
}

export default function WordleGame() {
  const [isClient, setIsClient] = useState(false);
  const [targetWord, setTargetWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<Cell[][]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [loveNote, setLoveNote] = useState('');
  const [keyboardState, setKeyboardState] = useState<Record<string, LetterState>>({});
  const [gameId, setGameId] = useState('');

  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  // Initialize empty grid
  const createEmptyGrid = useCallback((): Cell[][] => {
    return Array(6).fill(null).map(() =>
      Array(5).fill(null).map(() => ({ letter: '', state: 'empty' as LetterState }))
    );
  }, []);

  // Generate unique game ID
  const generateGameId = useCallback(() => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }, []);

  // Safe localStorage operations
  const saveGameState = useCallback((newGuesses: Cell[][], newRow: number, newGameState: string, newKeyboardState: Record<string, LetterState>, word: string, id: string) => {
    if (!isClient) return;
    
    try {
      const gameData: GameState = {
        guesses: newGuesses,
        currentRow: newRow,
        gameState: newGameState as 'playing' | 'won' | 'lost',
        keyboardState: newKeyboardState,
        targetWord: word
      };
      localStorage.setItem(`wordle-game-${id}`, JSON.stringify(gameData));
    } catch (error) {
      console.log('Could not save game state:', error);
    }
  }, [isClient]);

  const loadGameState = useCallback((id: string): GameState | null => {
    if (!isClient) return null;
    
    try {
      const savedState = localStorage.getItem(`wordle-game-${id}`);
      if (savedState) {
        const parsed = JSON.parse(savedState) as GameState;
        // Validate the parsed data structure
        if (parsed.guesses && Array.isArray(parsed.guesses) && 
            typeof parsed.currentRow === 'number' && 
            typeof parsed.gameState === 'string' &&
            typeof parsed.keyboardState === 'object' &&
            typeof parsed.targetWord === 'string') {
          return parsed;
        }
      }
    } catch (error) {
      console.log('Could not load saved game state:', error);
    }
    return null;
  }, [isClient]);

  // Simple celebration effect (no external dependencies)
  const triggerCelebration = useCallback(() => {
    if (!isClient) return;
    
    // Simple celebration with CSS animations - no external dependencies needed
    console.log('🎉 Celebration! You won! 🎉');
  }, [isClient]);

  // Client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize game when client is ready
  useEffect(() => {
    if (!isClient) return;

    const initializeGame = async () => {
      try {
        // Dynamic import of constants
        const { getRandomWord, getRandomLoveNote } = await import('@/lib/constants');
        
        const newGameId = generateGameId();
        setGameId(newGameId);
        
        const word = getRandomWord();
        setTargetWord(word);
        
        // Initialize empty grid
        const emptyGrid = createEmptyGrid();
        setGuesses(emptyGrid);

        // Load saved game state for this specific game
        const savedState = loadGameState(newGameId);
        if (savedState) {
          setGuesses(savedState.guesses);
          setCurrentRow(savedState.currentRow);
          setGameState(savedState.gameState);
          setKeyboardState(savedState.keyboardState || {});
          setTargetWord(savedState.targetWord);
          if (savedState.gameState === 'won') {
            setLoveNote(getRandomLoveNote());
          }
        }
      } catch (error) {
        console.log('Error initializing game:', error);
        // Fallback initialization
        setTargetWord('HEART');
        setGuesses(createEmptyGrid());
        setGameId(generateGameId());
      }
    };

    initializeGame();
  }, [isClient, createEmptyGrid, loadGameState, generateGameId]);

  const checkGuess = useCallback((guess: string): Cell[] => {
    const result: Cell[] = [];
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    const newKeyboardState = { ...keyboardState };

    // First pass: mark correct letters
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = { letter: guessLetters[i], state: 'correct' };
        targetLetters[i] = ''; // Mark as used
        newKeyboardState[guessLetters[i]] = 'correct';
      } else {
        result[i] = { letter: guessLetters[i], state: 'absent' };
      }
    }

    // Second pass: mark present letters
    for (let i = 0; i < 5; i++) {
      if (result[i].state === 'absent') {
        const letterIndex = targetLetters.indexOf(guessLetters[i]);
        if (letterIndex !== -1) {
          result[i].state = 'present';
          targetLetters[letterIndex] = ''; // Mark as used
          if (newKeyboardState[guessLetters[i]] !== 'correct') {
            newKeyboardState[guessLetters[i]] = 'present';
          }
        } else {
          if (!newKeyboardState[guessLetters[i]]) {
            newKeyboardState[guessLetters[i]] = 'absent';
          }
        }
      }
    }

    setKeyboardState(newKeyboardState);
    return result;
  }, [targetWord, keyboardState]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== 5 || gameState !== 'playing' || !targetWord) return;

    try {
      const result = checkGuess(currentGuess);
      const newGuesses = [...guesses];
      newGuesses[currentRow] = result;
      
      const isWin = result.every(cell => cell.state === 'correct');
      const isLoss = currentRow === 5 && !isWin;
      
      let newGameState: 'playing' | 'won' | 'lost' = gameState;
      if (isWin) {
        newGameState = 'won';
        // Dynamic import for love note
        import('@/lib/constants').then(({ getRandomLoveNote }) => {
          const note = getRandomLoveNote();
          setLoveNote(note);
        }).catch(() => {
          setLoveNote("You're amazing! 💕");
        });
        triggerCelebration();
      } else if (isLoss) {
        newGameState = 'lost';
      }

      setGuesses(newGuesses);
      setCurrentRow(currentRow + 1);
      setCurrentGuess('');
      setGameState(newGameState);
      
      saveGameState(newGuesses, currentRow + 1, newGameState, keyboardState, targetWord, gameId);
    } catch (error) {
      console.log('Error submitting guess:', error);
    }
  }, [currentGuess, gameState, targetWord, checkGuess, guesses, currentRow, keyboardState, saveGameState, triggerCelebration, gameId]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing') return;

    try {
      if (key === 'ENTER') {
        submitGuess();
      } else if (key === 'BACKSPACE') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (key.length === 1 && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key);
      }
    } catch (error) {
      console.log('Error handling key press:', error);
    }
  }, [gameState, submitGuess, currentGuess]);

  const resetGame = useCallback(async () => {
    if (!isClient) return;
    
    try {
      // Clear current game from localStorage
      if (gameId) {
        localStorage.removeItem(`wordle-game-${gameId}`);
      }
      
      // Generate new game with new word
      const { getRandomWord } = await import('@/lib/constants');
      const newGameId = generateGameId();
      const newWord = getRandomWord();
      
      setGameId(newGameId);
      setTargetWord(newWord);
      setCurrentGuess('');
      setCurrentRow(0);
      setGameState('playing');
      setLoveNote('');
      setKeyboardState({});
      setGuesses(createEmptyGrid());
    } catch (error) {
      console.log('Error resetting game:', error);
      // Fallback reset
      const newGameId = generateGameId();
      setGameId(newGameId);
      setTargetWord('HEART');
      setCurrentGuess('');
      setCurrentRow(0);
      setGameState('playing');
      setLoveNote('');
      setKeyboardState({});
      setGuesses(createEmptyGrid());
    }
  }, [isClient, gameId, generateGameId, createEmptyGrid]);

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-rose-pink/30 shadow-2xl">
        <div className="text-center">
          <div className="text-2xl">🌸</div>
          <p className="text-gray-600">Loading your special game...</p>
        </div>
      </div>
    );
  }

  // Update current row display
  const displayGuesses = [...guesses];
  if (gameState === 'playing' && currentRow < 6 && displayGuesses[currentRow]) {
    for (let i = 0; i < 5; i++) {
      if (i < currentGuess.length) {
        displayGuesses[currentRow][i] = { letter: currentGuess[i], state: 'empty' };
      } else {
        displayGuesses[currentRow][i] = { letter: '', state: 'empty' };
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-rose-pink/30 shadow-2xl"
    >
      <div className="text-center mb-6">
        <motion.h2
          className="text-3xl font-bold script-font text-rose-pink mb-2"
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
          Daily Love Wordle
        </motion.h2>
        <p className="text-gray-600">Find today's beautiful word! 🌸</p>
      </div>

      {/* Game Grid */}
      <div className="wordle-grid mb-6">
        {displayGuesses.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="wordle-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: rowIndex * 0.1 }}
          >
            {row.map((cell, cellIndex) => (
              <motion.div
                key={cellIndex}
                className={`wordle-cell ${cell.state}`}
                animate={cell.letter ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.2 }}
              >
                {cell.letter}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Keyboard */}
      <div className="wordle-keyboard mb-6">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`keyboard-key ${keyboardState[key] || ''} ${
                  key === 'ENTER' || key === 'BACKSPACE' ? 'px-3' : ''
                }`}
                disabled={gameState !== 'playing'}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Game Status */}
      <AnimatePresence>
        {gameState === 'won' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 bg-gradient-to-r from-rose-pink/20 to-cherry-blossom/20 rounded-2xl border border-rose-pink/30"
          >
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold script-font text-rose-pink mb-2">
              You found it, beautiful! 
            </h3>
            <p className="text-gray-600 mb-3">{loveNote}</p>
            <div className="flex justify-center">
              <Heart className="w-6 h-6 text-rose-pink fill-current animate-heart-pulse" />
            </div>
          </motion.div>
        )}

        {gameState === 'lost' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 bg-gradient-to-r from-lavender/20 to-sky-blue/20 rounded-2xl border border-lavender/30"
          >
            <div className="text-4xl mb-2">💕</div>
            <h3 className="text-xl font-bold script-font text-gray-600 mb-2">
              The word was: {targetWord}
            </h3>
            <p className="text-gray-600 mb-3">
              Don't worry, you're still amazing! Try again! 🌸
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Button */}
      <div className="text-center mt-4">
        <button
          onClick={resetGame}
          className="magical-button bg-gradient-to-r from-lavender to-sky-blue text-gray-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </button>
      </div>

      {/* Floating hearts around the game */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Heart className="w-4 h-4 text-rose-pink/50 fill-current" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

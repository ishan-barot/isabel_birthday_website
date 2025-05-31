
// Wordle word list - cute, aesthetic, cottagecore themed words (5 letters only)
export const WORDLE_WORDS = [
  // Flowers and nature
  'lilac', 'bloom', 'flora', 'petal', 'roses', 'grass', 'daisy', 'tulip', 'pansy', 'poppy',
  'ferns', 'birch',
  
  // Weather and sky
  'sunny', 'cloud', 'misty', 'foggy', 'rainy', 'snowy', 'windy', 'clear',
  
  // Water and landscapes
  'lakes', 'creek', 'brook', 'river', 'ocean', 'beach', 'shore', 'waves',
  'field', 'grove', 'glade',
  
  // Animals
  'bunny', 'kitty', 'panda', 'mouse', 'otter', 'chick', 'puppy',
  
  // Food and drinks
  'lemon', 'peach', 'berry', 'apple', 'grape', 'honey', 'cream', 'latte', 'mocha', 'cocoa',
  'sugar', 'sweet', 'bread', 'toast', 'jelly', 'syrup', 'maple', 'clove',
  
  // Feelings and aesthetics
  'peace', 'quiet', 'still', 'bliss',
  'dream', 'faith', 'trust', 'grace', 'charm', 'magic',
  
  // Textures and materials
  'linen', 'satin', 'gauze', 'tulle',
  'pearl', 'ivory', 'amber', 'coral',
  
  // Home and comfort
  'ember', 'quilt', 'shawl', 'scarf'
];

// Love notes and compliments for Wordle completion
export const LOVE_NOTES = [
  "You're absolutely beautiful! 🌸",
  "Your smile makes my day! ☀️",
  "You're sweeter than honey! 🍯💎",
  "You bring so much joy! 🌿",
  "You're my favorite person! 💭💕",
  "Your heart is so kind! 🌺",
  "You're truly amazing! ✨",
  "You make everything better! 💧",
  "You're so special to me! 🏡",
  "You give the best hugs! 🤗",
  "You're graceful and lovely! 🦢",
  "You take my breath away! 🌸",
  "You're my sunshine! ☁️☀️",
  "Your heart is pure gold! ❄️",
  "You're beautiful inside and out! 🌼"
];

// Get a random word for new games (not date-based)
export function getRandomWord(): string {
  return WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)].toUpperCase();
}

// Get today's word based on date (for daily challenge)
export function getTodaysWord(): string {
  const today = new Date();
  const startDate = new Date('2024-01-01'); // Reference date
  const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return WORDLE_WORDS[daysSinceStart % WORDLE_WORDS.length].toUpperCase();
}

// Get random love note
export function getRandomLoveNote(): string {
  return LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)];
}

// Isabel's birth date
export const ISABEL_BIRTH_DATE = new Date('2005-05-31');

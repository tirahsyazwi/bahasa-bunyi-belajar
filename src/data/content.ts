// Phonics and learning content for Bahasa Buddy

export interface PhonicsItem {
  id: string;
  consonant: string;
  vowel: string;
  syllable: string;
  audio?: string;
}

export interface WordItem {
  id: string;
  word: string;
  syllables: string[];
  meaning: string;
  emoji: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "word-building" | "image-matching" | "sentence-order";
  level: "beginner" | "intermediate" | "advanced";
  question: string;
  options: string[];
  correct: string;
  emoji?: string;
}

export interface SentenceItem {
  id: string;
  sentence: string;
  words: string[];
  meaning: string;
  level: "intermediate" | "advanced";
}

// KV Phonics data
export const vowels = ["a", "e", "i", "o", "u"];
export const consonants = ["b", "c", "d", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "w", "y"];

export const phonicsData: PhonicsItem[] = consonants.flatMap((c) =>
  vowels.map((v) => ({
    id: `${c}${v}`,
    consonant: c,
    vowel: v,
    syllable: `${c}${v}`,
  }))
);

export const wordsData: WordItem[] = [
  { id: "w1", word: "buku", syllables: ["bu", "ku"], meaning: "book", emoji: "📖", level: "beginner", category: "objects" },
  { id: "w2", word: "susu", syllables: ["su", "su"], meaning: "milk", emoji: "🥛", level: "beginner", category: "food" },
  { id: "w3", word: "mata", syllables: ["ma", "ta"], meaning: "eye", emoji: "👁️", level: "beginner", category: "body" },
  { id: "w4", word: "kaki", syllables: ["ka", "ki"], meaning: "leg", emoji: "🦵", level: "beginner", category: "body" },
  { id: "w5", word: "bola", syllables: ["bo", "la"], meaning: "ball", emoji: "⚽", level: "beginner", category: "objects" },
  { id: "w6", word: "gula", syllables: ["gu", "la"], meaning: "sugar", emoji: "🍬", level: "beginner", category: "food" },
  { id: "w7", word: "topi", syllables: ["to", "pi"], meaning: "hat", emoji: "🧢", level: "beginner", category: "clothing" },
  { id: "w8", word: "ikan", syllables: ["i", "kan"], meaning: "fish", emoji: "🐟", level: "beginner", category: "animals" },
  { id: "w9", word: "nasi", syllables: ["na", "si"], meaning: "rice", emoji: "🍚", level: "beginner", category: "food" },
  { id: "w10", word: "kucing", syllables: ["ku", "cing"], meaning: "cat", emoji: "🐱", level: "beginner", category: "animals" },
  { id: "w11", word: "rumah", syllables: ["ru", "mah"], meaning: "house", emoji: "🏠", level: "beginner", category: "places" },
  { id: "w12", word: "meja", syllables: ["me", "ja"], meaning: "table", emoji: "🪑", level: "beginner", category: "objects" },
  { id: "w13", word: "pintu", syllables: ["pin", "tu"], meaning: "door", emoji: "🚪", level: "beginner", category: "objects" },
  { id: "w14", word: "bunga", syllables: ["bu", "nga"], meaning: "flower", emoji: "🌸", level: "beginner", category: "nature" },
  { id: "w15", word: "kerusi", syllables: ["ke", "ru", "si"], meaning: "chair", emoji: "💺", level: "intermediate", category: "objects" },
  { id: "w16", word: "sekolah", syllables: ["se", "ko", "lah"], meaning: "school", emoji: "🏫", level: "intermediate", category: "places" },
  { id: "w17", word: "makan", syllables: ["ma", "kan"], meaning: "eat", emoji: "🍽️", level: "beginner", category: "actions" },
  { id: "w18", word: "minum", syllables: ["mi", "num"], meaning: "drink", emoji: "🥤", level: "beginner", category: "actions" },
  { id: "w19", word: "tidur", syllables: ["ti", "dur"], meaning: "sleep", emoji: "😴", level: "beginner", category: "actions" },
  { id: "w20", word: "main", syllables: ["ma", "in"], meaning: "play", emoji: "🎮", level: "beginner", category: "actions" },
  { id: "w21", word: "ayam", syllables: ["a", "yam"], meaning: "chicken", emoji: "🐔", level: "beginner", category: "animals" },
  { id: "w22", word: "burung", syllables: ["bu", "rung"], meaning: "bird", emoji: "🐦", level: "beginner", category: "animals" },
  { id: "w23", word: "pokok", syllables: ["po", "kok"], meaning: "tree", emoji: "🌳", level: "beginner", category: "nature" },
  { id: "w24", word: "hujan", syllables: ["hu", "jan"], meaning: "rain", emoji: "🌧️", level: "beginner", category: "nature" },
  { id: "w25", word: "cawan", syllables: ["ca", "wan"], meaning: "cup", emoji: "☕", level: "beginner", category: "objects" },
];

export const quizData: QuizQuestion[] = [
  // Beginner phonics
  { id: "q1", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'ba'", options: ["ba", "da", "pa", "ga"], correct: "ba", emoji: "🔤" },
  { id: "q2", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'ku'", options: ["gu", "ku", "hu", "bu"], correct: "ku", emoji: "🔤" },
  { id: "q3", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'ma'", options: ["na", "la", "ma", "ta"], correct: "ma", emoji: "🔤" },
  { id: "q4", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'su'", options: ["su", "tu", "nu", "lu"], correct: "su", emoji: "🔤" },
  { id: "q5", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'ta'", options: ["da", "ta", "ka", "sa"], correct: "ta", emoji: "🔤" },
  // Beginner vocabulary
  { id: "q6", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 📖", options: ["buku", "susu", "mata", "kaki"], correct: "buku", emoji: "📖" },
  { id: "q7", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🥛", options: ["nasi", "susu", "gula", "topi"], correct: "susu", emoji: "🥛" },
  { id: "q8", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🐱", options: ["ikan", "kucing", "ayam", "burung"], correct: "kucing", emoji: "🐱" },
  { id: "q9", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🏠", options: ["rumah", "meja", "pintu", "kerusi"], correct: "rumah", emoji: "🏠" },
  { id: "q10", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🍚", options: ["gula", "susu", "nasi", "ikan"], correct: "nasi", emoji: "🍚" },
  { id: "q11", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk ⚽", options: ["bola", "topi", "buku", "meja"], correct: "bola", emoji: "⚽" },
  { id: "q12", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🐟", options: ["ayam", "ikan", "kucing", "burung"], correct: "ikan", emoji: "🐟" },
  { id: "q13", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🌸", options: ["pokok", "bunga", "hujan", "rumah"], correct: "bunga", emoji: "🌸" },
  { id: "q14", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🐔", options: ["burung", "ikan", "kucing", "ayam"], correct: "ayam", emoji: "🐔" },
  { id: "q15", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🌳", options: ["hujan", "bunga", "pokok", "rumah"], correct: "pokok", emoji: "🌳" },
  // Word building
  { id: "q16", type: "word-building", level: "beginner", question: "Bina perkataan: 📖", options: ["bu", "ku", "ma", "ta"], correct: "buku", emoji: "📖" },
  { id: "q17", type: "word-building", level: "beginner", question: "Bina perkataan: 🥛", options: ["su", "su", "mu", "lu"], correct: "susu", emoji: "🥛" },
  { id: "q18", type: "word-building", level: "beginner", question: "Bina perkataan: 👁️", options: ["ma", "ta", "na", "sa"], correct: "mata", emoji: "👁️" },
  { id: "q19", type: "word-building", level: "beginner", question: "Bina perkataan: 🍚", options: ["na", "si", "ti", "ri"], correct: "nasi", emoji: "🍚" },
  { id: "q20", type: "word-building", level: "beginner", question: "Bina perkataan: ⚽", options: ["bo", "la", "ba", "da"], correct: "bola", emoji: "⚽" },
  // Intermediate
  { id: "q21", type: "multiple-choice", level: "intermediate", question: "Apa maksud 'sekolah'?", options: ["School", "House", "Table", "Chair"], correct: "School", emoji: "🏫" },
  { id: "q22", type: "multiple-choice", level: "intermediate", question: "'Saya ___ nasi' — pilih perkataan", options: ["makan", "tidur", "main", "minum"], correct: "makan", emoji: "🍽️" },
  { id: "q23", type: "multiple-choice", level: "intermediate", question: "'Adik ___ susu' — pilih perkataan", options: ["makan", "minum", "tidur", "main"], correct: "minum", emoji: "🥛" },
  { id: "q24", type: "sentence-order", level: "intermediate", question: "Susun ayat yang betul", options: ["Saya", "makan", "nasi"], correct: "Saya makan nasi", emoji: "📝" },
  { id: "q25", type: "sentence-order", level: "intermediate", question: "Susun ayat yang betul", options: ["Ini", "ibu", "saya"], correct: "Ini ibu saya", emoji: "📝" },
  // Advanced
  { id: "q26", type: "multiple-choice", level: "advanced", question: "'Nama kamu siapa?' — jawapan yang betul?", options: ["Nama saya Ali", "Saya makan", "Ini buku", "Selamat pagi"], correct: "Nama saya Ali", emoji: "💬" },
  { id: "q27", type: "multiple-choice", level: "advanced", question: "'Apa khabar?' — jawapan yang betul?", options: ["Khabar baik", "Nama saya", "Terima kasih", "Selamat tinggal"], correct: "Khabar baik", emoji: "💬" },
  { id: "q28", type: "sentence-order", level: "advanced", question: "Susun ayat yang betul", options: ["Ali", "pergi", "ke", "sekolah"], correct: "Ali pergi ke sekolah", emoji: "📝" },
];

export const sentencesData: SentenceItem[] = [
  { id: "s1", sentence: "Saya makan nasi", words: ["Saya", "makan", "nasi"], meaning: "I eat rice", level: "intermediate" },
  { id: "s2", sentence: "Ini ibu saya", words: ["Ini", "ibu", "saya"], meaning: "This is my mother", level: "intermediate" },
  { id: "s3", sentence: "Ali pergi sekolah", words: ["Ali", "pergi", "sekolah"], meaning: "Ali goes to school", level: "intermediate" },
  { id: "s4", sentence: "Kucing itu comel", words: ["Kucing", "itu", "comel"], meaning: "That cat is cute", level: "intermediate" },
  { id: "s5", sentence: "Adik minum susu", words: ["Adik", "minum", "susu"], meaning: "Little sibling drinks milk", level: "intermediate" },
];

// Helper to get random items
export function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getQuizByLevel(level: QuizQuestion["level"], count: number = 5): QuizQuestion[] {
  const filtered = quizData.filter((q) => q.level === level);
  return getRandomItems(filtered, Math.min(count, filtered.length));
}

export function getWordsByLevel(level: WordItem["level"]): WordItem[] {
  return wordsData.filter((w) => w.level === level);
}

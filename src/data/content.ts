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
  imageOptions?: { emoji: string; label: string }[];
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
  // ===== BEGINNER - Objects =====
  { id: "w1", word: "buku", syllables: ["bu", "ku"], meaning: "book", emoji: "📖", level: "beginner", category: "objects" },
  { id: "w5", word: "bola", syllables: ["bo", "la"], meaning: "ball", emoji: "⚽", level: "beginner", category: "objects" },
  { id: "w7", word: "topi", syllables: ["to", "pi"], meaning: "hat", emoji: "🧢", level: "beginner", category: "objects" },
  { id: "w12", word: "meja", syllables: ["me", "ja"], meaning: "table", emoji: "🪑", level: "beginner", category: "objects" },
  { id: "w13", word: "pintu", syllables: ["pin", "tu"], meaning: "door", emoji: "🚪", level: "beginner", category: "objects" },
  { id: "w25", word: "cawan", syllables: ["ca", "wan"], meaning: "cup", emoji: "☕", level: "beginner", category: "objects" },
  { id: "w30", word: "beg", syllables: ["beg"], meaning: "bag", emoji: "🎒", level: "beginner", category: "objects" },
  { id: "w31", word: "pen", syllables: ["pen"], meaning: "pen", emoji: "🖊️", level: "beginner", category: "objects" },
  { id: "w32", word: "jam", syllables: ["jam"], meaning: "clock", emoji: "🕐", level: "beginner", category: "objects" },
  { id: "w33", word: "lampu", syllables: ["lam", "pu"], meaning: "lamp", emoji: "💡", level: "beginner", category: "objects" },
  { id: "w34", word: "katil", syllables: ["ka", "til"], meaning: "bed", emoji: "🛏️", level: "beginner", category: "objects" },
  { id: "w35", word: "payung", syllables: ["pa", "yung"], meaning: "umbrella", emoji: "☂️", level: "beginner", category: "objects" },
  { id: "w36", word: "kasut", syllables: ["ka", "sut"], meaning: "shoe", emoji: "👟", level: "beginner", category: "objects" },
  { id: "w37", word: "kunci", syllables: ["kun", "ci"], meaning: "key", emoji: "🔑", level: "beginner", category: "objects" },

  // ===== BEGINNER - Food =====
  { id: "w2", word: "susu", syllables: ["su", "su"], meaning: "milk", emoji: "🥛", level: "beginner", category: "food" },
  { id: "w6", word: "gula", syllables: ["gu", "la"], meaning: "sugar", emoji: "🍬", level: "beginner", category: "food" },
  { id: "w9", word: "nasi", syllables: ["na", "si"], meaning: "rice", emoji: "🍚", level: "beginner", category: "food" },
  { id: "w40", word: "roti", syllables: ["ro", "ti"], meaning: "bread", emoji: "🍞", level: "beginner", category: "food" },
  { id: "w41", word: "telur", syllables: ["te", "lur"], meaning: "egg", emoji: "🥚", level: "beginner", category: "food" },
  { id: "w42", word: "pisang", syllables: ["pi", "sang"], meaning: "banana", emoji: "🍌", level: "beginner", category: "food" },
  { id: "w43", word: "epal", syllables: ["e", "pal"], meaning: "apple", emoji: "🍎", level: "beginner", category: "food" },
  { id: "w44", word: "air", syllables: ["a", "ir"], meaning: "water", emoji: "💧", level: "beginner", category: "food" },
  { id: "w45", word: "kek", syllables: ["kek"], meaning: "cake", emoji: "🎂", level: "beginner", category: "food" },
  { id: "w46", word: "teh", syllables: ["teh"], meaning: "tea", emoji: "🍵", level: "beginner", category: "food" },
  { id: "w47", word: "ais", syllables: ["a", "is"], meaning: "ice", emoji: "🧊", level: "beginner", category: "food" },
  { id: "w48", word: "sayur", syllables: ["sa", "yur"], meaning: "vegetable", emoji: "🥬", level: "beginner", category: "food" },

  // ===== BEGINNER - Body =====
  { id: "w3", word: "mata", syllables: ["ma", "ta"], meaning: "eye", emoji: "👁️", level: "beginner", category: "body" },
  { id: "w4", word: "kaki", syllables: ["ka", "ki"], meaning: "leg", emoji: "🦵", level: "beginner", category: "body" },
  { id: "w50", word: "tangan", syllables: ["ta", "ngan"], meaning: "hand", emoji: "✋", level: "beginner", category: "body" },
  { id: "w51", word: "hidung", syllables: ["hi", "dung"], meaning: "nose", emoji: "👃", level: "beginner", category: "body" },
  { id: "w52", word: "mulut", syllables: ["mu", "lut"], meaning: "mouth", emoji: "👄", level: "beginner", category: "body" },
  { id: "w53", word: "telinga", syllables: ["te", "li", "nga"], meaning: "ear", emoji: "👂", level: "beginner", category: "body" },
  { id: "w54", word: "kepala", syllables: ["ke", "pa", "la"], meaning: "head", emoji: "🧠", level: "beginner", category: "body" },
  { id: "w55", word: "gigi", syllables: ["gi", "gi"], meaning: "teeth", emoji: "🦷", level: "beginner", category: "body" },
  { id: "w56", word: "rambut", syllables: ["ram", "but"], meaning: "hair", emoji: "💇", level: "beginner", category: "body" },

  // ===== BEGINNER - Animals =====
  { id: "w8", word: "ikan", syllables: ["i", "kan"], meaning: "fish", emoji: "🐟", level: "beginner", category: "animals" },
  { id: "w10", word: "kucing", syllables: ["ku", "cing"], meaning: "cat", emoji: "🐱", level: "beginner", category: "animals" },
  { id: "w21", word: "ayam", syllables: ["a", "yam"], meaning: "chicken", emoji: "🐔", level: "beginner", category: "animals" },
  { id: "w22", word: "burung", syllables: ["bu", "rung"], meaning: "bird", emoji: "🐦", level: "beginner", category: "animals" },
  { id: "w60", word: "anjing", syllables: ["an", "jing"], meaning: "dog", emoji: "🐕", level: "beginner", category: "animals" },
  { id: "w61", word: "lembu", syllables: ["lem", "bu"], meaning: "cow", emoji: "🐄", level: "beginner", category: "animals" },
  { id: "w62", word: "kambing", syllables: ["kam", "bing"], meaning: "goat", emoji: "🐐", level: "beginner", category: "animals" },
  { id: "w63", word: "arnab", syllables: ["ar", "nab"], meaning: "rabbit", emoji: "🐰", level: "beginner", category: "animals" },
  { id: "w64", word: "ular", syllables: ["u", "lar"], meaning: "snake", emoji: "🐍", level: "beginner", category: "animals" },
  { id: "w65", word: "kuda", syllables: ["ku", "da"], meaning: "horse", emoji: "🐴", level: "beginner", category: "animals" },
  { id: "w66", word: "gajah", syllables: ["ga", "jah"], meaning: "elephant", emoji: "🐘", level: "beginner", category: "animals" },
  { id: "w67", word: "monyet", syllables: ["mo", "nyet"], meaning: "monkey", emoji: "🐒", level: "beginner", category: "animals" },
  { id: "w68", word: "harimau", syllables: ["ha", "ri", "mau"], meaning: "tiger", emoji: "🐅", level: "beginner", category: "animals" },
  { id: "w69", word: "singa", syllables: ["si", "nga"], meaning: "lion", emoji: "🦁", level: "beginner", category: "animals" },

  // ===== BEGINNER - Nature =====
  { id: "w14", word: "bunga", syllables: ["bu", "nga"], meaning: "flower", emoji: "🌸", level: "beginner", category: "nature" },
  { id: "w23", word: "pokok", syllables: ["po", "kok"], meaning: "tree", emoji: "🌳", level: "beginner", category: "nature" },
  { id: "w24", word: "hujan", syllables: ["hu", "jan"], meaning: "rain", emoji: "🌧️", level: "beginner", category: "nature" },
  { id: "w70", word: "matahari", syllables: ["ma", "ta", "ha", "ri"], meaning: "sun", emoji: "☀️", level: "beginner", category: "nature" },
  { id: "w71", word: "bulan", syllables: ["bu", "lan"], meaning: "moon", emoji: "🌙", level: "beginner", category: "nature" },
  { id: "w72", word: "bintang", syllables: ["bin", "tang"], meaning: "star", emoji: "⭐", level: "beginner", category: "nature" },
  { id: "w73", word: "awan", syllables: ["a", "wan"], meaning: "cloud", emoji: "☁️", level: "beginner", category: "nature" },
  { id: "w74", word: "gunung", syllables: ["gu", "nung"], meaning: "mountain", emoji: "⛰️", level: "beginner", category: "nature" },
  { id: "w75", word: "sungai", syllables: ["su", "ngai"], meaning: "river", emoji: "🏞️", level: "beginner", category: "nature" },
  { id: "w76", word: "laut", syllables: ["la", "ut"], meaning: "sea", emoji: "🌊", level: "beginner", category: "nature" },

  // ===== BEGINNER - Actions =====
  { id: "w17", word: "makan", syllables: ["ma", "kan"], meaning: "eat", emoji: "🍽️", level: "beginner", category: "actions" },
  { id: "w18", word: "minum", syllables: ["mi", "num"], meaning: "drink", emoji: "🥤", level: "beginner", category: "actions" },
  { id: "w19", word: "tidur", syllables: ["ti", "dur"], meaning: "sleep", emoji: "😴", level: "beginner", category: "actions" },
  { id: "w20", word: "main", syllables: ["ma", "in"], meaning: "play", emoji: "🎮", level: "beginner", category: "actions" },
  { id: "w80", word: "lari", syllables: ["la", "ri"], meaning: "run", emoji: "🏃", level: "beginner", category: "actions" },
  { id: "w81", word: "duduk", syllables: ["du", "duk"], meaning: "sit", emoji: "🪑", level: "beginner", category: "actions" },
  { id: "w82", word: "baca", syllables: ["ba", "ca"], meaning: "read", emoji: "📚", level: "beginner", category: "actions" },
  { id: "w83", word: "tulis", syllables: ["tu", "lis"], meaning: "write", emoji: "✍️", level: "beginner", category: "actions" },
  { id: "w84", word: "nyanyi", syllables: ["nya", "nyi"], meaning: "sing", emoji: "🎤", level: "beginner", category: "actions" },
  { id: "w85", word: "menari", syllables: ["me", "na", "ri"], meaning: "dance", emoji: "💃", level: "beginner", category: "actions" },

  // ===== BEGINNER - Places =====
  { id: "w11", word: "rumah", syllables: ["ru", "mah"], meaning: "house", emoji: "🏠", level: "beginner", category: "places" },
  { id: "w90", word: "kedai", syllables: ["ke", "dai"], meaning: "shop", emoji: "🏪", level: "beginner", category: "places" },
  { id: "w91", word: "taman", syllables: ["ta", "man"], meaning: "garden", emoji: "🌻", level: "beginner", category: "places" },
  { id: "w92", word: "padang", syllables: ["pa", "dang"], meaning: "field", emoji: "🏟️", level: "beginner", category: "places" },
  { id: "w93", word: "pantai", syllables: ["pan", "tai"], meaning: "beach", emoji: "🏖️", level: "beginner", category: "places" },

  // ===== BEGINNER - Clothing =====
  { id: "w94", word: "baju", syllables: ["ba", "ju"], meaning: "shirt", emoji: "👕", level: "beginner", category: "clothing" },
  { id: "w95", word: "seluar", syllables: ["se", "lu", "ar"], meaning: "pants", emoji: "👖", level: "beginner", category: "clothing" },
  { id: "w96", word: "stoking", syllables: ["sto", "king"], meaning: "socks", emoji: "🧦", level: "beginner", category: "clothing" },

  // ===== BEGINNER - Colors =====
  { id: "w100", word: "merah", syllables: ["me", "rah"], meaning: "red", emoji: "🔴", level: "beginner", category: "colors" },
  { id: "w101", word: "biru", syllables: ["bi", "ru"], meaning: "blue", emoji: "🔵", level: "beginner", category: "colors" },
  { id: "w102", word: "hijau", syllables: ["hi", "jau"], meaning: "green", emoji: "🟢", level: "beginner", category: "colors" },
  { id: "w103", word: "kuning", syllables: ["ku", "ning"], meaning: "yellow", emoji: "🟡", level: "beginner", category: "colors" },
  { id: "w104", word: "putih", syllables: ["pu", "tih"], meaning: "white", emoji: "⚪", level: "beginner", category: "colors" },
  { id: "w105", word: "hitam", syllables: ["hi", "tam"], meaning: "black", emoji: "⚫", level: "beginner", category: "colors" },

  // ===== BEGINNER - Numbers =====
  { id: "w110", word: "satu", syllables: ["sa", "tu"], meaning: "one", emoji: "1️⃣", level: "beginner", category: "numbers" },
  { id: "w111", word: "dua", syllables: ["du", "a"], meaning: "two", emoji: "2️⃣", level: "beginner", category: "numbers" },
  { id: "w112", word: "tiga", syllables: ["ti", "ga"], meaning: "three", emoji: "3️⃣", level: "beginner", category: "numbers" },
  { id: "w113", word: "empat", syllables: ["em", "pat"], meaning: "four", emoji: "4️⃣", level: "beginner", category: "numbers" },
  { id: "w114", word: "lima", syllables: ["li", "ma"], meaning: "five", emoji: "5️⃣", level: "beginner", category: "numbers" },

  // ===== BEGINNER - Family =====
  { id: "w120", word: "ibu", syllables: ["i", "bu"], meaning: "mother", emoji: "👩", level: "beginner", category: "family" },
  { id: "w121", word: "bapa", syllables: ["ba", "pa"], meaning: "father", emoji: "👨", level: "beginner", category: "family" },
  { id: "w122", word: "adik", syllables: ["a", "dik"], meaning: "younger sibling", emoji: "👶", level: "beginner", category: "family" },
  { id: "w123", word: "abang", syllables: ["a", "bang"], meaning: "older brother", emoji: "👦", level: "beginner", category: "family" },
  { id: "w124", word: "kakak", syllables: ["ka", "kak"], meaning: "older sister", emoji: "👧", level: "beginner", category: "family" },

  // ===== INTERMEDIATE =====
  { id: "w15", word: "kerusi", syllables: ["ke", "ru", "si"], meaning: "chair", emoji: "💺", level: "intermediate", category: "objects" },
  { id: "w16", word: "sekolah", syllables: ["se", "ko", "lah"], meaning: "school", emoji: "🏫", level: "intermediate", category: "places" },
  { id: "w130", word: "hospital", syllables: ["hos", "pi", "tal"], meaning: "hospital", emoji: "🏥", level: "intermediate", category: "places" },
  { id: "w131", word: "kereta", syllables: ["ke", "re", "ta"], meaning: "car", emoji: "🚗", level: "intermediate", category: "transport" },
  { id: "w132", word: "basikal", syllables: ["ba", "si", "kal"], meaning: "bicycle", emoji: "🚲", level: "intermediate", category: "transport" },
  { id: "w133", word: "kapal", syllables: ["ka", "pal"], meaning: "ship", emoji: "🚢", level: "intermediate", category: "transport" },
  { id: "w134", word: "telefon", syllables: ["te", "le", "fon"], meaning: "phone", emoji: "📱", level: "intermediate", category: "objects" },
  { id: "w135", word: "komputer", syllables: ["kom", "pu", "ter"], meaning: "computer", emoji: "💻", level: "intermediate", category: "objects" },
  { id: "w136", word: "almari", syllables: ["al", "ma", "ri"], meaning: "cupboard", emoji: "🗄️", level: "intermediate", category: "objects" },
  { id: "w137", word: "tingkap", syllables: ["ting", "kap"], meaning: "window", emoji: "🪟", level: "intermediate", category: "objects" },
  { id: "w138", word: "cikgu", syllables: ["cik", "gu"], meaning: "teacher", emoji: "👩‍🏫", level: "intermediate", category: "people" },
  { id: "w139", word: "kawan", syllables: ["ka", "wan"], meaning: "friend", emoji: "🤝", level: "intermediate", category: "people" },
  { id: "w140", word: "doktor", syllables: ["dok", "tor"], meaning: "doctor", emoji: "👨‍⚕️", level: "intermediate", category: "people" },
  { id: "w141", word: "polis", syllables: ["po", "lis"], meaning: "police", emoji: "👮", level: "intermediate", category: "people" },
  { id: "w142", word: "cantik", syllables: ["can", "tik"], meaning: "beautiful", emoji: "✨", level: "intermediate", category: "adjectives" },
  { id: "w143", word: "besar", syllables: ["be", "sar"], meaning: "big", emoji: "🔺", level: "intermediate", category: "adjectives" },
  { id: "w144", word: "kecil", syllables: ["ke", "cil"], meaning: "small", emoji: "🔹", level: "intermediate", category: "adjectives" },
  { id: "w145", word: "panas", syllables: ["pa", "nas"], meaning: "hot", emoji: "🔥", level: "intermediate", category: "adjectives" },
  { id: "w146", word: "sejuk", syllables: ["se", "juk"], meaning: "cold", emoji: "❄️", level: "intermediate", category: "adjectives" },

  // ===== ADVANCED =====
  { id: "w150", word: "perpustakaan", syllables: ["per", "pus", "ta", "ka", "an"], meaning: "library", emoji: "📚", level: "advanced", category: "places" },
  { id: "w151", word: "restoran", syllables: ["res", "to", "ran"], meaning: "restaurant", emoji: "🍽️", level: "advanced", category: "places" },
  { id: "w152", word: "bersenam", syllables: ["ber", "se", "nam"], meaning: "exercise", emoji: "🏋️", level: "advanced", category: "actions" },
  { id: "w153", word: "membeli", syllables: ["mem", "be", "li"], meaning: "to buy", emoji: "🛒", level: "advanced", category: "actions" },
  { id: "w154", word: "memasak", syllables: ["me", "ma", "sak"], meaning: "to cook", emoji: "👩‍🍳", level: "advanced", category: "actions" },
  { id: "w155", word: "bercerita", syllables: ["ber", "ce", "ri", "ta"], meaning: "to tell a story", emoji: "📖", level: "advanced", category: "actions" },
  { id: "w156", word: "selamat", syllables: ["se", "la", "mat"], meaning: "safe/greetings", emoji: "👋", level: "advanced", category: "greetings" },
  { id: "w157", word: "terima kasih", syllables: ["te", "ri", "ma", "ka", "sih"], meaning: "thank you", emoji: "🙏", level: "advanced", category: "greetings" },
];

export const quizData: QuizQuestion[] = [
  // ===== BEGINNER - Phonics =====
  { id: "q1", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'ba'", options: ["ba", "da", "pa", "ga"], correct: "ba", emoji: "🔤" },
  { id: "q2", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'ku'", options: ["gu", "ku", "hu", "bu"], correct: "ku", emoji: "🔤" },
  { id: "q3", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'ma'", options: ["na", "la", "ma", "ta"], correct: "ma", emoji: "🔤" },
  { id: "q4", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'su'", options: ["su", "tu", "nu", "lu"], correct: "su", emoji: "🔤" },
  { id: "q5", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'ta'", options: ["da", "ta", "ka", "sa"], correct: "ta", emoji: "🔤" },
  { id: "q6a", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'la'", options: ["la", "ra", "na", "da"], correct: "la", emoji: "🔤" },
  { id: "q6b", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'ni'", options: ["mi", "ni", "li", "ri"], correct: "ni", emoji: "🔤" },
  { id: "q6c", type: "multiple-choice", level: "beginner", question: "Bunyi apa ini? 'go'", options: ["ko", "go", "do", "bo"], correct: "go", emoji: "🔤" },

  // ===== BEGINNER - Vocabulary =====
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
  { id: "q15a", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🐕", options: ["kucing", "anjing", "arnab", "ikan"], correct: "anjing", emoji: "🐕" },
  { id: "q15b", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🍌", options: ["epal", "pisang", "roti", "telur"], correct: "pisang", emoji: "🍌" },
  { id: "q15c", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk ☀️", options: ["bulan", "bintang", "matahari", "awan"], correct: "matahari", emoji: "☀️" },
  { id: "q15d", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 🔴", options: ["biru", "kuning", "merah", "hijau"], correct: "merah", emoji: "🔴" },
  { id: "q15e", type: "multiple-choice", level: "beginner", question: "Pilih perkataan untuk 👩", options: ["bapa", "adik", "ibu", "abang"], correct: "ibu", emoji: "👩" },

  // ===== BEGINNER - Image Matching =====
  { id: "qi1", type: "image-matching", level: "beginner", question: "Padankan perkataan 'kucing'", options: ["kucing", "anjing", "ikan", "burung"], correct: "kucing", imageOptions: [{ emoji: "🐱", label: "kucing" }, { emoji: "🐕", label: "anjing" }, { emoji: "🐟", label: "ikan" }, { emoji: "🐦", label: "burung" }] },
  { id: "qi2", type: "image-matching", level: "beginner", question: "Padankan perkataan 'buku'", options: ["buku", "bola", "topi", "meja"], correct: "buku", imageOptions: [{ emoji: "📖", label: "buku" }, { emoji: "⚽", label: "bola" }, { emoji: "🧢", label: "topi" }, { emoji: "🪑", label: "meja" }] },
  { id: "qi3", type: "image-matching", level: "beginner", question: "Padankan perkataan 'pisang'", options: ["pisang", "epal", "roti", "telur"], correct: "pisang", imageOptions: [{ emoji: "🍌", label: "pisang" }, { emoji: "🍎", label: "epal" }, { emoji: "🍞", label: "roti" }, { emoji: "🥚", label: "telur" }] },
  { id: "qi4", type: "image-matching", level: "beginner", question: "Padankan perkataan 'rumah'", options: ["rumah", "kedai", "sekolah", "taman"], correct: "rumah", imageOptions: [{ emoji: "🏠", label: "rumah" }, { emoji: "🏪", label: "kedai" }, { emoji: "🏫", label: "sekolah" }, { emoji: "🌻", label: "taman" }] },
  { id: "qi5", type: "image-matching", level: "beginner", question: "Padankan perkataan 'matahari'", options: ["matahari", "bulan", "bintang", "awan"], correct: "matahari", imageOptions: [{ emoji: "☀️", label: "matahari" }, { emoji: "🌙", label: "bulan" }, { emoji: "⭐", label: "bintang" }, { emoji: "☁️", label: "awan" }] },
  { id: "qi6", type: "image-matching", level: "beginner", question: "Padankan perkataan 'gajah'", options: ["gajah", "singa", "kuda", "arnab"], correct: "gajah", imageOptions: [{ emoji: "🐘", label: "gajah" }, { emoji: "🦁", label: "singa" }, { emoji: "🐴", label: "kuda" }, { emoji: "🐰", label: "arnab" }] },
  { id: "qi7", type: "image-matching", level: "beginner", question: "Padankan perkataan 'kasut'", options: ["kasut", "baju", "topi", "stoking"], correct: "kasut", imageOptions: [{ emoji: "👟", label: "kasut" }, { emoji: "👕", label: "baju" }, { emoji: "🧢", label: "topi" }, { emoji: "🧦", label: "stoking" }] },

  // ===== BEGINNER - Word Building =====
  { id: "q16", type: "word-building", level: "beginner", question: "Bina perkataan: 📖", options: ["bu", "ku", "ma", "ta"], correct: "buku", emoji: "📖" },
  { id: "q17", type: "word-building", level: "beginner", question: "Bina perkataan: 🥛", options: ["su", "su", "mu", "lu"], correct: "susu", emoji: "🥛" },
  { id: "q18", type: "word-building", level: "beginner", question: "Bina perkataan: 👁️", options: ["ma", "ta", "na", "sa"], correct: "mata", emoji: "👁️" },
  { id: "q19", type: "word-building", level: "beginner", question: "Bina perkataan: 🍚", options: ["na", "si", "ti", "ri"], correct: "nasi", emoji: "🍚" },
  { id: "q20", type: "word-building", level: "beginner", question: "Bina perkataan: ⚽", options: ["bo", "la", "ba", "da"], correct: "bola", emoji: "⚽" },
  { id: "q20a", type: "word-building", level: "beginner", question: "Bina perkataan: 🐱", options: ["ku", "da", "ci", "ng"], correct: "kucing", emoji: "🐱" },
  { id: "q20b", type: "word-building", level: "beginner", question: "Bina perkataan: 🏃", options: ["la", "ri", "du", "ka"], correct: "lari", emoji: "🏃" },
  { id: "q20c", type: "word-building", level: "beginner", question: "Bina perkataan: 🍞", options: ["ro", "ti", "si", "pi"], correct: "roti", emoji: "🍞" },

  // ===== INTERMEDIATE - Multiple Choice =====
  { id: "q21", type: "multiple-choice", level: "intermediate", question: "Apa maksud 'sekolah'?", options: ["School", "House", "Table", "Chair"], correct: "School", emoji: "🏫" },
  { id: "q22", type: "multiple-choice", level: "intermediate", question: "'Saya ___ nasi' — pilih perkataan", options: ["makan", "tidur", "main", "minum"], correct: "makan", emoji: "🍽️" },
  { id: "q23", type: "multiple-choice", level: "intermediate", question: "'Adik ___ susu' — pilih perkataan", options: ["makan", "minum", "tidur", "main"], correct: "minum", emoji: "🥛" },
  { id: "q21a", type: "multiple-choice", level: "intermediate", question: "Apa maksud 'kereta'?", options: ["Car", "Bicycle", "Ship", "Plane"], correct: "Car", emoji: "🚗" },
  { id: "q21b", type: "multiple-choice", level: "intermediate", question: "Apa maksud 'cantik'?", options: ["Big", "Small", "Beautiful", "Hot"], correct: "Beautiful", emoji: "✨" },
  { id: "q21c", type: "multiple-choice", level: "intermediate", question: "'Cuaca hari ini sangat ___' (🔥)", options: ["sejuk", "panas", "cantik", "besar"], correct: "panas", emoji: "🔥" },
  { id: "q21d", type: "multiple-choice", level: "intermediate", question: "Siapa yang mengajar di sekolah?", options: ["doktor", "polis", "cikgu", "kawan"], correct: "cikgu", emoji: "👩‍🏫" },
  { id: "q21e", type: "multiple-choice", level: "intermediate", question: "'Ibu ___ di dapur' — pilih perkataan", options: ["memasak", "membeli", "menari", "bersenam"], correct: "memasak", emoji: "👩‍🍳" },

  // ===== INTERMEDIATE - Image Matching =====
  { id: "qi10", type: "image-matching", level: "intermediate", question: "Padankan perkataan 'kereta'", options: ["kereta", "basikal", "kapal", "bas"], correct: "kereta", imageOptions: [{ emoji: "🚗", label: "kereta" }, { emoji: "🚲", label: "basikal" }, { emoji: "🚢", label: "kapal" }, { emoji: "🚌", label: "bas" }] },
  { id: "qi11", type: "image-matching", level: "intermediate", question: "Padankan perkataan 'cikgu'", options: ["cikgu", "doktor", "polis", "kawan"], correct: "cikgu", imageOptions: [{ emoji: "👩‍🏫", label: "cikgu" }, { emoji: "👨‍⚕️", label: "doktor" }, { emoji: "👮", label: "polis" }, { emoji: "🤝", label: "kawan" }] },

  // ===== INTERMEDIATE - Sentence Order =====
  { id: "q24", type: "sentence-order", level: "intermediate", question: "Susun ayat yang betul", options: ["Saya", "makan", "nasi"], correct: "Saya makan nasi", emoji: "📝" },
  { id: "q25", type: "sentence-order", level: "intermediate", question: "Susun ayat yang betul", options: ["Ini", "ibu", "saya"], correct: "Ini ibu saya", emoji: "📝" },
  { id: "q25a", type: "sentence-order", level: "intermediate", question: "Susun ayat yang betul", options: ["Kucing", "itu", "comel"], correct: "Kucing itu comel", emoji: "📝" },
  { id: "q25b", type: "sentence-order", level: "intermediate", question: "Susun ayat yang betul", options: ["Adik", "minum", "susu"], correct: "Adik minum susu", emoji: "📝" },
  { id: "q25c", type: "sentence-order", level: "intermediate", question: "Susun ayat yang betul", options: ["Ibu", "memasak", "nasi"], correct: "Ibu memasak nasi", emoji: "📝" },

  // ===== INTERMEDIATE - Word Building =====
  { id: "q25d", type: "word-building", level: "intermediate", question: "Bina perkataan: 💺", options: ["ke", "ru", "si", "la"], correct: "kerusi", emoji: "💺" },
  { id: "q25e", type: "word-building", level: "intermediate", question: "Bina perkataan: 🚗", options: ["ke", "re", "ta", "ba"], correct: "kereta", emoji: "🚗" },

  // ===== ADVANCED =====
  { id: "q26", type: "multiple-choice", level: "advanced", question: "'Nama kamu siapa?' — jawapan yang betul?", options: ["Nama saya Ali", "Saya makan", "Ini buku", "Selamat pagi"], correct: "Nama saya Ali", emoji: "💬" },
  { id: "q27", type: "multiple-choice", level: "advanced", question: "'Apa khabar?' — jawapan yang betul?", options: ["Khabar baik", "Nama saya", "Terima kasih", "Selamat tinggal"], correct: "Khabar baik", emoji: "💬" },
  { id: "q28", type: "sentence-order", level: "advanced", question: "Susun ayat yang betul", options: ["Ali", "pergi", "ke", "sekolah"], correct: "Ali pergi ke sekolah", emoji: "📝" },
  { id: "q28a", type: "multiple-choice", level: "advanced", question: "Apa maksud 'perpustakaan'?", options: ["Library", "Restaurant", "Hospital", "School"], correct: "Library", emoji: "📚" },
  { id: "q28b", type: "sentence-order", level: "advanced", question: "Susun ayat yang betul", options: ["Saya", "suka", "membaca", "buku"], correct: "Saya suka membaca buku", emoji: "📝" },
  { id: "q28c", type: "multiple-choice", level: "advanced", question: "'Selamat pagi' bermaksud...", options: ["Good morning", "Good night", "Thank you", "Goodbye"], correct: "Good morning", emoji: "🌅" },
  { id: "q28d", type: "image-matching", level: "advanced", question: "Padankan perkataan 'perpustakaan'", options: ["perpustakaan", "restoran", "hospital", "sekolah"], correct: "perpustakaan", imageOptions: [{ emoji: "📚", label: "perpustakaan" }, { emoji: "🍽️", label: "restoran" }, { emoji: "🏥", label: "hospital" }, { emoji: "🏫", label: "sekolah" }] },
];

export const sentencesData: SentenceItem[] = [
  { id: "s1", sentence: "Saya makan nasi", words: ["Saya", "makan", "nasi"], meaning: "I eat rice", level: "intermediate" },
  { id: "s2", sentence: "Ini ibu saya", words: ["Ini", "ibu", "saya"], meaning: "This is my mother", level: "intermediate" },
  { id: "s3", sentence: "Ali pergi sekolah", words: ["Ali", "pergi", "sekolah"], meaning: "Ali goes to school", level: "intermediate" },
  { id: "s4", sentence: "Kucing itu comel", words: ["Kucing", "itu", "comel"], meaning: "That cat is cute", level: "intermediate" },
  { id: "s5", sentence: "Adik minum susu", words: ["Adik", "minum", "susu"], meaning: "Little sibling drinks milk", level: "intermediate" },
  { id: "s6", sentence: "Ibu memasak nasi", words: ["Ibu", "memasak", "nasi"], meaning: "Mother cooks rice", level: "intermediate" },
  { id: "s7", sentence: "Bapa pergi kedai", words: ["Bapa", "pergi", "kedai"], meaning: "Father goes to the shop", level: "intermediate" },
  { id: "s8", sentence: "Kakak baca buku", words: ["Kakak", "baca", "buku"], meaning: "Older sister reads a book", level: "intermediate" },
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

// ===== Custom Content from Database =====
import { supabase } from "@/integrations/supabase/client";

// Cache for custom content (refreshed on demand)
let _cachedCustomWords: WordItem[] = [];
let _cachedCustomQuiz: QuizQuestion[] = [];
let _cacheLoaded = false;

export async function loadCustomContent() {
  const { data: words } = await supabase.from("custom_words").select("*");
  const { data: quiz } = await supabase.from("custom_quiz").select("*");

  _cachedCustomWords = (words || []).map(w => ({
    id: w.id,
    word: w.word,
    syllables: w.syllables,
    meaning: w.meaning,
    emoji: w.emoji,
    level: w.level as WordItem["level"],
    category: w.category,
  }));

  _cachedCustomQuiz = (quiz || []).map(q => ({
    id: q.id,
    type: q.type as QuizQuestion["type"],
    level: q.level as QuizQuestion["level"],
    question: q.question,
    options: q.options,
    correct: q.correct,
    emoji: q.emoji || undefined,
  }));

  _cacheLoaded = true;
}

// Get all words (built-in + custom from DB cache)
export function getAllWords(): WordItem[] {
  return [...wordsData, ..._cachedCustomWords];
}

// Get all quiz questions (built-in + custom from DB cache)
export function getAllQuiz(): QuizQuestion[] {
  return [...quizData, ..._cachedCustomQuiz];
}

export function getAllQuizByLevel(level: QuizQuestion["level"], count: number = 5): QuizQuestion[] {
  const all = getAllQuiz().filter((q) => q.level === level);
  return getRandomItems(all, Math.min(count, all.length));
}

export function isCacheLoaded() { return _cacheLoaded; }

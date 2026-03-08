// Progress tracking using localStorage

export interface UserProgress {
  totalStars: number;
  lessonsCompleted: number;
  wordsLearned: string[];
  quizScores: { date: string; level: string; score: number; total: number }[];
  currentLevel: "beginner" | "intermediate" | "advanced";
  badges: string[];
}

const PROGRESS_KEY = "bahasa-buddy-progress";

export function getProgress(): UserProgress {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (stored) return JSON.parse(stored);
  return {
    totalStars: 0,
    lessonsCompleted: 0,
    wordsLearned: [],
    quizScores: [],
    currentLevel: "beginner",
    badges: [],
  };
}

export function saveProgress(progress: UserProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function addStars(count: number) {
  const p = getProgress();
  p.totalStars += count;
  saveProgress(p);
  return p;
}

export function completeLesson() {
  const p = getProgress();
  p.lessonsCompleted += 1;
  // Check for badges
  if (p.lessonsCompleted >= 1 && !p.badges.includes("first-lesson")) p.badges.push("first-lesson");
  if (p.lessonsCompleted >= 5 && !p.badges.includes("five-lessons")) p.badges.push("five-lessons");
  if (p.lessonsCompleted >= 10 && !p.badges.includes("ten-lessons")) p.badges.push("ten-lessons");
  saveProgress(p);
  return p;
}

export function addQuizScore(level: string, score: number, total: number) {
  const p = getProgress();
  p.quizScores.push({ date: new Date().toISOString(), level, score, total });
  p.totalStars += score;
  if (score === total && !p.badges.includes("perfect-quiz")) p.badges.push("perfect-quiz");
  saveProgress(p);
  return p;
}

export function learnWord(wordId: string) {
  const p = getProgress();
  if (!p.wordsLearned.includes(wordId)) {
    p.wordsLearned.push(wordId);
    saveProgress(p);
  }
  return p;
}

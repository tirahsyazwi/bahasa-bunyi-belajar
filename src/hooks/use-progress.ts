import { useState, useEffect } from "react";
import { getProgress, UserProgress } from "@/data/progress";

const defaultProgress: UserProgress = {
  totalStars: 0,
  lessonsCompleted: 0,
  wordsLearned: [],
  quizScores: [],
  currentLevel: "beginner",
  badges: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const p = await getProgress();
    setProgress(p);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  return { progress, loading, refresh };
}

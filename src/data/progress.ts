// Progress tracking using Supabase database
import { supabase } from "@/integrations/supabase/client";

export interface UserProgress {
  totalStars: number;
  lessonsCompleted: number;
  wordsLearned: string[];
  quizScores: { date: string; level: string; score: number; total: number }[];
  currentLevel: "beginner" | "intermediate" | "advanced";
  badges: string[];
}

const defaultProgress: UserProgress = {
  totalStars: 0,
  lessonsCompleted: 0,
  wordsLearned: [],
  quizScores: [],
  currentLevel: "beginner",
  badges: [],
};

async function getUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function getProgress(): Promise<UserProgress> {
  const userId = await getUserId();
  if (!userId) return defaultProgress;

  // Get progress
  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .single();

  // Get quiz scores
  const { data: scores } = await supabase
    .from("quiz_scores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (!progress) {
    // Create initial progress record
    await supabase.from("user_progress").insert({ user_id: userId });
    return {
      ...defaultProgress,
      quizScores: (scores || []).map(s => ({ date: s.created_at, level: s.level, score: s.score, total: s.total })),
    };
  }

  return {
    totalStars: progress.total_stars,
    lessonsCompleted: progress.lessons_completed,
    wordsLearned: progress.words_learned || [],
    currentLevel: (progress.current_level as UserProgress["currentLevel"]) || "beginner",
    badges: progress.badges || [],
    quizScores: (scores || []).map(s => ({ date: s.created_at, level: s.level, score: s.score, total: s.total })),
  };
}

export async function addStars(count: number) {
  const userId = await getUserId();
  if (!userId) return;

  const { data: existing } = await supabase
    .from("user_progress")
    .select("total_stars")
    .eq("user_id", userId)
    .single();

  if (existing) {
    await supabase
      .from("user_progress")
      .update({ total_stars: existing.total_stars + count })
      .eq("user_id", userId);
  } else {
    await supabase.from("user_progress").insert({ user_id: userId, total_stars: count });
  }
}

export async function completeLesson() {
  const userId = await getUserId();
  if (!userId) return;

  const { data: existing } = await supabase
    .from("user_progress")
    .select("lessons_completed, badges")
    .eq("user_id", userId)
    .single();

  const newCount = (existing?.lessons_completed || 0) + 1;
  const badges = existing?.badges || [];
  if (newCount >= 1 && !badges.includes("first-lesson")) badges.push("first-lesson");
  if (newCount >= 5 && !badges.includes("five-lessons")) badges.push("five-lessons");
  if (newCount >= 10 && !badges.includes("ten-lessons")) badges.push("ten-lessons");

  if (existing) {
    await supabase
      .from("user_progress")
      .update({ lessons_completed: newCount, badges })
      .eq("user_id", userId);
  } else {
    await supabase.from("user_progress").insert({ user_id: userId, lessons_completed: newCount, badges });
  }
}

export async function addQuizScore(level: string, score: number, total: number) {
  const userId = await getUserId();
  if (!userId) return;

  // Insert score
  await supabase.from("quiz_scores").insert({ user_id: userId, level, score, total });

  // Update stars and badges
  const { data: existing } = await supabase
    .from("user_progress")
    .select("total_stars, badges")
    .eq("user_id", userId)
    .single();

  const badges = existing?.badges || [];
  if (score === total && !badges.includes("perfect-quiz")) badges.push("perfect-quiz");

  if (existing) {
    await supabase
      .from("user_progress")
      .update({ total_stars: existing.total_stars + score, badges })
      .eq("user_id", userId);
  } else {
    await supabase.from("user_progress").insert({ user_id: userId, total_stars: score, badges });
  }
}

export async function learnWord(wordId: string) {
  const userId = await getUserId();
  if (!userId) return;

  const { data: existing } = await supabase
    .from("user_progress")
    .select("words_learned")
    .eq("user_id", userId)
    .single();

  const words = existing?.words_learned || [];
  if (!words.includes(wordId)) {
    words.push(wordId);
    if (existing) {
      await supabase
        .from("user_progress")
        .update({ words_learned: words })
        .eq("user_id", userId);
    } else {
      await supabase.from("user_progress").insert({ user_id: userId, words_learned: words });
    }
  }
}

import { motion } from "framer-motion";
import { ArrowLeft, Star, Trophy, BookOpen, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProgress } from "@/data/progress";
import { wordsData } from "@/data/content";

const badgeMap: Record<string, { emoji: string; label: string }> = {
  "first-lesson": { emoji: "🎓", label: "Pelajaran Pertama" },
  "five-lessons": { emoji: "📚", label: "5 Pelajaran" },
  "ten-lessons": { emoji: "🏅", label: "10 Pelajaran" },
  "perfect-quiz": { emoji: "💯", label: "Kuiz Sempurna" },
};

const Progress = () => {
  const navigate = useNavigate();
  const progress = getProgress();

  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="p-2 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-display text-foreground">Kemajuan Saya</h1>
      </header>

      <main className="px-6 pb-8 max-w-lg mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Star className="w-6 h-6 text-star fill-star" />, value: progress.totalStars, label: "Bintang" },
            { icon: <BookOpen className="w-6 h-6 text-primary" />, value: progress.lessonsCompleted, label: "Pelajaran" },
            { icon: <Zap className="w-6 h-6 text-accent" />, value: progress.wordsLearned.length, label: "Perkataan" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-4 shadow-card text-center"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl font-display text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <div>
          <h3 className="font-display text-lg text-foreground mb-3">🏆 Lencana (Badges)</h3>
          {progress.badges.length === 0 ? (
            <p className="text-muted-foreground text-sm">Complete lessons and quizzes to earn badges!</p>
          ) : (
            <div className="flex gap-3 flex-wrap">
              {progress.badges.map((badge) => {
                const info = badgeMap[badge];
                return info ? (
                  <motion.div
                    key={badge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-card rounded-2xl p-3 shadow-soft text-center min-w-[80px]"
                  >
                    <div className="text-3xl mb-1">{info.emoji}</div>
                    <div className="text-xs font-bold text-foreground">{info.label}</div>
                  </motion.div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Recent Quizzes */}
        <div>
          <h3 className="font-display text-lg text-foreground mb-3">📊 Kuiz Terkini</h3>
          {progress.quizScores.length === 0 ? (
            <p className="text-muted-foreground text-sm">Take a quiz to see your scores here!</p>
          ) : (
            <div className="space-y-2">
              {progress.quizScores.slice(-5).reverse().map((qs, i) => (
                <div key={i} className="bg-card rounded-xl p-3 shadow-soft flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-foreground capitalize">{qs.level}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(qs.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="font-display text-primary">
                    {qs.score}/{qs.total}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Words Learned */}
        <div>
          <h3 className="font-display text-lg text-foreground mb-3">📖 Perkataan Dipelajari</h3>
          {progress.wordsLearned.length === 0 ? (
            <p className="text-muted-foreground text-sm">Start a lesson to learn new words!</p>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {progress.wordsLearned.map((wId) => {
                const word = wordsData.find((w) => w.id === wId);
                return word ? (
                  <span key={wId} className="bg-secondary rounded-full px-3 py-1 text-sm font-bold text-secondary-foreground">
                    {word.emoji} {word.word}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Progress;

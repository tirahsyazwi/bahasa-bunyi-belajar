import { motion } from "framer-motion";
import { ArrowLeft, Star, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProgress } from "@/data/progress";

const levels = [
  {
    id: "beginner",
    title: "Tahap 1",
    subtitle: "Fonik & Perkataan",
    description: "Learn vowels, consonants, and basic words",
    emoji: "🔤",
    color: "bg-mint",
    requiredStars: 0,
  },
  {
    id: "intermediate",
    title: "Tahap 2",
    subtitle: "Ayat Mudah",
    description: "Build simple sentences",
    emoji: "📝",
    color: "bg-sky",
    requiredStars: 10,
  },
  {
    id: "advanced",
    title: "Tahap 3",
    subtitle: "Perbualan",
    description: "Conversations and comprehension",
    emoji: "💬",
    color: "bg-lavender",
    requiredStars: 25,
  },
];

const LevelSelect = () => {
  const navigate = useNavigate();
  const progress = getProgress();

  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="p-2 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-display text-foreground">Pilih Tahap</h1>
        <div className="ml-auto flex items-center gap-1 bg-secondary rounded-full px-3 py-1.5 font-bold text-secondary-foreground">
          <Star className="w-4 h-4 text-star fill-star" />
          <span>{progress.totalStars}</span>
        </div>
      </header>

      <main className="px-6 pb-8 space-y-4 max-w-lg mx-auto">
        {levels.map((level, i) => {
          const isLocked = progress.totalStars < level.requiredStars;

          return (
            <motion.button
              key={level.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => !isLocked && navigate(`/lesson/${level.id}`)}
              disabled={isLocked}
              className={`w-full p-5 rounded-3xl shadow-card flex items-center gap-4 text-left transition-all
                ${isLocked ? "opacity-50 bg-muted" : `bg-card hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`}
              `}
            >
              <div className={`w-16 h-16 rounded-2xl ${level.color} flex items-center justify-center text-3xl`}>
                {isLocked ? <Lock className="w-6 h-6 text-muted-foreground" /> : level.emoji}
              </div>
              <div className="flex-1">
                <div className="font-display text-lg text-foreground">{level.title}</div>
                <div className="font-bold text-primary text-sm">{level.subtitle}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{level.description}</div>
              </div>
              {isLocked && (
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="w-3 h-3" /> {level.requiredStars}
                </div>
              )}
            </motion.button>
          );
        })}

        {/* Quick actions */}
        <div className="pt-4 grid grid-cols-3 gap-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate("/words")}
            className="p-4 rounded-2xl bg-peach shadow-soft text-center hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span className="text-3xl block mb-1">📖</span>
            <span className="font-bold text-sm text-foreground">Kamus</span>
            <span className="text-xs text-muted-foreground block">Word List</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate("/progress")}
            className="p-4 rounded-2xl bg-mint shadow-soft text-center hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span className="text-3xl block mb-1">🏆</span>
            <span className="font-bold text-sm text-foreground">Kemajuan</span>
            <span className="text-xs text-muted-foreground block">Progress</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate("/admin")}
            className="p-4 rounded-2xl bg-lavender shadow-soft text-center hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span className="text-3xl block mb-1">⚙️</span>
            <span className="font-bold text-sm text-foreground">Admin</span>
            <span className="text-xs text-muted-foreground block">Manage</span>
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default LevelSelect;

import { motion } from "framer-motion";
import { Star, BookOpen, Trophy, ArrowRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/hooks/use-progress";
import { useAuth } from "@/hooks/use-auth";

const Home = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌟</span>
          <h1 className="text-2xl font-display text-primary">Bahasa Buddy</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/progress")}
            className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1.5 font-bold text-secondary-foreground"
          >
            <Star className="w-4 h-4 text-star fill-star" />
            <span>{progress.totalStars}</span>
          </button>
          <button
            onClick={signOut}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-8xl mb-6"
        >
          📚
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-display text-foreground text-center mb-2"
        >
          Jom Belajar!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center mb-8 text-lg max-w-sm"
        >
          Let's learn Bahasa Melayu together! Start with sounds and build words 🎉
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm space-y-3"
        >
          <Button variant="hero" size="xl" className="w-full" onClick={() => navigate("/levels")}>
            Mula Belajar <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="warm" size="lg" className="w-full" onClick={() => navigate("/quiz/beginner")}>
            <Trophy className="w-5 h-5" /> Kuiz Pantas
          </Button>
        </motion.div>

        {progress.lessonsCompleted > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex gap-6 text-center"
          >
            <div>
              <div className="text-2xl font-display text-primary">{progress.lessonsCompleted}</div>
              <div className="text-xs text-muted-foreground">Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-display text-star">{progress.totalStars}</div>
              <div className="text-xs text-muted-foreground">Stars</div>
            </div>
            <div>
              <div className="text-2xl font-display text-accent">{progress.wordsLearned.length}</div>
              <div className="text-xs text-muted-foreground">Words</div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Home;

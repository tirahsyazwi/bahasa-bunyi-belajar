import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  score: number;
  total: number;
  level: string;
}

const QuizComplete = ({ score, total, level }: Props) => {
  const navigate = useNavigate();
  const stars = Math.ceil((score / total) * 5);
  const isPerfect = score === total;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-7xl mb-4">
        {isPerfect ? "🏆" : score > total / 2 ? "🎉" : "💪"}
      </motion.div>
      <h2 className="text-3xl font-display text-foreground mb-2">
        {isPerfect ? "Sempurna!" : score > total / 2 ? "Bagus!" : "Cuba lagi!"}
      </h2>
      <p className="text-lg text-muted-foreground mb-4">
        {score} / {total} betul
      </p>
      <div className="flex gap-1 mb-6">
        {Array.from({ length: stars }).map((_, i) => (
          <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.15 }} className="text-3xl">
            ⭐
          </motion.span>
        ))}
      </div>
      <div className="space-y-3 w-full max-w-xs">
        <Button variant="hero" size="lg" className="w-full" onClick={() => navigate(`/quiz/${level}`)}>
          Cuba Lagi 🔄
        </Button>
        <Button variant="level" size="lg" className="w-full" onClick={() => navigate("/levels")}>
          Kembali ke Menu
        </Button>
      </div>
    </div>
  );
};

export default QuizComplete;

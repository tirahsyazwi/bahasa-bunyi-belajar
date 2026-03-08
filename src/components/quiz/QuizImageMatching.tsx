import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { QuizQuestion } from "@/data/content";

interface Props {
  q: QuizQuestion;
  selected: string | null;
  isCorrect: boolean | null;
  onAnswer: (answer: string) => void;
}

const QuizImageMatching = ({ q, selected, isCorrect, onAnswer }: Props) => {
  const imageOptions = q.imageOptions || [];

  return (
    <div className="grid grid-cols-2 gap-4">
      {imageOptions.map((opt) => {
        let borderClass = "border-muted hover:border-primary";
        if (selected !== null) {
          if (opt.label === q.correct) borderClass = "border-success bg-success/10";
          else if (opt.label === selected) borderClass = "border-destructive bg-destructive/10";
        }

        return (
          <motion.button
            key={opt.label}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => onAnswer(opt.label)}
            disabled={selected !== null}
            className={`relative p-4 rounded-2xl border-3 bg-card shadow-soft flex flex-col items-center gap-2 transition-all border-2 ${borderClass}`}
          >
            <span className="text-5xl">{opt.emoji}</span>
            <span className="font-bold text-sm text-foreground">{opt.label}</span>
            {selected && opt.label === q.correct && (
              <CheckCircle className="w-5 h-5 text-success absolute top-2 right-2" />
            )}
            {selected && opt.label === selected && opt.label !== q.correct && (
              <XCircle className="w-5 h-5 text-destructive absolute top-2 right-2" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default QuizImageMatching;

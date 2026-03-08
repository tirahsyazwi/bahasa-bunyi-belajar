import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/data/content";

interface Props {
  q: QuizQuestion;
  selected: string | null;
  isCorrect: boolean | null;
  buildSyllables: string[];
  onBuildSyllable: (syl: string) => void;
}

const QuizWordBuilding = ({ q, selected, isCorrect, buildSyllables, onBuildSyllable }: Props) => (
  <div>
    <div className="flex justify-center gap-2 mb-6 min-h-[3rem]">
      {buildSyllables.map((s, i) => (
        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-display text-xl">
          {s}
        </motion.span>
      ))}
      {buildSyllables.length === 0 && <span className="text-muted-foreground">Tap syllables to build the word</span>}
    </div>
    <div className="flex justify-center gap-3 flex-wrap">
      {q.options.map((opt) => (
        <Button
          key={opt}
          variant={selected !== null ? (isCorrect ? "correct" : "wrong") : "option"}
          size="lg"
          onClick={() => onBuildSyllable(opt)}
          disabled={buildSyllables.includes(opt) || selected !== null}
        >
          {opt}
        </Button>
      ))}
    </div>
  </div>
);

export default QuizWordBuilding;

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/data/content";

interface Props {
  q: QuizQuestion;
  selected: string | null;
  isCorrect: boolean | null;
  sentenceWords: string[];
  onSentenceWord: (word: string) => void;
}

const QuizSentenceOrder = ({ q, selected, isCorrect, sentenceWords, onSentenceWord }: Props) => (
  <div>
    <div className="flex justify-center gap-2 mb-6 min-h-[3rem] flex-wrap">
      {sentenceWords.map((w, i) => (
        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-3 py-2 rounded-xl bg-primary text-primary-foreground font-bold">
          {w}
        </motion.span>
      ))}
      {sentenceWords.length === 0 && <span className="text-muted-foreground">Tap words in order</span>}
    </div>
    <div className="flex justify-center gap-3 flex-wrap">
      {q.options.map((opt) => (
        <Button
          key={opt}
          variant={selected !== null ? (isCorrect ? "correct" : "wrong") : "option"}
          size="lg"
          onClick={() => onSentenceWord(opt)}
          disabled={sentenceWords.includes(opt) || selected !== null}
        >
          {opt}
        </Button>
      ))}
    </div>
  </div>
);

export default QuizSentenceOrder;

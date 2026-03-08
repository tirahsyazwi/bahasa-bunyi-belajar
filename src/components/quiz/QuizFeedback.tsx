import { motion, AnimatePresence } from "framer-motion";

interface Props {
  selected: string | null;
  isCorrect: boolean | null;
  correct: string;
}

const QuizFeedback = ({ selected, isCorrect, correct }: Props) => (
  <AnimatePresence>
    {selected !== null && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-6 p-4 rounded-2xl text-center font-bold ${
          isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        }`}
      >
        {isCorrect ? "✅ Betul! Correct!" : `❌ Jawapan betul: ${correct}`}
      </motion.div>
    )}
  </AnimatePresence>
);

export default QuizFeedback;

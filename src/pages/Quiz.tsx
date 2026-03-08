import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllQuizByLevel, QuizQuestion } from "@/data/content";
import { addQuizScore } from "@/data/progress";
import QuizMultipleChoice from "@/components/quiz/QuizMultipleChoice";
import QuizWordBuilding from "@/components/quiz/QuizWordBuilding";
import QuizSentenceOrder from "@/components/quiz/QuizSentenceOrder";
import QuizImageMatching from "@/components/quiz/QuizImageMatching";
import QuizFeedback from "@/components/quiz/QuizFeedback";
import QuizComplete from "@/components/quiz/QuizComplete";

const Quiz = () => {
  const { level = "beginner" } = useParams();
  const navigate = useNavigate();
  const questions = useMemo(() => getAllQuizByLevel(level as QuizQuestion["level"], 8), [level]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [buildSyllables, setBuildSyllables] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const q = questions[current];

  const handleAnswer = (answer: string) => {
    if (selected !== null) return;
    setSelected(answer);
    const correct = answer === q.correct;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setIsCorrect(null);
        setSentenceWords([]);
        setBuildSyllables([]);
      } else {
        const finalScore = correct ? score + 1 : score;
        addQuizScore(level, finalScore, questions.length);
        setDone(true);
      }
    }, 1200);
  };

  const handleSentenceWord = (word: string) => {
    if (selected !== null) return;
    const newWords = [...sentenceWords, word];
    setSentenceWords(newWords);
    if (newWords.length === q.options.length) {
      handleAnswer(newWords.join(" "));
    }
  };

  const handleBuildSyllable = (syl: string) => {
    if (selected !== null) return;
    const newSyls = [...buildSyllables, syl];
    setBuildSyllables(newSyls);
    if (newSyls.length === 2) {
      handleAnswer(newSyls.join(""));
    }
  };

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-display text-foreground">No questions available!</p>
          <Button variant="hero" onClick={() => navigate("/levels")} className="mt-4">Back</Button>
        </div>
      </div>
    );
  }

  if (done) {
    return <QuizComplete score={score} total={questions.length} level={level} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4 flex items-center gap-3">
        <button onClick={() => navigate("/levels")} className="p-2 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-warm rounded-full"
            animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">{current + 1}/{questions.length}</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-md"
          >
            {q.emoji && <div className="text-6xl text-center mb-4">{q.emoji}</div>}
            <h3 className="text-xl font-display text-foreground text-center mb-6">{q.question}</h3>

            {q.type === "multiple-choice" && (
              <QuizMultipleChoice q={q} selected={selected} onAnswer={handleAnswer} />
            )}

            {q.type === "image-matching" && (
              <QuizImageMatching q={q} selected={selected} isCorrect={isCorrect} onAnswer={handleAnswer} />
            )}

            {q.type === "word-building" && (
              <QuizWordBuilding
                q={q}
                selected={selected}
                isCorrect={isCorrect}
                buildSyllables={buildSyllables}
                onBuildSyllable={handleBuildSyllable}
              />
            )}

            {q.type === "sentence-order" && (
              <QuizSentenceOrder
                q={q}
                selected={selected}
                isCorrect={isCorrect}
                sentenceWords={sentenceWords}
                onSentenceWord={handleSentenceWord}
              />
            )}

            <QuizFeedback selected={selected} isCorrect={isCorrect} correct={q.correct} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Quiz;

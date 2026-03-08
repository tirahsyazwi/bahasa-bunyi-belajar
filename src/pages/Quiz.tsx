import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getQuizByLevel, QuizQuestion } from "@/data/content";
import { addQuizScore } from "@/data/progress";

const Quiz = () => {
  const { level = "beginner" } = useParams();
  const navigate = useNavigate();
  const questions = useMemo(() => getQuizByLevel(level as QuizQuestion["level"], 8), [level]);
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
    const built = newWords.join(" ");
    if (newWords.length === q.options.length) {
      handleAnswer(built);
    }
  };

  const handleBuildSyllable = (syl: string) => {
    if (selected !== null) return;
    const newSyls = [...buildSyllables, syl];
    setBuildSyllables(newSyls);
    const built = newSyls.join("");
    if (newSyls.length === 2) {
      handleAnswer(built);
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
    const stars = Math.ceil((score / questions.length) * 5);
    const isPerfect = score === questions.length;

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-7xl mb-4">
          {isPerfect ? "🏆" : score > questions.length / 2 ? "🎉" : "💪"}
        </motion.div>
        <h2 className="text-3xl font-display text-foreground mb-2">
          {isPerfect ? "Sempurna!" : score > questions.length / 2 ? "Bagus!" : "Cuba lagi!"}
        </h2>
        <p className="text-lg text-muted-foreground mb-4">
          {score} / {questions.length} betul
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
              <div className="space-y-3">
                {q.options.map((opt) => {
                  let variant: "option" | "correct" | "wrong" = "option";
                  if (selected !== null) {
                    if (opt === q.correct) variant = "correct";
                    else if (opt === selected) variant = "wrong";
                  }
                  return (
                    <Button
                      key={opt}
                      variant={variant}
                      className="w-full justify-start text-left"
                      onClick={() => handleAnswer(opt)}
                    >
                      {opt}
                      {selected && opt === q.correct && <CheckCircle className="w-5 h-5 ml-auto" />}
                      {selected && opt === selected && opt !== q.correct && <XCircle className="w-5 h-5 ml-auto" />}
                    </Button>
                  );
                })}
              </div>
            )}

            {q.type === "word-building" && (
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
                      variant={
                        selected !== null
                          ? isCorrect
                            ? "correct"
                            : "wrong"
                          : "option"
                      }
                      size="lg"
                      onClick={() => handleBuildSyllable(opt)}
                      disabled={buildSyllables.includes(opt) || selected !== null}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {q.type === "sentence-order" && (
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
                      variant={
                        selected !== null
                          ? isCorrect
                            ? "correct"
                            : "wrong"
                          : "option"
                      }
                      size="lg"
                      onClick={() => handleSentenceWord(opt)}
                      disabled={sentenceWords.includes(opt) || selected !== null}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-2xl text-center font-bold ${
                    isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {isCorrect ? "✅ Betul! Correct!" : `❌ Jawapan betul: ${q.correct}`}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Quiz;

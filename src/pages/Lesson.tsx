import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { phonicsData, getWordsByLevel, wordsData, sentencesData, vowels, consonants } from "@/data/content";
import { completeLesson, learnWord, addStars } from "@/data/progress";
import { useSpeech } from "@/hooks/use-speech";
import SpeakButton from "@/components/SpeakButton";

type LessonStep = { type: string; content: any };

function buildLessonSteps(level: string): LessonStep[] {
  const steps: LessonStep[] = [];

  if (level === "beginner") {
    steps.push({ type: "intro", content: { title: "Huruf Vokal", subtitle: "Vowels", emoji: "🔤", description: "Let's learn the 5 vowel sounds!" } });
    steps.push({ type: "vowels", content: { vowels } });
    const randomConsonants = [...consonants].sort(() => Math.random() - 0.5).slice(0, 3);
    randomConsonants.forEach((c) => {
      steps.push({ type: "phonics", content: { consonant: c, vowels, syllables: vowels.map((v) => `${c}${v}`) } });
    });
    const words = getWordsByLevel("beginner").sort(() => Math.random() - 0.5).slice(0, 5);
    words.forEach((w) => {
      steps.push({ type: "word", content: w });
    });
    steps.push({ type: "complete", content: { stars: 3, message: "Hebat! Great job!" } });
  } else if (level === "intermediate") {
    steps.push({ type: "intro", content: { title: "Ayat Mudah", subtitle: "Simple Sentences", emoji: "📝", description: "Let's build sentences!" } });
    const sentences = [...sentencesData].sort(() => Math.random() - 0.5).slice(0, 4);
    sentences.forEach((s) => {
      steps.push({ type: "sentence", content: s });
    });
    const words = getWordsByLevel("intermediate").sort(() => Math.random() - 0.5).slice(0, 3);
    words.forEach((w) => {
      steps.push({ type: "word", content: w });
    });
    steps.push({ type: "complete", content: { stars: 4, message: "Bagus sekali! Excellent!" } });
  } else {
    steps.push({ type: "intro", content: { title: "Perbualan", subtitle: "Conversations", emoji: "💬", description: "Let's practice talking!" } });
    steps.push({ type: "dialogue", content: { lines: [{ speaker: "A", text: "Apa khabar?" }, { speaker: "B", text: "Khabar baik, terima kasih!" }] } });
    steps.push({ type: "dialogue", content: { lines: [{ speaker: "A", text: "Nama kamu siapa?" }, { speaker: "B", text: "Nama saya Ali." }] } });
    steps.push({ type: "dialogue", content: { lines: [{ speaker: "A", text: "Kamu tinggal di mana?" }, { speaker: "B", text: "Saya tinggal di Kuala Lumpur." }] } });
    steps.push({ type: "complete", content: { stars: 5, message: "Cemerlang! Brilliant!" } });
  }

  return steps;
}

const Lesson = () => {
  const { level = "beginner" } = useParams();
  const navigate = useNavigate();
  const [steps] = useState(() => buildLessonSteps(level));
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const { speak, isSpeaking } = useSpeech();

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
      setSelectedSyllables([]);
    }
  };

  const handleComplete = async () => {
    const stars = step.content.stars || 3;
    await addStars(stars);
    await completeLesson();
    navigate(`/quiz/${level}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center gap-3">
        <button onClick={() => navigate("/levels")} className="p-2 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-hero rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">{currentStep + 1}/{steps.length}</span>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-md"
          >
            {step.type === "intro" && (
              <div className="text-center">
                <div className="text-7xl mb-4">{step.content.emoji}</div>
                <h2 className="text-3xl font-display text-foreground mb-1">{step.content.title}</h2>
                <p className="text-primary font-bold mb-2">{step.content.subtitle}</p>
                <p className="text-muted-foreground">{step.content.description}</p>
              </div>
            )}

            {step.type === "vowels" && (
              <div className="text-center">
                <h3 className="text-xl font-display text-foreground mb-6">Huruf Vokal</h3>
                <div className="flex justify-center gap-3 flex-wrap">
                  {step.content.vowels.map((v: string) => (
                    <motion.button
                      key={v}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => speak(v)}
                      className={`w-16 h-16 rounded-2xl shadow-card flex items-center justify-center text-3xl font-display transition-colors ${
                        isSpeaking ? "bg-accent text-accent-foreground" : "bg-secondary text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {v}
                    </motion.button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">Tap to hear the sound! 🔊</p>
              </div>
            )}

            {step.type === "phonics" && (
              <div className="text-center">
                <h3 className="text-xl font-display text-foreground mb-2">
                  Konsonan: <span className="text-primary">{step.content.consonant.toUpperCase()}</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-6">Tap each syllable to hear it</p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {step.content.syllables.map((s: string) => (
                    <motion.button
                      key={s}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => speak(s)}
                      className="w-20 h-20 rounded-2xl bg-card shadow-card flex flex-col items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group"
                    >
                      <span className="text-2xl font-display">{s}</span>
                      <Volume2 className="w-3 h-3 text-muted-foreground group-hover:text-primary-foreground mt-1" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step.type === "word" && (
              <div className="text-center">
                <div className="text-6xl mb-4">{step.content.emoji}</div>
                <div className="flex justify-center gap-2 mb-3">
                  {step.content.syllables.map((s: string, i: number) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="px-4 py-2 rounded-xl bg-secondary text-xl font-display text-primary"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <button
                    onClick={() => {
                      speak(step.content.word);
                      learnWord(step.content.id);
                    }}
                    className="text-3xl font-display text-foreground flex items-center justify-center gap-2 mx-auto hover:text-primary transition-colors"
                  >
                    {step.content.word}
                    <motion.div
                      animate={isSpeaking ? { scale: [1, 1.3, 1] } : {}}
                      transition={isSpeaking ? { repeat: Infinity, duration: 0.5 } : {}}
                    >
                      <Volume2 className={`w-5 h-5 ${isSpeaking ? "text-accent" : ""}`} />
                    </motion.div>
                  </button>
                  <p className="text-muted-foreground mt-1">{step.content.meaning}</p>
                </motion.div>
              </div>
            )}

            {step.type === "sentence" && (
              <div className="text-center">
                <h3 className="text-lg font-display text-foreground mb-4">Baca ayat ini:</h3>
                <div className="flex justify-center gap-2 flex-wrap mb-4">
                  {step.content.words.map((w: string, i: number) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="px-4 py-2 rounded-xl bg-card shadow-soft text-xl font-bold text-foreground"
                    >
                      {w}
                    </motion.span>
                  ))}
                </div>
                <SpeakButton text={step.content.sentence} label="Dengar 🔊" size="md" />
                <p className="text-muted-foreground text-sm mt-3">"{step.content.meaning}"</p>
              </div>
            )}

            {step.type === "dialogue" && (
              <div className="space-y-4">
                <h3 className="text-lg font-display text-foreground text-center mb-4">Perbualan:</h3>
                {step.content.lines.map((line: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: line.speaker === "A" ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.4 }}
                    className={`flex ${line.speaker === "B" ? "justify-end" : ""}`}
                  >
                    <button
                      onClick={() => speak(line.text)}
                      className={`max-w-[80%] p-4 rounded-2xl shadow-soft transition-colors ${
                        line.speaker === "A" ? "bg-sky rounded-bl-none" : "bg-peach rounded-br-none"
                      }`}
                    >
                      <span className="text-xs font-bold text-muted-foreground block mb-1">
                        {line.speaker === "A" ? "👤 Speaker A" : "👧 Speaker B"}
                      </span>
                      <span className="text-lg font-bold text-foreground flex items-center gap-2">
                        {line.text}
                        <motion.div
                          animate={isSpeaking ? { scale: [1, 1.2, 1] } : {}}
                          transition={isSpeaking ? { repeat: Infinity, duration: 0.6 } : {}}
                        >
                          <Volume2 className={`w-4 h-4 ${isSpeaking ? "text-accent" : "text-muted-foreground"}`} />
                        </motion.div>
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {step.type === "complete" && (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-7xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-3xl font-display text-foreground mb-2">{step.content.message}</h2>
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: step.content.stars }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                      className="text-4xl"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>
                <Button variant="hero" size="xl" onClick={handleComplete} className="w-full max-w-xs mx-auto">
                  Kuiz Sekarang! 🎯
                </Button>
                <Button variant="ghost" size="lg" onClick={() => navigate("/levels")} className="w-full max-w-xs mx-auto mt-2">
                  Kembali ke Menu
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Next button */}
      {step.type !== "complete" && (
        <div className="p-4">
          <Button variant="hero" size="lg" className="w-full max-w-md mx-auto" onClick={next}>
            Seterusnya <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Lesson;

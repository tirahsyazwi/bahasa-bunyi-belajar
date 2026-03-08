import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Upload, BookOpen, HelpCircle, Trash2, Users, Shield, ShieldCheck, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useRole } from "@/hooks/use-role";
import { WordItem, QuizQuestion } from "@/data/content";

type Tab = "words" | "quiz" | "csv" | "users";

interface UserWithRoles {
  user_id: string;
  display_name: string;
  avatar_emoji: string;
  created_at: string;
  roles: string[];
}

interface DbWord {
  id: string;
  word: string;
  syllables: string[];
  meaning: string;
  emoji: string;
  level: string;
  category: string;
  created_by: string;
}

interface DbQuiz {
  id: string;
  type: string;
  level: string;
  question: string;
  options: string[];
  correct: string;
  emoji: string | null;
  created_by: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isTeacher, isAdmin, loading: roleLoading } = useRole();
  const [tab, setTab] = useState<Tab>("words");
  const [customWords, setCustomWords] = useState<DbWord[]>([]);
  const [customQuiz, setCustomQuiz] = useState<DbQuiz[]>([]);

  // Word form
  const [word, setWord] = useState("");
  const [syllables, setSyllables] = useState("");
  const [meaning, setMeaning] = useState("");
  const [emoji, setEmoji] = useState("");
  const [wordLevel, setWordLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [category, setCategory] = useState("");

  // Quiz form
  const [qType, setQType] = useState<QuizQuestion["type"]>("multiple-choice");
  const [qLevel, setQLevel] = useState<QuizQuestion["level"]>("beginner");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [correct, setCorrect] = useState("");
  const [qEmoji, setQEmoji] = useState("");

  // CSV
  const [csvText, setCsvText] = useState("");
  const [csvType, setCsvType] = useState<"words" | "quiz">("words");

  const loadData = async () => {
    const { data: words } = await supabase.from("custom_words").select("*").order("created_at", { ascending: false });
    const { data: quiz } = await supabase.from("custom_quiz").select("*").order("created_at", { ascending: false });
    if (words) setCustomWords(words);
    if (quiz) setCustomQuiz(quiz);
  };

  useEffect(() => { if (isTeacher) loadData(); }, [isTeacher]);

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-5xl animate-bounce">⏳</div>
      </div>
    );
  }

  if (!isTeacher) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        <div className="text-6xl">🔒</div>
        <h1 className="text-2xl font-display text-foreground">Akses Terhad</h1>
        <p className="text-muted-foreground text-center max-w-sm">
          Hanya guru dan admin sahaja boleh mengakses panel ini. Sila hubungi guru anda untuk mendapatkan akses.
        </p>
        <Button onClick={() => navigate("/")} variant="outline">
          Kembali ke Utama
        </Button>
      </div>
    );
  }

  const handleAddWord = async () => {
    if (!word || !syllables || !meaning || !user) return;
    await supabase.from("custom_words").insert({
      created_by: user.id,
      word: word.trim(),
      syllables: syllables.split(",").map(s => s.trim()),
      meaning: meaning.trim(),
      emoji: emoji.trim() || "📝",
      level: wordLevel,
      category: category.trim() || "custom",
    });
    await loadData();
    setWord(""); setSyllables(""); setMeaning(""); setEmoji(""); setCategory("");
  };

  const handleAddQuiz = async () => {
    if (!question || !options || !correct || !user) return;
    await supabase.from("custom_quiz").insert({
      created_by: user.id,
      type: qType,
      level: qLevel,
      question: question.trim(),
      options: options.split(",").map(s => s.trim()),
      correct: correct.trim(),
      emoji: qEmoji.trim() || null,
    });
    await loadData();
    setQuestion(""); setOptions(""); setCorrect(""); setQEmoji("");
  };

  const handleCsvImport = async () => {
    if (!csvText.trim() || !user) return;
    const lines = csvText.trim().split("\n");
    let count = 0;

    for (const line of lines) {
      const cols = line.split(",").map(c => c.trim());
      if (csvType === "words" && cols.length >= 5) {
        const [w, syls, m, em, lvl, cat] = cols;
        await supabase.from("custom_words").insert({
          created_by: user.id,
          word: w,
          syllables: syls.split("|"),
          meaning: m,
          emoji: em || "📝",
          level: lvl || "beginner",
          category: cat || "custom",
        });
        count++;
      } else if (csvType === "quiz" && cols.length >= 5) {
        const [type, lvl, q, opts, cor, em] = cols;
        await supabase.from("custom_quiz").insert({
          created_by: user.id,
          type: type || "multiple-choice",
          level: lvl || "beginner",
          question: q,
          options: opts.split("|"),
          correct: cor,
          emoji: em || null,
        });
        count++;
      }
    }

    await loadData();
    setCsvText("");
    alert(`Imported ${count} items!`);
  };

  const deleteWord = async (id: string) => {
    await supabase.from("custom_words").delete().eq("id", id);
    await loadData();
  };

  const deleteQuiz = async (id: string) => {
    await supabase.from("custom_quiz").delete().eq("id", id);
    await loadData();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate("/levels")} className="p-2 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-display text-foreground">Admin Panel</h1>
      </header>

      <div className="flex border-b border-border">
        {([
          { id: "words" as Tab, label: "Words", icon: BookOpen },
          { id: "quiz" as Tab, label: "Quiz", icon: HelpCircle },
          { id: "csv" as Tab, label: "CSV Import", icon: Upload },
        ]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 p-3 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
              tab === t.id ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <main className="p-4 max-w-lg mx-auto space-y-6">
        {tab === "words" && (
          <>
            <div className="bg-card rounded-2xl p-4 shadow-soft space-y-3">
              <h3 className="font-display text-foreground">Add Word</h3>
              <Input placeholder="Word (e.g. buku)" value={word} onChange={e => setWord(e.target.value)} />
              <Input placeholder="Syllables (comma-separated: bu,ku)" value={syllables} onChange={e => setSyllables(e.target.value)} />
              <Input placeholder="Meaning (e.g. book)" value={meaning} onChange={e => setMeaning(e.target.value)} />
              <div className="flex gap-2">
                <Input placeholder="Emoji 📖" value={emoji} onChange={e => setEmoji(e.target.value)} className="w-24" />
                <Input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="flex-1" />
              </div>
              <select value={wordLevel} onChange={e => setWordLevel(e.target.value as WordItem["level"])}
                className="w-full p-2 rounded-lg border border-input bg-background text-foreground">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <Button variant="hero" className="w-full" onClick={handleAddWord}>
                <Plus className="w-4 h-4" /> Add Word
              </Button>
            </div>

            {customWords.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-display text-foreground text-sm">Custom Words ({customWords.length})</h3>
                {customWords.map(w => (
                  <div key={w.id} className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-soft">
                    <span className="text-2xl">{w.emoji}</span>
                    <div className="flex-1">
                      <span className="font-bold text-foreground">{w.word}</span>
                      <span className="text-muted-foreground text-sm ml-2">({w.meaning})</span>
                    </div>
                    <button onClick={() => deleteWord(w.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "quiz" && (
          <>
            <div className="bg-card rounded-2xl p-4 shadow-soft space-y-3">
              <h3 className="font-display text-foreground">Add Quiz Question</h3>
              <select value={qType} onChange={e => setQType(e.target.value as QuizQuestion["type"])}
                className="w-full p-2 rounded-lg border border-input bg-background text-foreground">
                <option value="multiple-choice">Multiple Choice</option>
                <option value="word-building">Word Building</option>
                <option value="sentence-order">Sentence Order</option>
                <option value="image-matching">Image Matching</option>
              </select>
              <select value={qLevel} onChange={e => setQLevel(e.target.value as QuizQuestion["level"])}
                className="w-full p-2 rounded-lg border border-input bg-background text-foreground">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <Input placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} />
              <Input placeholder="Options (comma-separated)" value={options} onChange={e => setOptions(e.target.value)} />
              <Input placeholder="Correct answer" value={correct} onChange={e => setCorrect(e.target.value)} />
              <Input placeholder="Emoji (optional)" value={qEmoji} onChange={e => setQEmoji(e.target.value)} />
              <Button variant="hero" className="w-full" onClick={handleAddQuiz}>
                <Plus className="w-4 h-4" /> Add Question
              </Button>
            </div>

            {customQuiz.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-display text-foreground text-sm">Custom Questions ({customQuiz.length})</h3>
                {customQuiz.map(q => (
                  <div key={q.id} className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-soft">
                    <span className="text-2xl">{q.emoji || "❓"}</span>
                    <div className="flex-1">
                      <span className="font-bold text-foreground text-sm">{q.question}</span>
                      <span className="text-muted-foreground text-xs ml-2">[{q.type}]</span>
                    </div>
                    <button onClick={() => deleteQuiz(q.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "csv" && (
          <div className="bg-card rounded-2xl p-4 shadow-soft space-y-3">
            <h3 className="font-display text-foreground">Bulk CSV Import</h3>
            <select value={csvType} onChange={e => setCsvType(e.target.value as "words" | "quiz")}
              className="w-full p-2 rounded-lg border border-input bg-background text-foreground">
              <option value="words">Words</option>
              <option value="quiz">Quiz Questions</option>
            </select>

            <div className="bg-muted rounded-xl p-3 text-xs text-muted-foreground">
              {csvType === "words" ? (
                <div>
                  <p className="font-bold mb-1">Format: word,syllables(|sep),meaning,emoji,level,category</p>
                  <p>Example: buku,bu|ku,book,📖,beginner,objects</p>
                </div>
              ) : (
                <div>
                  <p className="font-bold mb-1">Format: type,level,question,options(|sep),correct,emoji</p>
                  <p>Example: multiple-choice,beginner,Pilih perkataan untuk 📖,buku|susu|mata|kaki,buku,📖</p>
                </div>
              )}
            </div>

            <Textarea placeholder="Paste CSV data here (one item per line)..." value={csvText} onChange={e => setCsvText(e.target.value)} rows={8} />
            <Button variant="hero" className="w-full" onClick={handleCsvImport}>
              <Upload className="w-4 h-4" /> Import CSV
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;

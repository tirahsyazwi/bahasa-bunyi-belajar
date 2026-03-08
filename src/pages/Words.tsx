import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllWords } from "@/data/content";
import SpeakButton from "@/components/SpeakButton";

const Words = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const allWords = getAllWords();

  const categories = ["all", ...Array.from(new Set(allWords.map((w) => w.category)))];

  const filtered = allWords.filter((w) => {
    const matchSearch = w.word.includes(search.toLowerCase()) || w.meaning.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || w.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 flex items-center gap-3">
        <button onClick={() => navigate("/levels")} className="p-2 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-display text-foreground">Kamus</h1>
      </header>

      <main className="px-6 pb-8 max-w-lg mx-auto">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari perkataan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-card shadow-soft border-none outline-none font-body text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {cat === "all" ? "Semua" : cat}
            </button>
          ))}
        </div>

        {/* Word list */}
        <div className="grid gap-3">
          {filtered.map((word, i) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-3 text-left hover:shadow-card transition-shadow"
            >
              <span className="text-3xl">{word.emoji}</span>
              <div className="flex-1">
                <div className="font-display text-lg text-foreground">{word.word}</div>
                <div className="text-xs text-muted-foreground">{word.meaning}</div>
                <div className="flex gap-1 mt-1">
                  {word.syllables.map((s, j) => (
                    <span key={j} className="text-xs bg-secondary rounded px-1.5 py-0.5 text-primary font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <SpeakButton text={word.word} size="sm" />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Words;

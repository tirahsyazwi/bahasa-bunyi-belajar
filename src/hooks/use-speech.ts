import { useState, useEffect, useCallback, useRef } from "react";

/** Finds the best available Malay voice, falling back to any voice */
function findMalayVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Prefer ms-MY or ms
  const exact = voices.find(v => v.lang === "ms-MY");
  if (exact) return exact;
  const ms = voices.find(v => v.lang.startsWith("ms"));
  if (ms) return ms;
  // Fallback: id-ID (Indonesian, mutually intelligible)
  const id = voices.find(v => v.lang.startsWith("id"));
  if (id) return id;
  return null;
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoice(findMalayVoice(voices));
      }
    };

    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const speak = useCallback((text: string, rate: number = 0.75) => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ms-MY";
    utterance.rate = rate;
    utterance.pitch = 1.1;
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [voice]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, hasVoice: voice !== null };
}

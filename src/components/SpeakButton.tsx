import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { useSpeech } from "@/hooks/use-speech";

interface SpeakButtonProps {
  text: string;
  rate?: number;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Optional label shown next to the icon */
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: { btn: "w-8 h-8", icon: "w-3.5 h-3.5" },
  md: { btn: "w-10 h-10", icon: "w-4 h-4" },
  lg: { btn: "w-12 h-12", icon: "w-5 h-5" },
};

const SpeakButton = ({ text, rate = 0.75, size = "md", label, className = "" }: SpeakButtonProps) => {
  const { speak, isSpeaking } = useSpeech();
  const s = sizeMap[size];

  if (label) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => speak(text, rate)}
        className={`flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity ${className}`}
      >
        <motion.div
          animate={isSpeaking ? { scale: [1, 1.2, 1] } : {}}
          transition={isSpeaking ? { repeat: Infinity, duration: 0.6 } : {}}
        >
          <Volume2 className={`${s.icon} ${isSpeaking ? "text-accent" : ""}`} />
        </motion.div>
        <span className={isSpeaking ? "text-accent" : ""}>{label}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => speak(text, rate)}
      className={`${s.btn} rounded-full flex items-center justify-center transition-colors ${
        isSpeaking
          ? "bg-accent text-accent-foreground shadow-button"
          : "bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground"
      } ${className}`}
    >
      <motion.div
        animate={isSpeaking ? { scale: [1, 1.3, 1] } : {}}
        transition={isSpeaking ? { repeat: Infinity, duration: 0.5 } : {}}
      >
        <Volume2 className={s.icon} />
      </motion.div>
      {isSpeaking && (
        <>
          <motion.div
            className="absolute rounded-full border-2 border-accent"
            initial={{ width: s.btn, height: s.btn, opacity: 0.6 }}
            animate={{ width: "150%", height: "150%", opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeOut" }}
          />
        </>
      )}
    </motion.button>
  );
};

export default SpeakButton;

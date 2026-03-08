import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/data/content";

interface Props {
  q: QuizQuestion;
  selected: string | null;
  onAnswer: (answer: string) => void;
}

const QuizMultipleChoice = ({ q, selected, onAnswer }: Props) => (
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
          onClick={() => onAnswer(opt)}
        >
          {opt}
          {selected && opt === q.correct && <CheckCircle className="w-5 h-5 ml-auto" />}
          {selected && opt === selected && opt !== q.correct && <XCircle className="w-5 h-5 ml-auto" />}
        </Button>
      );
    })}
  </div>
);

export default QuizMultipleChoice;

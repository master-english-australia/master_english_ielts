import { Feedback } from "../types/feedback";

interface AnswerSectionProps {
  id: string;
  answerWidth: number;
  isSubmitted: boolean;
  currentPart: number;
  part1Essay: string;
  part2Essay: string;
  wordCount: number;
  feedback: Feedback | null;
  onEssayChange: (part: number, value: string) => void;
}

export const AnswerSection = ({
  id,
  answerWidth,
  isSubmitted,
  currentPart,
  part1Essay,
  part2Essay,
  wordCount,
  feedback,
  onEssayChange,
}: AnswerSectionProps) => {
  return (
    <div
      id={id}
      className="answer-section"
      style={{
        width: `${answerWidth}%`,
        maxWidth: `${answerWidth}%`,
        flex: `0 0 ${answerWidth}%`,
      }}
    >
      {!isSubmitted ? (
        <div className="editor-container">
          <></>

          <div className="word-count">Word Count: {wordCount}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

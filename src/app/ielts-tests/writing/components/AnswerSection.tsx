import { FloatingLabelTextarea } from '@/components/FloatingLabelTextarea';
import { FeedbackView } from '../../components/FeedbackView';
import { Feedback } from '../types/feedback';

interface AnswerSectionProps {
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
  answerWidth,
  isSubmitted,
  currentPart,
  part1Essay,
  part2Essay,
  wordCount,
  feedback,
  onEssayChange
}: AnswerSectionProps) => {
  return (
    <div 
      className="answer-section"
      style={{
        width: `${answerWidth}%`,
        maxWidth: `${answerWidth}%`,
        flex: `0 0 ${answerWidth}%`
      }}
    >
      {!isSubmitted ? (
        <div className="editor-container">
          <FloatingLabelTextarea
            value={currentPart === 1 ? part1Essay : part2Essay}
            onChange={(e) => onEssayChange(currentPart, e.target.value)}
            label={`Part ${currentPart === 1 ? '1' : '2'} Answer`}
            placeholder={`Enter your part ${currentPart === 1 ? '1' : '2'} answer...`}
            disabled={isSubmitted}
          />
          
          <div className="word-count">Word Count: {wordCount}</div>
        </div>
      ) : (
        <FeedbackView feedback={feedback} />
      )}
    </div>
  );
}; 